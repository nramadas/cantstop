import { produce } from 'immer';

export const COLORS = [
  ['bg-orange-600/30', 'bg-orange-600'],
  ['bg-lime-600/30', 'bg-lime-600'],
  ['bg-blue-600/30', 'bg-blue-600'],
  ['bg-violet-600/30', 'bg-violet-600'],
  ['bg-emerald-600/30', 'bg-emerald-600'],
  ['bg-fuschia-600/30', 'bg-fuschia-600'],
  ['bg-cyan-600/30', 'bg-cyan-600'],
  ['bg-rose-600/30', 'bg-rose-600'],
] as [string, string][];

export enum Stage {
  Failed,
  Rest,
  Rolled,
}

export interface Game {
  curAllowedRolls: { [k in number]: true };
  currentRoll: null | [number, number, number, number];
  currentPlayer: number;
  disallowedRolls: { [k in number]: true };
  players: {
    name?: string;
    colors: [string, string];
    stops: { [K in number]: number };
    run: { [K in number]: number };
  }[];
  stage: Stage;
}

export const DEFAULT: Game = {
  curAllowedRolls: {},
  currentRoll: null,
  currentPlayer: 0,
  disallowedRolls: {},
  players: [
    { colors: COLORS[0], stops: [], run: [] },
    { colors: COLORS[1], stops: [], run: [] },
    { colors: COLORS[2], stops: [], run: [] },
    { colors: COLORS[3], stops: [], run: [] },
  ],
  stage: Stage.Rest,
};

export function addSelected(selected: [number] | [number, number]) {
  return (game: Game) =>
    produce(game, (data) => {
      const player = data.players[data.currentPlayer];

      function select(selection: number) {
        const base = player.stops[selection] || 0;
        data.players[data.currentPlayer].run[selection] = base + 1;
        data.curAllowedRolls[selection] = true;
      }

      select(selected[0]);

      if (selected[1]) {
        select(selected[1]);
      }

      data.stage = Stage.Rest;
    });
}

export function getDiceRoll() {
  const array = new Uint32Array(4);
  self.crypto.getRandomValues(array);
  return Array.from(array.map((num) => (num % 6) + 1)) as [
    number,
    number,
    number,
    number,
  ];
}

export function getDisallowed(
  game: Pick<Game, 'disallowedRolls' | 'curAllowedRolls'>,
) {
  if (Object.keys(game.curAllowedRolls).length < 3) {
    return { ...game.disallowedRolls };
  } else {
    const disallowed: Game['disallowedRolls'] = {};

    for (let i = 1; i <= 12; i++) {
      if (!game.curAllowedRolls[i]) {
        disallowed[i] = true;
      }
    }

    return disallowed;
  }
}

export function getPermutations(
  nums: [number, number, number, number],
): [number, number][] {
  return [
    [nums[0] + nums[1], nums[2] + nums[3]],
    [nums[0] + nums[2], nums[1] + nums[3]],
    [nums[0] + nums[3], nums[1] + nums[2]],
  ];
}

export function isBothAllowed() {
  //
}

export function noValidMoves(
  roll: [number, number, number, number],
  disallowedRolls: Game['disallowedRolls'],
) {
  const permutations = getPermutations(roll);

  for (const permutation of permutations) {
    for (const option of permutation) {
      if (!disallowedRolls[option]) {
        return false;
      }
    }
  }

  return true;
}

export function resetAfterFailed() {
  return (game: Game) =>
    produce(game, (data) => {
      data.players[data.currentPlayer].run = {};
      data.currentPlayer = (data.currentPlayer + 1) % data.players.length;
      data.curAllowedRolls = {};
      data.currentRoll = null;
      data.stage = Stage.Rest;
    });
}

export function rollDice() {
  return (game: Game) =>
    produce(game, (data) => {
      const currentRoll = getDiceRoll();
      data.currentRoll = currentRoll;

      if (noValidMoves(currentRoll, getDisallowed(game))) {
        data.stage = Stage.Failed;
      } else {
        data.stage = Stage.Rolled;
      }
    });
}

export function stop() {
  return (game: Game) =>
    produce(game, (data) => {
      data.players[data.currentPlayer].stops = {
        ...data.players[data.currentPlayer].stops,
        ...data.players[data.currentPlayer].run,
      };
      data.players[data.currentPlayer].run = {};
      data.currentPlayer = (data.currentPlayer + 1) % data.players.length;
      data.curAllowedRolls = {};
      data.currentRoll = null;
      data.stage = Stage.Rest;
    });
}
