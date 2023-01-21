import { navigate } from 'gatsby';
import React from 'react';
import * as styles from './Swatch.module.css';

const Swatch = (props) => {
  const { data, setActiveSwatch, isActive } = props;

  return (
    <button
      className={`${styles.root} ${isActive === true ? styles.isActive : ''}`}
      onClick={() => {
        setActiveSwatch(data.color)
        console.log("redirect")
        const path = window.location.pathname.split('/')
        path.splice(-1, 1)
        navigate(`${window.location.origin}${path.join('/')}/${data.slug}`)
        //navigate(new_path)
      }}
    >
      <div
        style={{ backgroundColor: data.color }}
        className={styles.circle}
      ></div>
    </button>
  );
};

export default Swatch;
