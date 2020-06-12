import cx from 'classnames';
import React from 'react';

// import Board from 'src/components/Board';
import Choose from 'src/components/Choose';
import Input from 'src/components/Input';
import useSetup, { Stage } from 'src/hooks/useSetup';

import styles from './index.module.scss';

export default function Root() {
  const [state, addName, choose, join] = useSetup();

  console.log(Stage, state, addName, choose, join);

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.setup, {
          [styles.setup__name]: state.stage === Stage.Name,
          [styles.setup__choose]: state.stage === Stage.Choose,
          [styles.setup__join]: state.stage === Stage.Join,
        })}
      >
        <div className={styles.name}>
          <Input placeholder="name" onNext={addName} />
        </div>
        <div className={styles.chooseLine1} />
        <div className={styles.chooseLine2} />
        <div className={styles.chooseLine3} />
        <div className={styles.chooseLine4} />
        <div className={styles.chooseLine5} />
        <div className={styles.choose}>
          <Choose
            selected={state.stage === Stage.Join ? true : undefined}
            onChoose={choose}
          />
        </div>
        <div className={styles.joinLine} />
        <div className={styles.join}>
          <Input placeholder="game id" onNext={join} />
        </div>
      </div>
      {/* <Board /> */}
    </div>
  );
}
