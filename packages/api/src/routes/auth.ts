import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT
} from 'passport-jwt';

import { UserModel } from '../models/User';

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

// TODO from env variable
const SECRET = 'wellcare_secret';

passport.use(
  new JWTstrategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (
      payload: { user: User },
      done: (error: Error, user?: User) => void
    ) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const { username, firstName, lastName } = req.body;

      try {
        const user = await UserModel.create({
          username,
          firstName,
          lastName,
          email,
          password
        });

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
          return done(null, false);
        }

        const valid = await user.verifyPassword(password);

        if (!valid) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    const user = req.user;

    // @ts-ignore
    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, SECRET);

    res.json({
      message: 'Signup successful',
      token: token
    });
  }
);

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res, next) => {
    const user = req.user;

    // @ts-ignore
    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, SECRET);

    res.json({
      message: 'Login successful',
      token: token
    });
  }
);

export { router, passport };
