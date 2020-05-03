import data from '../data';

type Question = [string, number, number]

type PredictData = Question[]

const main = async () => {
  //@ts-ignore
  await estimateCovid(data);
}
//функция, которая принимает признак, вес, вес ответа и возвращает вероятность
const estimateCovid = (data:PredictData) => {

  const overallProbability = data
  .reduce((prob, current) => prob + current[1] * current[2] ,0);

  return overallProbability;

}

main();
