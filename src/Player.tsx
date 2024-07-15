import { twMerge } from 'tailwind-merge';

import { Game } from './game';

export type Player = Game['players'][number];

interface Props {
  active?: boolean;
  class?: string;
  colors: [string, string];
  index: number;
  player: Player;
}

export function Root(props: Props) {
  return (
    <div
      class={twMerge(
        'aspect-[4/1]',
        'font-medium',
        'grid',
        'place-items-center',
        'text-lg',
        'transition-all',
        props.active ? 'text-neutral-300' : 'text-neutral-300/30',
        props.active ? props.colors[1] : props.colors[0],
        props.class,
      )}
    >
      {props.player.name || `Player ${props.index + 1}`}
    </div>
  );
}
