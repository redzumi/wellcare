import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

const $surveys: Store<SurveysState> = createStore({
  ready: false,
  data: []
});

const fetchSurveys = createEffect<void, Survey[]>({
  handler: async () => {
    const { data } = await axios.get('/api/v1/surveys');

    return data;
  }
});

$surveys.on(fetchSurveys.done, (state, payload) => ({
  ...state,
  ready: true,
  data: payload.result
}));

fetchSurveys.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const createSurvey = createEffect<Survey, Survey>({
  handler: async (createData: Survey) => {
    const survey = { ...createData };
    delete survey.id;

    const { data } = await axios.post('/api/v1/surveys', survey);

    return data;
  }
});

$surveys.on(createSurvey.done, (state, payload) => ({
  ...state,
  data: [...state.data, payload.result]
}));

createSurvey.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const saveSurvey = createEffect<Survey, Survey>({
  handler: async (saveData: Survey) => {
    await axios.put(`/api/v1/surveys/${saveData.id}`, saveData);

    return saveData;
  }
});

$surveys.on(saveSurvey.done, (state, payload) => ({
  ...state,
  data: state.data.map((survey) => ({
    ...survey,
    ...(survey.id === payload.result.id && payload.result)
  }))
}));

saveSurvey.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const deleteSurvey = createEffect<Survey, Survey>({
  handler: async (deleteData: Survey) => {
    await axios.delete(`/api/v1/surveys/${deleteData.id}`);

    return deleteData;
  }
});

$surveys.on(deleteSurvey.done, (state, payload) => ({
  ...state,
  data: state.data.filter((survey) => survey.id !== payload.result.id)
}));

deleteSurvey.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const predictSurvey = createEffect<Survey, number>({
  handler: async (survey: Survey) => {
    const { data } = await axios.get(
      `/api/v1/surveys/actions/${survey.id}/results`
    );

    return data.probability;
  }
});

predictSurvey.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export {
  $surveys,
  fetchSurveys,
  createSurvey,
  saveSurvey,
  deleteSurvey,
  predictSurvey
};
