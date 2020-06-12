import cx from 'classnames';
import React from 'react';

import { Value as DieValue } from 'src/models/Die';

import Face from './Face';

import styles from './index.module.scss';

interface Props {
  className?: string;
  value: DieValue;
}

export default function Die(props: Props) {
  return (
    <div
      className={cx(props.className, styles.container, {
        [styles.show1]: props.value === 1,
        [styles.show2]: props.value === 2,
        [styles.show3]: props.value === 3,
        [styles.show4]: props.value === 4,
        [styles.show5]: props.value === 5,
        [styles.show6]: props.value === 6,
      })}
    >
      <Face className={styles.f1}>
        <div />
        <div />
        <div />
        <div />
        <div className={styles.dot} />
        <div />
        <div />
        <div />
        <div />
      </Face>
      <Face className={styles.f2}>
        <div />
        <div />
        <div className={styles.dot} />
        <div />
        <div />
        <div />
        <div className={styles.dot} />
        <div />
        <div />
      </Face>
      <Face className={styles.f3}>
        <div className={styles.dot} />
        <div />
        <div />
        <div />
        <div className={styles.dot} />
        <div />
        <div />
        <div />
        <div className={styles.dot} />
      </Face>
      <Face className={styles.f4}>
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div />
        <div />
        <div />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
      </Face>
      <Face className={styles.f5}>
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
      </Face>
      <Face className={styles.f6}>
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div />
        <div className={styles.dot} />
      </Face>
    </div>
  );
}
