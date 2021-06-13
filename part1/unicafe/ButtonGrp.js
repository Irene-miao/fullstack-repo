import React from "react";
import classes from './ButtonGrp.module.css';
import Button from './Button';

const ButtonGrp = (props) => {
  return (
    <div className={classes.buttongrp}>
      <Button onClick={props.onGoodClick} text={props.good}/>
      <Button onClick={props.onNeutralClick} text={props.neutral} />
      <Button onClick={props.onBadClick} text={props.bad} />
    </div>
  );
};

export default ButtonGrp;
