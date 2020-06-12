import cx from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface Props {
  className?: string;
  highlight?: boolean;
  length: number;
}

export default function Rail(props: Props) {
  const { className, highlight, length } = props;

  // const numNodes = length <= 7 ? length : 7 - (length % 7);
  let numNodes = 2;

  if (length <= 7) {
    numNodes += (length - 2) * 2;
  } else {
    const wrap = 7 - (length % 7);
    numNodes += (wrap - 2) * 2;
  }

  return (
    <div
      className={cx(className, styles.container, {
        [styles.highlight]: !!highlight,
      })}
    >
      <div className={styles.peak}>{length}</div>
      {Array.from({ length: numNodes }).map((_, i) => (
        <div key={i} className={styles.node}>
          {length}
        </div>
      ))}
    </div>
  );
}
