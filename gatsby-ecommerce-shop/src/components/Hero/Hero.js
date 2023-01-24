import React from 'react';
import * as styles from './Hero.module.css';
import Button from '../Button';
import { Link } from 'gatsby';
import classnames from "classnames"

const Hero = (props) => {
  const {
    title,
    subtitle,
    ctaText,
    ctaAction,
    image,
    maxWidth,
    ctaStyle,
    ctaLink,
    ctaTo,
    header,
    style,
    children
  } = props;
  return (
    <div className={styles.root} style={{ backgroundImage: `url(${image})`, ...style }}>
      <div className={styles.content} style={{ maxWidth: maxWidth }}>
        {header && <h2 className={classnames(styles.title, styles.gold)}>{header}</h2>}
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {children}
        {ctaText && (
          <Button
            className={`${styles.ctaButton} ${ctaStyle}`}
            level={'primary'}
            onClick={ctaAction}
          >
            {ctaText}
          </Button>
        )}
        {ctaLink && (
          <Link className={styles.ctaLink} to={ctaTo}>
            {ctaLink}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
