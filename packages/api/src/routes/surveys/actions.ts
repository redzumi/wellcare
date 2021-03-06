import express, { Request } from 'express';

import { estimateCovid, PredictData } from '@wellcare/core';

import { SurveyActionModel } from '../../models/SurveyAction';
import { SurveyModel } from '../../models/Survey';

const router = express.Router();

router.post('/:surveyId', async (req: Request & { user: User }, res, next) => {
  const { user, params } = req;

  try {
    const body = {
      userId: user._id,
      surveyId: params.surveyId
    };

    await SurveyActionModel.findOneAndDelete({ ...body });

    const surveyAction = new SurveyActionModel(body);
    await surveyAction.save();

    res.status(200).json(surveyAction);
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.patch('/:surveyId', async (req: Request & { user: User }, res, next) => {
  const { user, params, body } = req;
  const { question, answer } = body;

  try {
    const survey = await SurveyModel.findOne({ _id: params.surveyId });
    const surveyAction = await SurveyActionModel.findOne({
      userId: user._id,
      surveyId: params.surveyId
    });

    const surveyQuestion = survey.questions.find(
      (q: Question) => q.feature === question
    );

    const surveyAnswer = surveyQuestion.answers.find(
      (a: Answer) => a.feature === answer
    );

    if (!surveyQuestion || !surveyAnswer) {
      return res.status(400).json({ success: false });
    }

    const surveyQA = [
      ...surveyAction.surveyQA,
      {
        name: surveyQuestion.name,
        weight: surveyQuestion.weight,
        feature: surveyQuestion.feature,
        answer: {
          name: surveyAnswer.name,
          weight: surveyAnswer.weight,
          feature: surveyAnswer.feature
        }
      }
    ];

    await surveyAction.updateOne({ surveyQA });
    res.status(200).json({ success: true });
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get(
  '/:surveyId/results',
  async (req: Request & { user: User }, res, next) => {
    const { user, params } = req;

    try {
      const surveyAction = await SurveyActionModel.findOne({
        userId: user._id,
        surveyId: params.surveyId
      });

      const surveyQA = surveyAction.surveyQA;
      const estimatingData = [] as PredictData;

      surveyQA.forEach((element: surveyQA) => {
        estimatingData.push([
          element.feature,
          element.weight,
          element.answer.weight
        ]);
      });

      const probability = estimateCovid(estimatingData);
      res.status(200).json({ success: true, probability: probability });
    } catch (ex) {
      res.status(500).json({ success: false, error: ex.message });
    }
  }
);

export default router;
