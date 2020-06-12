import cx from 'classnames';
import React, { useState } from 'react';

import Dice from 'src/components/Dice';
import Grid from 'src/components/Grid';

import styles from './index.module.scss';

interface Props {
  className?: string;
}

export default function Board(props: Props) {
  const [highlightedRails, setHighlightedRails] = useState<
    null | [number, number]
  >(null);
  return (
    <div className={cx(styles.container, props.className)}>
      <Grid highlight={highlightedRails} />
      <Dice onHighlight={setHighlightedRails} />
    </div>
  );
}
