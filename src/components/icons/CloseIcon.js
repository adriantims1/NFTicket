import React from "react";
import { createIcon, Text } from "native-base";
import { Path, Rect } from "react-native-svg";

const CloseIcon = ({ color }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    path: [
      <Rect
        width="24"
        height="24"
        transform="rotate(180 12 12)"
        opacity="0"
        fill={color}
      />,
      <Path
        fill={color}
        d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
      ></Path>,
    ],
  });
  return <CustomIcon size={7} />;
};

export default CloseIcon;
