import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

const $tests: Store<TestsState> = createStore({ ready: false, data: [] });

const fetchTests = createEffect<void, Test[]>({
  handler: async () => {
    const { data } = await axios.get('/api/v1/tests');

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

export { $tests, fetchTests };
