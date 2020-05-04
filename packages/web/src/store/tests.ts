import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

const $tests: Store<TestsState> = createStore({
  ready: false,
  data: []
});

const fetchTests = createEffect<void, Test[]>({
  handler: async () => {
    const { data } = await axios.get('/api/v1/tests');

    return data;
  }
});

$tests.on(fetchTests.done, (state, payload) => ({
  ...state,
  ready: true,
  data: payload.result
}));

fetchTests.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const createTest = createEffect<Test, Test>({
  handler: async (createData: Test) => {
    const test = { ...createData };
    delete test.id;

    const { data } = await axios.post('/api/v1/tests', test);

    return data;
  }
});

$tests.on(createTest.done, (state, payload) => ({
  ...state,
  data: [...state.data, payload.result]
}));

createTest.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const saveTest = createEffect<Test, Test>({
  handler: async (saveData: Test) => {
    await axios.put(`/api/v1/tests/${saveData.id}`, saveData);

    return saveData;
  }
});

$tests.on(saveTest.done, (state, payload) => ({
  ...state,
  data: state.data.map((test) => ({
    ...test,
    ...(test.id === payload.result.id && payload.result)
  }))
}));

saveTest.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const deleteTest = createEffect<Test, Test>({
  handler: async (deleteData: Test) => {
    await axios.delete(`/api/v1/tests/${deleteData.id}`);

    return deleteData;
  }
});

$tests.on(deleteTest.done, (state, payload) => ({
  ...state,
  data: state.data.filter((test) => test.id !== payload.result.id)
}));

deleteTest.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export { $tests, fetchTests, createTest, saveTest, deleteTest };
