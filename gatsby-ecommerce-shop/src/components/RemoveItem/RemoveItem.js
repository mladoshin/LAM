import React from 'react';

import Icon from '../Icons/Icon';

import * as styles from './RemoveItem.module.css';

const RemoveItem = ({onClick}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <Icon symbol={'cross'} />
    </div>
  );
};

export default RemoveItem;
