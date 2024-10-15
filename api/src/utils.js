import crypto from 'crypto';

export const randomString = (bytesSize = 32) =>
  crypto.randomBytes(bytesSize).toString('hex');


export const numbersInRangeObject = (begin, end) => {
  if (end<begin) {
    throw Error(`Invalid range because ${end} is less than ${begin}.`); // custom error
  }
  let sum = 0;
  let count = 0;
  for (let index = begin; index <= end; index++) {
    sum += index;
    count++;
  }
  let avg = sum/count;
  return {sum, count, avg};
}