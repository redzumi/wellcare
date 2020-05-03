import express from 'express';

const PORT = 3000;
const app = express();

app.use('/public', express.static(`${__dirname}`));
app.use('/assets', express.static(`${__dirname}/assets`));
app.use('/*', express.static(`${__dirname}`));

app.listen(PORT, () => {
  console.log(`Works on ${PORT}...`);
});
