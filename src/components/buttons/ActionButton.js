import { Button } from "native-base";
import React from "react";

const ActionButton = ({ text, width, onPress }) => {
  return (
    <Button
      variant="solid"
      colorScheme="primary"
      borderRadius={10}
      _text={{ color: "black", fontWeight: "bold" }}
      width={width ? width : 150}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
