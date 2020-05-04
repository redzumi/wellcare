import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const body = { ...req.body };

  console.log(body);
  res.status(200).json({ success: true });
});

export default router;
