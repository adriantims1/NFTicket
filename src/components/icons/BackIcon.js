import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const BackIcon = ({ color }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    path: [
      <Rect
        width="24"
        height="24"
        opacity="0"
        fill="transparent"
        transform="rotate(90 12 12)"
      />,
      <Path
        fill={color}
        d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
      />,
    ],
  });
  return <CustomIcon size={10} />;
};

export default BackIcon;
