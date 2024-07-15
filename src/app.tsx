import { useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';

import './app.css';
import * as Board from './Board';
import * as DiceRoller from './DiceRoller';
import * as Game from './game';
import * as Players from './Players';
import * as StopOrContinue from './StopOrContinue';

export function App() {
  const [game, setGame] = useState(Game.DEFAULT);
  console.log(game, Game.getDisallowed(game));

  return (
    <div
      class={twMerge(
        'absolute',
        'bg-neutral-900',
        'bottom-0',
        'grid-cols-[1fr,minmax(auto,300px)]',
        'grid',
        'left-0',
        'p-[1px]',
        'right-0',
        'top-0',
      )}
    >
      <div class="bg-neutral-800 grid place-items-center p-[10%]">
        <Board.Root board={Board.DEFAULT} class="h-[75%] max-w-[75%]" />
      </div>
      <div
        class={twMerge(
          'bg-neutral-950',
          'flex-col',
          'flex',
          'h-full',
          'items-center',
          'pl-[1px]',
        )}
      >
        <Players.Root
          currentPlayer={game.currentPlayer}
          players={game.players}
        />
        <div class="flex-grow w-full bg-neutral-900 mb-[1px]" />
        <DiceRoller.Root
          class="mb-[1px]"
          currentRoll={game.currentRoll}
          disallowedRolls={Game.getDisallowed(game)}
          stage={game.stage}
          onRoll={() => setGame(Game.rollDice())}
          onSelect={(selected) => setGame(Game.addSelected(selected))}
        />
        <StopOrContinue.Root
          stage={game.stage}
          onClick={() => setGame(Game.resetAfterFailed())}
        />
      </div>
    </div>
  );
}
