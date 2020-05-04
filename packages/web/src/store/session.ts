import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

type LoginData = { email: string; password: string };
type RegisterData = {} & User;

const $session: Store<SessionState> = createStore({});

const loginUser = createEffect<LoginData, string>({
  handler: async (loginData: LoginData) => {
    const { data } = await axios.post('/api/v1/auth/login', loginData);
    const { token } = data;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);

    return token;
  }
});

$session.on(loginUser.done, (state, payload) => ({
  ...state,
  token: payload.result
}));

loginUser.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const registerUser = createEffect<RegisterData, string>({
  handler: async (registerData: LoginData) => {
    const { data } = await axios.post('/api/v1/auth/signup', registerData);
    const { token } = data;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);

    return token;
  }
});

$session.on(registerUser.done, (state, payload) => ({
  ...state,
  token: payload.result
}));

registerUser.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const checkSession = createEffect<void, string>({
  handler: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Сессия устарела...');
    }

    return token;
  }
});

$session.on(checkSession.done, (state, payload) => ({
  ...state,
  token: payload.result
}));

checkSession.fail.watch(({ error }) => {
  console.log(error.message);
});

export { $session, loginUser, registerUser, checkSession };
