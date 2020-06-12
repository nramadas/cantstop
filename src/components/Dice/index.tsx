import cx from 'classnames';
import React from 'react';

import Die from 'src/components/Die';
import useRoll from 'src/hooks/useRoll';

import styles from './index.module.scss';

interface Props {
  className?: string;
  onHighlight?(rows: null | [number, number]): void;
}

export default function Dice(props: Props) {
  const [diceValues, diceCombinations, rollDice] = useRoll();

  return (
    <div className={cx(styles.container, props.className)}>
      <div className={styles.dice}>
        <button className={styles.roll} onClick={rollDice}>
          roll dice
        </button>
        <div className={styles.diceContainer}>
          <Die className={styles.die} value={diceValues[0]} />
          <Die className={styles.die} value={diceValues[1]} />
          <Die className={styles.die} value={diceValues[2]} />
          <Die className={styles.die} value={diceValues[3]} />
        </div>
      </div>
      <div className={styles.bottom}>
        {diceCombinations ? (
          <div className={styles.results}>
            <div className={styles.resultsTitle}>select one</div>
            {diceCombinations.map(([combo1, combo2], i) => (
              <div
                key={i}
                className={styles.combos}
                onMouseEnter={() =>
                  props.onHighlight &&
                  props.onHighlight([combo1.value, combo2.value])
                }
                onMouseLeave={() =>
                  props.onHighlight && props.onHighlight(null)
                }
              >
                <div className={styles.combo}>
                  <div className={styles.comboDice}>
                    <Die className={styles.die} value={combo1.dice[0].value} />
                    <Die className={styles.die} value={combo1.dice[1].value} />
                  </div>
                  <div className={styles.comboValue}>{combo1.value}</div>
                </div>
                <div className={styles.combo}>
                  <div className={styles.comboDice}>
                    <Die className={styles.die} value={combo2.dice[0].value} />
                    <Die className={styles.die} value={combo2.dice[1].value} />
                  </div>
                  <div className={styles.comboValue}>{combo2.value}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.rolling}>rolling dice</div>
        )}
      </div>
    </div>
  );
}
