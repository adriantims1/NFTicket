import React from "react";
import { createIcon, Text } from "native-base";
import { Path, Rect } from "react-native-svg";

const PlusIcon = ({ color }) => {
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
        d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
      ></Path>,
    ],
  });
  return <CustomIcon size={7} />;
};

export default PlusIcon;
