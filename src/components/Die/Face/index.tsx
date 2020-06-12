import cx from 'classnames';
import React from 'react';

import styles from './index.module.scss';

interface Props {
  className?: string;
  children: [
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
  ];
}

export default function Face(props: Props) {
  return (
    <div className={cx(styles.face, props.className)}>
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
}
