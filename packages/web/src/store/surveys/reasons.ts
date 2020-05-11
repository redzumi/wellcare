import { message } from 'antd';
import { createStore, createEffect, Store } from 'effector';

const $reasons: Store<SessionState> = createStore({});

const fetchReasonReactions = createEffect<
  { surveyId: string },
  { likes: ReasonReaction[]; dislikes: ReasonReaction[] }
>({
  handler: async (reasonData) => {
    return { surveyId: reasonData.surveyId, likes: [], dislikes: [] };
  }
});

$reasons.on(fetchReasonReactions.done, (state, payload) => ({
  ...state
}));

fetchReasonReactions.fail.watch(() => {
  message.error('Что-то пошло не так');
});

export { $reasons, fetchReasonReactions };
