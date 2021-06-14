import React from 'react';
import classes from './Statistic.module.css';

const Statistic = (props) => {
    return (
        <div>
            <table >
            <colgroup className={classes.row}>
    <col />
    <col />
  </colgroup>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </tbody>
      </table>
        </div>
    )
}

export default Statistic;
