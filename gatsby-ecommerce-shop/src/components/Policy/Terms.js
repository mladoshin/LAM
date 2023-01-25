import classNames from 'classnames';
import React from 'react';
import './index.scss';
import * as styles from './Policy.module.css';

function Terms() {
  return (
    <div className={classNames(styles.root, 'root-policy')}>
      <div className={styles.section}>
        <h3>Условия и положения</h3>

        <span>In progress... </span>
      </div>

    </div>
  );
}

export default Terms;
