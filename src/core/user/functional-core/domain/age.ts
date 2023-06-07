import { Result, err, ok } from 'neverthrow';

export type Age = number;

type AgeError = Error;

export const makeAge = (value: number): Result<Age, AgeError> =>
  value >= 0 ? ok(value) : err(new Error('Age must be positive'));
