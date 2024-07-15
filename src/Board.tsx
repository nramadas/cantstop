import { twMerge } from 'tailwind-merge';

import { ColumnLabel } from './ColumnLabel';
import { boardToLayout, SquareType } from './layout';
import * as Tile from './Tile';

export type Board<T> = [
  [T],
  [T, T, T],
  [T, T, T, T, T],
  [T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T],
  [T, T, T, T, T],
  [T, T, T],
  [T],
];

export const DEFAULT: Board<Tile.Tile> = [
  [{}],
  [{}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}],
  [{}],
];

interface Props<T extends Tile.Tile> {
  class?: string;
  board: Board<T>;
}

export function Root<T extends Tile.Tile>(props: Props<T>) {
  const layout = boardToLayout(props.board);

  return (
    <div
      class={twMerge(
        'grid',
        'grid-cols-11',
        'aspect-square',
        'place-content-center',
        props.class,
      )}
    >
      {layout.map((item, index) =>
        item.type === SquareType.Tile ? (
          <Tile.Root class="aspect-square" key={index} tile={item.tile} />
        ) : item.type === SquareType.Label ? (
          <ColumnLabel>{item.label}</ColumnLabel>
        ) : (
          <div />
        ),
      )}
    </div>
  );
}
