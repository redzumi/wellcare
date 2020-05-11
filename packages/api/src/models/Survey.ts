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
      feature: String,
      reason: { type: String, required: false },
      reasonLikes: { type: Number, default: 0 },
      reasonDislikes: { type: Number, default: 0 },
      answers: [
        {
          name: String,
          weight: Number,
          feature: String
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
