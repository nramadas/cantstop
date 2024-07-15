import { twMerge } from 'tailwind-merge';

import { Game } from './game';
import * as Player from './Player';

interface Props {
  class?: string;
  currentPlayer: Game['currentPlayer'];
  players: Game['players'];
}

export function Root(props: Props) {
  return (
    <div class={twMerge('w-full', props.class)}>
      {props.players.map((player, index) => (
        <Player.Root
          active={props.currentPlayer === index}
          class="mb-[1px]"
          colors={player.colors}
          index={index}
          player={player}
        />
      ))}
    </div>
  );
}
