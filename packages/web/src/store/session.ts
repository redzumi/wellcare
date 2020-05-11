import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';
import jwtDecode from 'jwt-decode';

const $session: Store<SessionState> = createStore({});

const loginUser = createEffect<{ email: string; password: string }, string>({
  handler: async (loginData) => {
    const { data } = await axios.post('/api/v1/auth/login', loginData);
    const { token } = data;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);

    return token;
  }
});

$session.on(loginUser.done, (state, payload) => ({
  ...state,
  ...jwtDecode(payload.result),
  token: payload.result
}));

loginUser.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const registerUser = createEffect<Partial<User>, string>({
  handler: async (registerData: User) => {
    const { data } = await axios.post('/api/v1/auth/signup', registerData);
    const { token } = data;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);

    return token;
  }
});

$session.on(registerUser.done, (state, payload) => ({
  ...state,
  ...jwtDecode(payload.result),
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

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await axios.get('/api/v1/users/me');

    return token;
  }
});

$session.on(checkSession.done, (state, payload) => ({
  ...state,
  ...jwtDecode(payload.result),
  token: payload.result
}));

checkSession.fail.watch(({ error }) => {
  console.log(error.message);
});

const logoutUser = createEffect({
  handler: async () => {
    axios.defaults.headers.common.Authorization = ``;
    localStorage.removeItem('token');
  }
});

$session.on(logoutUser.done, () => ({}));

export { $session, loginUser, registerUser, logoutUser, checkSession };
