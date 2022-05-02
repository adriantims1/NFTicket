import { Button, Box } from "native-base";
import React from "react";

const ActionButton = ({ text, width, onPress, mt, isDisabled }) => {
  return (
    <Button
      variant="solid"
      colorScheme="primary"
      borderRadius={10}
      _text={{
        color: "black",
        fontWeight: "bold",
      }}
      width={width ? width : 150}
      onPress={onPress}
      mt={mt}
      isDisabled={typeof isDisabled === "undefined" ? false : isDisabled}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
