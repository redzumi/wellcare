type Feature = string;
type QuestionWeight = number;
type AnswerWeight = number;

type SurveyQA = [Feature, QuestionWeight, AnswerWeight];
export type PredictData = SurveyQA[];

// MAGIC :)
export const estimateCovid = (data: PredictData) => {
  const overallProbability = data.reduce(
    (prob, current) => prob + current[1] * current[2],
    0
  );

  return overallProbability;
};

// Just for tests
const main = async () =>
  await estimateCovid([
    ['курение', 0.05, 1],
    ['гигиена', 0.1, 0.5],
    ['италия', 0.3, 0]
  ]);

main();
