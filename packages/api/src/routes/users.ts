import express from 'express';

const router = express.Router();

router.get('/me', (req, res, next) => {
  res.json({
    token: req.query.secret_token
  });
});

export default router;
