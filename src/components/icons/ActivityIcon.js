import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const ActivityIcon = ({ color, selected }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    path: [
      <Rect
        width="24"
        height="24"
        opacity="0"
        fill={color}
        transform="rotate(90 12 12)"
      />,
      <Path
        fill={color}
        d="M14.33 20h-.21a2 2 0 0 1-1.76-1.58L9.68 6l-2.76 6.4A1 1 0 0 1 6 13H3a1 1 0 0 1 0-2h2.34l2.51-5.79a2 2 0 0 1 3.79.38L14.32 18l2.76-6.38A1 1 0 0 1 18 11h3a1 1 0 0 1 0 2h-2.34l-2.51 5.79A2 2 0 0 1 14.33 20z"
      ></Path>,
    ],
  });
  return <CustomIcon size={7} />;
};

export default ActivityIcon;
