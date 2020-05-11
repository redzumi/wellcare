import express, { Request } from 'express';

import { UserModel } from '../../models/User';

const router = express.Router();

router.get('/:surveyId', async (req: Request, res) => {
  const { surveyId } = req.params;

  try {
    const users: User[] = await UserModel.find({
      $or: [
        {
          reasonsLike: {
            $elemMatch: { surveyId }
          }
        },
        {
          reasonsDislike: {
            $elemMatch: { surveyId }
          }
        }
      ]
    });

    const extract = (
      users: User[],
      field: 'reasonsLike' | 'reasonsDislike'
    ): {} => {
      const surveyReactions: ReasonReaction[] = users.reduce(
        (acc, curr: User) => {
          const userReactions = curr[field];
          const reactions = userReactions.filter(
            (r) => r.surveyId === surveyId
          );

          if (reactions.length <= 0) return acc;

          return [
            ...acc,
            ...reactions.map((r) => ({
              ...r,
              username: curr.username
            }))
          ];
        },
        []
      );

      return surveyReactions.reduce(
        (
          acc: { [key: string]: [] },
          curr: ReasonReaction & {
            username: string;
          }
        ): { [key: string]: {} } => {
          return {
            ...acc,
            [curr.feature]: [...(acc[curr.feature] || []), curr.username]
          };
        },
        {}
      );
    };

    res.json({
      likes: extract(users, 'reasonsLike'),
      dislikes: extract(users, 'reasonsDislike')
    });
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.post(
  '/:surveyId/:feature/:action',
  async (req: Request & { user: User }, res) => {
    const { params, user } = req;
    const { surveyId, feature, action } = params;

    try {
      const currentUser = await UserModel.findOne({ _id: user._id });

      const handle = async (sourceField: string, targetField: string) => {
        if (
          currentUser[sourceField].some(
            (reaction: ReasonReaction) =>
              reaction.surveyId === surveyId && reaction.feature === feature
          )
        ) {
          const update = {
            [sourceField]: currentUser[sourceField].filter(
              (reaction: ReasonReaction) =>
                !(
                  reaction.surveyId === surveyId && reaction.feature === feature
                )
            )
          };

          await UserModel.findOneAndUpdate({ _id: user._id }, update);
        } else {
          const update = {
            [sourceField]: [...currentUser[sourceField], { surveyId, feature }],
            [targetField]: currentUser[targetField].filter(
              (reaction: ReasonReaction) =>
                !(
                  reaction.surveyId === surveyId && reaction.feature === feature
                )
            )
          };

          await UserModel.findOneAndUpdate({ _id: user._id }, update);
        }
      };

      if (action === 'like') {
        handle('reasonsLike', 'reasonsDislike');
      }

      if (action === 'dislike') {
        handle('reasonsDislike', 'reasonsLike');
      }

      res.json({ success: true });
    } catch (ex) {
      res.status(500).json({ success: false, error: ex.message });
    }
  }
);

export default router;
