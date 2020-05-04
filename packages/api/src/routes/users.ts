import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  });
});

export default router;
