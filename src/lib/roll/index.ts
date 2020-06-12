import shuffle from 'lodash/shuffle';
import { concat, of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Value as DieValue } from 'src/models/Die';

const DIE_VALUES: DieValue[] = [1, 2, 3, 4, 5, 6];
const SMALL_DELAY = 25;
const LARGE_DELAY = 50;

export default function roll(): Observable<DieValue> {
  // get some new random roll values to mimic a die rolling
  let baseValues: DieValue[] = Array.from({ length: 4 }).reduce(
    (acc: DieValue[]) => {
      const newValues = shuffle(DIE_VALUES);
      // make sure two rolls don't appear together
      if (acc[acc.length - 1] === newValues[0]) {
        newValues.shift();
      }

      return acc.concat(newValues);
    },
    [],
  );

  // use a random number of random roll values
  const stop = Math.floor(Math.random() * 14) + 10;
  baseValues = baseValues.slice(0, stop);
  const extraValues = shuffle(DIE_VALUES);

  // generate a new random number
  const arr = new Uint8Array(1);
  window.crypto.getRandomValues(arr);
  const target = ((arr[0] % 6) + 1) as DieValue;

  return concat(
    ...baseValues.map(val => of(val).pipe(delay(SMALL_DELAY))),
    ...extraValues.map(val => of(val).pipe(delay(LARGE_DELAY))),
    of(target),
  );
}
