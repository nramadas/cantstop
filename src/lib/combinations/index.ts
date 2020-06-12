import { Value as DieValue, Index as DieIndex } from 'src/models/Die';

interface Die {
  index: DieIndex;
  value: DieValue;
}

interface Combination {
  dice: [Die, Die];
  value: number;
}

type CombinationChoice = [Combination, Combination];

export type Combinations =
  | null
  | [CombinationChoice, CombinationChoice, CombinationChoice];

export default function combinations(
  roll0: DieValue,
  roll1: DieValue,
  roll2: DieValue,
  roll3: DieValue,
): Combinations {
  const combo1: CombinationChoice = [
    {
      dice: [
        {
          index: 0,
          value: roll0,
        },
        {
          index: 1,
          value: roll1,
        },
      ],
      value: roll0 + roll1,
    },
    {
      dice: [
        {
          index: 2,
          value: roll2,
        },
        {
          index: 3,
          value: roll3,
        },
      ],
      value: roll2 + roll3,
    },
  ];
  const combo2: CombinationChoice = [
    {
      dice: [
        {
          index: 0,
          value: roll0,
        },
        {
          index: 2,
          value: roll2,
        },
      ],
      value: roll0 + roll2,
    },
    {
      dice: [
        {
          index: 1,
          value: roll1,
        },
        {
          index: 3,
          value: roll3,
        },
      ],
      value: roll1 + roll3,
    },
  ];
  const combo3: CombinationChoice = [
    {
      dice: [
        {
          index: 0,
          value: roll0,
        },
        {
          index: 3,
          value: roll3,
        },
      ],
      value: roll0 + roll3,
    },
    {
      dice: [
        {
          index: 1,
          value: roll1,
        },
        {
          index: 2,
          value: roll2,
        },
      ],
      value: roll1 + roll2,
    },
  ];
  return [combo1, combo2, combo3];
}
