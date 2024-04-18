import React from "react";
import Button from '@mui/material/Button';

const primaryButton = ({ children, style, onClick, variant }) => {
  return (
    <Button variant={variant} style={style} onClick={onClick}>
      {children}
    </Button>
  );
};

export default primaryButton;
