type Test = {
  id: string;
  name: string;
  description: string;
  reward: number;
};

type TestsState = {
  data: Test[];
  ready: boolean;
};
