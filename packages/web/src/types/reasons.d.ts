type ReasonsState = {
  surveys: {
    [key: string]: {
      likes: {
        [key: string]: string[];
      };
      dislikes: {
        [key: string]: string[];
      };
    };
  };
};
