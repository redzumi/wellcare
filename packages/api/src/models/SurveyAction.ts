const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveyActionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'survey',
    required: true
  },
  surveyQA: [
    {
      name: String,
      weight: Number,
      answer: {
        name: String,
        weight: Number
      }
    }
  ]
});

export const SurveyActionModel = mongoose.model(
  'surveyAction',
  SurveyActionSchema
);
