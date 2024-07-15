export enum SquareType {
  Tile,
  Label,
  None,
}

type LayoutSquare<T> =
  | {
      type: SquareType.Tile;
      tile: T;
    }
  | {
      type: SquareType.Label;
      label: string;
    }
  | {
      type: SquareType.None;
    };

export function boardToLayout<T>(board: T[][]) {
  const COL_COUNT = 11;
  const layout: LayoutSquare<T>[] = [];

  Array.from({ length: COL_COUNT }).forEach((_, i) => {
    if (i === 5) {
      layout.push({ type: SquareType.Label, label: '7' });
    } else {
      layout.push({ type: SquareType.None });
    }
  });

  board.forEach((row) => {
    const halfwayPoint = (COL_COUNT - row.length) / 2;
    const padding = halfwayPoint - 1;

    Array.from({ length: padding }).forEach(() =>
      layout.push({ type: SquareType.None }),
    );

    if (row.length !== COL_COUNT) {
      layout.push({
        type: SquareType.Label,
        label: `${6 - Math.floor(row.length / 2)}`,
      });
    }

    for (const tile of row) {
      layout.push({ type: SquareType.Tile, tile });
    }

    if (row.length !== COL_COUNT) {
      layout.push({
        type: SquareType.Label,
        label: `${8 + Math.floor(row.length / 2)}`,
      });
    }

    Array.from({ length: padding }).forEach(() =>
      layout.push({ type: SquareType.None }),
    );
  });

  Array.from({ length: COL_COUNT }).forEach((_, i) => {
    if (i === 5) {
      layout.push({ type: SquareType.Label, label: '7' });
    } else {
      layout.push({ type: SquareType.None });
    }
  });

  return layout;
}
