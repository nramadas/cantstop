import { combineLatest, concat, Observable } from 'rxjs';
import { useEventCallback } from 'rxjs-hooks';
import { flatMap, map, takeLast } from 'rxjs/operators';

import makeCombinations, { Combinations } from 'src/lib/combinations';
import roll from 'src/lib/roll';
import { Value as DieValue } from 'src/models/Die';

type Rolls = [DieValue, DieValue, DieValue, DieValue];
type Value = [Rolls, Combinations];
type Trigger = () => void;

export default function useRoll(): [Rolls, Combinations, Trigger] {
  const [rollDice, values] = useEventCallback<void, Value>(
    event =>
      event.pipe(
        flatMap(() => {
          const randomRolls = combineLatest(roll(), roll(), roll(), roll());
          const rolls: Observable<Value> = randomRolls.pipe(
            map(rollValues => [rollValues, null]),
          );
          const combinations: Observable<Value> = randomRolls.pipe(
            takeLast(1),
            map(rollValues => [rollValues, makeCombinations(...rollValues)]),
          );
          return concat(rolls, combinations);
        }),
      ),
    [[1, 1, 1, 1], null],
  );

  return [values[0], values[1], rollDice];
}
