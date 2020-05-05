import data from './data';
import { PredictData } from './data';

const main = async () => await estimateCovid(data);

//функция, которая принимает признак, вес, вес ответа и возвращает вероятность
export const estimateCovid = (data: PredictData) => {
  const overallProbability = data.reduce(
    (prob, current) => prob + current[1] * current[2],
    0
  );

  console.log(overallProbability);

  return overallProbability;
};

main();
