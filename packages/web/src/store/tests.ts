import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

type CreateData = {} & Test;

const $tests: Store<TestsState> = createStore({
  ready: false,
  data: [
    {
      id: '1',
      name: 'test',
      description: 'test',
      weight: 1,
      questions: [],
      reward: 1
    },
    {
      id: '1',
      name: 'test',
      description: 'test',
      weight: 1,
      questions: [],
      reward: 1
    },
    {
      id: '1',
      name: 'test',
      description: 'test',
      weight: 1,
      questions: [],
      reward: 1
    }
  ]
});

const fetchTests = createEffect<void, Test[]>({
  handler: async () => {
    const { data } = await axios.get('/api/v1/tests');

    console.log(data);

    return [];
  }
});

$tests.on(fetchTests.done, (state, payload) => ({
  ...state,
  ready: true,
  token: payload.result
}));

fetchTests.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const createTest = createEffect<CreateData, Test>({
  handler: async (createData: CreateData) => {
    const { data } = await axios.post('/api/v1/tests');

    console.log(data);

    return createData;
  }
});

$tests.on(createTest.done, (state, payload) => ({
  ...state,
  ready: true,
  token: payload.result
}));

createTest.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export { $tests, fetchTests, createTest };
