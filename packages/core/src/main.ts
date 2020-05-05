import data from './data';
import { PredictData } from './data';

const main = async () => await estimateCovid(data);

// MAGIC :)
export const estimateCovid = (data: PredictData) => {
  const overallProbability = data.reduce(
    (prob, current) => prob + current[1] * current[2],
    0
  );

  return overallProbability;
};

main();
