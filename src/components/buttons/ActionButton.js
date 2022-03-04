import { Button } from "native-base";
import React from "react";

const ActionButton = ({ text, style }) => {
  return (
    <Button
      variant="solid"
      colorScheme="primary"
      borderRadius={10}
      _text={{ color: "black", fontWeight: "bold" }}
      py={2}
      style={style}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
