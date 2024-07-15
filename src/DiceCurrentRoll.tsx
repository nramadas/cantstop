import { twMerge } from 'tailwind-merge';

import { Game } from './game';

interface Props {
  class?: string;
  currentRoll: NonNullable<Game['currentRoll']>;
}

export function Root(props: Props) {
  return (
    <div
      class={twMerge(
        'font-medium',
        'gap-x-[1px]',
        'grid-cols-4',
        'grid',
        'mb-[1px]',
        'text-lg',
        'text-neutral-300',
      )}
    >
      {props.currentRoll.map((roll, i) => (
        <div
          class={twMerge(
            'aspect-square',
            'bg-neutral-900',
            'grid',
            'place-items-center',
          )}
          key={i}
        >
          {roll}
        </div>
      ))}
    </div>
  );
}
