import { twMerge } from 'tailwind-merge';

import * as Game from './game';

interface Props {
  class?: string;
  stage: Game.Game['stage'];
  onClick?(): void;
}

export function Root(props: Props) {
  return (
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
      disabled={props.stage === Game.Stage.Rolled}
      onClick={props.onClick}
    >
      {props.stage === Game.Stage.Failed ? 'continue' : 'stop'}
    </button>
  );
}
