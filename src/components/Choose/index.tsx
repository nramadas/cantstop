import cx from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface Props {
  selected?: boolean;
  onChoose(join: boolean): void;
}

export default function Choose(props: Props) {
  return (
    <div
      className={cx(styles.container, {
        [styles.selected]: props.selected !== undefined,
      })}
    >
      <button
        className={styles.button}
        disabled={props.selected === false}
        onClick={() => props.onChoose(true)}
      >
        join
      </button>
      <button
        className={styles.button}
        disabled={props.selected === true}
        onClick={() => props.onChoose(false)}
      >
        create
      </button>
    </div>
  );
}
