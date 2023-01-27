import React from 'react';

import Swatch from '../Swatch';
import * as styles from './SwatchList.module.css';

const SwatchList = (props) => {
  const { swatchList, activeSwatch, setActiveSwatch, onClick } = props;
  return (
    <div className={styles.root}>
      <span className={styles.label}>Выберите цвет: {activeSwatch}</span>
      <div className={styles.swatchSelection}>
        {swatchList?.map((colorChoice, index) => {
          return (
            <Swatch
              key={index}
              data={colorChoice}
              setActiveSwatch={setActiveSwatch}
              isActive={activeSwatch === colorChoice.color}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SwatchList;
