import { Fragment } from 'preact/jsx-runtime';
import { twMerge } from 'tailwind-merge';

import * as DiceCurrentRoll from './DiceCurrentRoll';
import * as DicePermutations from './DicePermutations';
import * as DiceRollerLabel from './DiceRollerLabel';
import * as Game from './game';

interface Props {
  class?: string;
  currentRoll: Game.Game['currentRoll'];
  disallowedRolls: Game.Game['disallowedRolls'];
  stage: Game.Game['stage'];
  onRoll?(): void;
  onSelect?(selected: [number] | [number, number]): void;
}

export function Root(props: Props) {
  const disabled =
    props.stage === Game.Stage.Failed || props.stage === Game.Stage.Rolled;

  return (
    <div class={twMerge('w-full', props.class)}>
      {props.currentRoll && (
        <Fragment>
          <DiceRollerLabel.Root class="mb-[1px]">
            Dice Rolls
          </DiceRollerLabel.Root>
          <DiceCurrentRoll.Root currentRoll={props.currentRoll} />
          <DiceRollerLabel.Root class="mb-[1px]">
            Choose One:
          </DiceRollerLabel.Root>
          <DicePermutations.Root
            currentRoll={props.currentRoll}
            disabled={!disabled}
            disallowedRolls={props.disallowedRolls}
            onSelect={props.onSelect}
          />
        </Fragment>
      )}
      <button
        class={twMerge(
          'aspect-[4/1]',
          'bg-neutral-300',
          'font-bold',
          'grid',
          'outline-none',
          'place-items-center',
          'text-neutral-950',
          'transition-colors',
          'uppercase',
          'w-full',
          'active:bg-neutral-400',
          'disabled:cursor-not-allowed',
          'disabled:bg-neutral-900',
          'disabled:text-neutral-600',
          'disabled:focus:bg-neutral-900',
          'disabled:hover:bg-neutral-900',
          'focus:bg-neutral-200',
          'hover:bg-neutral-200',
        )}
        disabled={disabled}
        onClick={() => props.onRoll?.()}
      >
        roll
      </button>
    </div>
  );
}
