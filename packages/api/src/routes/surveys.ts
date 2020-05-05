import express, { Request, Response } from 'express';
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

router.get('/', async (req: Request & { user: User }, res, next) => {
  try {
    const surveys = await SurveyModel.find();
    res.json(surveys);
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.get('/:id', async (req: Request & { user: User }, res, next) => {
  const { params } = req;
  const { id } = params;

  try {
    const survey = await SurveyModel.findOne({ _id: id });
    res.json(survey);
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.post('/', async (req: Request & { user: User }, res, next) => {
  const { user, body } = req;
  const survey = new SurveyModel({ ...body, userId: user._id });

  try {
    await survey.save();
    res.status(200).json(survey);
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.put('/:id', async (req: Request & { user: User }, res) => {
  const { user, body, params } = req;
  const { id } = params;

  try {
    await SurveyModel.findOneAndUpdate({ userId: user._id, _id: id }, body);
    res.status(200).json({ success: true });
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

router.delete('/:id', async (req: Request & { user: User }, res, next) => {
  const { user, params } = req;
  const { id } = params;

  try {
    await SurveyModel.findOneAndDelete({ userId: user._id, _id: id });
    res.status(200).json({ success: true });
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

export default router;
