import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';

import { UserModel } from '../models/User';

import secureRoute from './security';

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (
      token: string,
      done: (error: Error | null, token?: { user: string }) => void
    ) => {
      try {
        // @ts-ignore
        return done(null, token.user);
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
    res.json({
      message: 'Signup successful',
      user: req.user
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
    const token = jwt.sign({ user: body }, 'top_secret');

    res.json({
      message: 'Login successful',
      user: req.user,
      token: token
    });
  }
);

router.use('/', passport.authenticate('jwt', { session: false }), secureRoute);

export default router;
