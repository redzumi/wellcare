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
      return users.reduce((acc: { [key: string]: string[] }, curr: User) => {
        const reaction = curr[field].find((like) => like.surveyId === surveyId);

        if (!reaction) return acc;
        const feature = reaction.feature;

        return {
          ...acc,
          [feature]: [...(acc[feature] ? acc[feature] : []), curr.username]
        };
      }, {});
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

      if (action === 'like') {
        const update = {
          reasonsLike: [...currentUser.reasonsLike, { surveyId, feature }],
          reasonsDislike: currentUser.reasonsDislike.filter(
            (dislike: ReasonReaction) => dislike.surveyId !== surveyId
          )
        };

        await UserModel.findOneAndUpdate({ _id: user._id }, update);
      }

      if (action === 'dislike') {
        const update = {
          reasonsDislike: [
            ...currentUser.reasonsDislike,
            { surveyId, feature }
          ],
          reasonsLike: currentUser.reasonsLike.filter(
            (dislike: ReasonReaction) => dislike.surveyId !== surveyId
          )
        };

        await UserModel.findOneAndUpdate({ _id: user._id }, update);
      }

      res.json({ success: true });
    } catch (ex) {
      res.status(500).json({ success: false, error: ex.message });
    }
  }
);

export default router;
