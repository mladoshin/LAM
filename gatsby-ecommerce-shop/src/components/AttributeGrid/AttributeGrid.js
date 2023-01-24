import React from 'react';

import Attribute from '../Attribute';

import * as styles from './AttributeGrid.module.css';

const AttributeGrid = (props) => {
  return (
    <div className={styles.root}>
      <Attribute
        icon={'delivery'}
        title={'Доставка'}
        subtitle={'Быстрая доставка по Москве'}
      />
      <Attribute
        icon={'cycle'}
        title={'Гарантия и возврат'}
        subtitle={'Можете вернуть товар в течение 30 дней'}
      />
      <Attribute
        icon={'creditcard'}
        title={'Безопасность'}
        subtitle={'Безопасные платежи онлайн'}
      />
    </div>
  );
};

export default AttributeGrid;
