import { body } from 'express-validator';

export const validateUpdateUser = [
  body().custom((value, { req }) => {
    const { name, email, password } = req.body;
    const hasAny =
      (typeof name === 'string' && name.trim() !== '') ||
      (typeof email === 'string' && email.trim() !== '') ||
      (typeof password === 'string' && password.trim() !== '');

    if (!hasAny) {
      throw new Error('At least one of name, email, or password is required');
    }
    return true;
  }),

  body('name').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Name cannot be empty'),

  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Email must be valid'),

  body('password')
    .optional({ values: 'falsy' })
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
