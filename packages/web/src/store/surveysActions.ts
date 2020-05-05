import axios from 'axios';
import { message } from 'antd';
import { createEffect } from 'effector';

type SendData = {
  survey: Survey;
  question: string;
  answer: string;
};

const beginSurveyQA = createEffect<Survey, boolean>({
  handler: async (survey: Survey) => {
    const { data } = await axios.post(`/api/v1/surveys/actions/${survey.id}`);

    return data;
  }
});

beginSurveyQA.fail.watch(() => {
  message.error('Что-то пошло не так');
});

const sendSurveyQA = createEffect<SendData, boolean>({
  handler: async (sendData) => {
    const { survey, question, answer } = sendData;
    const { data } = await axios.patch(`/api/v1/surveys/actions/${survey.id}`, {
      question,
      answer
    });

    return data;
  }
});

sendSurveyQA.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export { beginSurveyQA, sendSurveyQA };
