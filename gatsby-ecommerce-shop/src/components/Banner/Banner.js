import React from 'react';
import * as styles from './Banner.module.css';
import config from "../../config.json"
import classNames from 'classnames';

const Banner = (props) => {
  const {
    banner={},
    maxWidth,
    name,
    subtitle,
    color,
    bgImage,
    height,
    bgColor = 'var(--standard-light-grey)',
    hideSubtitleOnMobile = true,
    className=""
  } = props;

  const customStyling = {
    backgroundColor: bgColor,
    backgroundImage: banner.image?.url !== undefined ? `url(${config.STRAPI_API_URL}${banner?.image?.url})` : 'none',
    height: height,
    color: color,
  };

  return (
    <div className={classNames(styles.root, className)} style={customStyling}>
      <div className={styles.content} style={{ maxWidth: maxWidth }}>
        <h2>{banner?.title}</h2>
        {subtitle && (
          <span
            className={`${styles.subtitle} ${
              hideSubtitleOnMobile === true ? styles.hideSubtitleOnMobile : ''
            }`}
          >
            {banner?.cta}
          </span>
        )}
      </div>
    </div>
  );
};

export default Banner;
