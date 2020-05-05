const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  questions: [
    {
      name: String,
      weight: Number,
      answers: [
        {
          name: String,
          weight: Number
        }
      ]
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

SurveySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SurveySchema.set('toJSON', {
  virtuals: true
});

export const SurveyModel = mongoose.model('survey', SurveySchema);
