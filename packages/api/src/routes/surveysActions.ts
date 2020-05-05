import express, { Request, Response } from 'express';

import { SurveyActionModel } from '../models/SurveyAction';
import { SurveyModel } from '../models/Survey';

const router = express.Router();

const mongoCleaner = (
  req: Request & { user: User },
  res: Response,
  next: () => void
) => {
  delete req.body._id;
  delete req.body._vv;
  next();
};

router.use(mongoCleaner);

router.post('/:surveyId', async (req: Request & { user: User }, res, next) => {
  const { user, params } = req;

  try {
    const surveyAction = new SurveyActionModel({
      userId: user._id,
      surveyId: params.surveyId
    });

    await surveyAction.save();
    res.status(200).json(surveyAction);
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.patch('/:surveyId', async (req: Request & { user: User }, res, next) => {
  const { user, params, body } = req;
  const { name, answer } = body;

  try {
    const survey = await SurveyModel.find({ _id: params.surveyId });
    const surveyAction = await SurveyActionModel.find({
      userId: user._id,
      surveyId: params.surveyId
    });

    console.log(name, answer);
    res.status(200).json({ success: true });
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

export default router;
