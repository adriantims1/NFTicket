import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const MarketIcon = ({ color, selected }) => {
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
        d="M20.12 6.71l-2.83-2.83A3 3 0 0 0 15.17 3H8.83a3 3 0 0 0-2.12.88L3.88 6.71A3 3 0 0 0 3 8.83V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8.83a3 3 0 0 0-.88-2.12zm-12-1.42A1.05 1.05 0 0 1 8.83 5h6.34a1.05 1.05 0 0 1 .71.29L17.59 7H6.41zM18 19H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1z"
      ></Path>,
      <Path
        fill={color}
        d="M15 11a1 1 0 0 0-1 1 2 2 0 0 1-4 0 1 1 0 0 0-2 0 4 4 0 0 0 8 0 1 1 0 0 0-1-1z"
      />,
    ],
  });
  return <CustomIcon size={7} />;
};

export default MarketIcon;
