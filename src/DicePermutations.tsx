import { twMerge } from 'tailwind-merge';

import * as DicePermutation from './DicePermutation';
import * as Game from './game';

interface Props {
  class?: string;
  currentRoll: NonNullable<Game.Game['currentRoll']>;
  disabled?: boolean;
  disallowedRolls: Game.Game['disallowedRolls'];
  onSelect?(selected: [number] | [number, number]): void;
}

export function Root(props: Props) {
  const permutations = Game.getPermutations(props.currentRoll);

  return (
    <div
      class={twMerge('text-neutral-300', 'font-medium', 'text-xl', props.class)}
    >
      {permutations.map((permutation) => (
        <DicePermutation.Root
          class="mb-[1px]"
          disabled={props.disabled}
          disallowedRolls={props.disallowedRolls}
          permutation={permutation}
          onSelect={props.onSelect}
        />
      ))}
    </div>
  );
}
