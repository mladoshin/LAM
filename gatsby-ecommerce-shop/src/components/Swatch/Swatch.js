import { navigate } from 'gatsby';
import React from 'react';
import * as styles from './Swatch.module.css';

const Swatch = (props) => {
  const { data, setActiveSwatch, isActive } = props;
  const colors = data.color.split("-")

  return (
    <button
      className={`${styles.root} ${isActive === true ? styles.isActive : ''}`}
      onClick={() => {
        setActiveSwatch(data.color)
        console.log("redirect")
        const path = window.location.pathname.split('/')
        path.splice(-1, 1)
        navigate(`${window.location.origin}${path.join('/')}/${data.slug}`)
      }}
    >
      <div
        style={{ backgroundColor: data.color, display: "flex"}}
        className={styles.circle}
      >
        {colors.map(col => (
          <div style={{ backgroundColor: col, flexGrow: 1}}></div>
        ))}
      </div>
    </button>
  );
};

export default Swatch;
