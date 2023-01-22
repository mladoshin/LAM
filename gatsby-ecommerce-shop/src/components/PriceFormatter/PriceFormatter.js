import React from 'react';
import { isNumeric } from '../../helpers/general';
import * as styles from './PriceFormatter.module.css';

const CurrencyFormatter = ({
  amount
}) => {
  const formatted_price = amount > 1000 ? `${Math.floor(amount / 1000)}.${amount % 1000 == 0 ? '000' : amount % 1000}` : JSON.stringify(amount)

  return isNumeric(amount) ? <span>{formatted_price} руб</span> : 'No price available';
};

export default CurrencyFormatter;
