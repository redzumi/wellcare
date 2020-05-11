import axios from 'axios';
import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

const $reasons: Store<ReasonsState> = createStore({ surveys: {} });

const fetchReasonReactions = createEffect<
  string,
  {
    surveyId: string;
    likes: {
      [key: string]: string[];
    };
    dislikes: {
      [key: string]: string[];
    };
  }
>({
  handler: async (surveyId) => {
    const { data } = await axios.get(`/api/v1/surveys/reasons/${surveyId}`);
    const { likes, dislikes } = data;

    return { surveyId, likes, dislikes };
  }
});

$reasons.on(fetchReasonReactions.done, (state, payload) => ({
  ...state,
  surveys: {
    ...state.surveys,
    [payload.result.surveyId]: {
      likes: payload.result.likes,
      dislikes: payload.result.dislikes
    }
  }
}));

fetchReasonReactions.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export { $reasons, fetchReasonReactions };
