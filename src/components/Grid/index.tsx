import React from 'react';

import Rail from 'src/components/Rail';

import styles from './index.module.scss';

interface Props {
  highlight?: null | [number, number];
}

export default function Grid(props: Props) {
  return (
    <div className={styles.container}>
      {Array.from({ length: 11 }).map((_, i) => (
        <Rail
          key={i}
          highlight={!!props.highlight && props.highlight.includes(i + 2)}
          length={i + 2}
        />
      ))}
    </div>
  );
}
