import React from "react";
import { createIcon, Text } from "native-base";
import { Path, Rect } from "react-native-svg";

const CoinbaseIcon = ({ color }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 34 34",
    path: [
      <Path
        d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34Z"
        fill="#1652F0"
      />,
      <Path
        d="M18.5671 22.3125C19.4371 22.3125 20.307 22.1199 21.0773 21.8311L22.7175 24.3412C21.2699 25.1148 19.7226 25.5 18.0824 25.5C13.1583 25.5 9.48608 22.2162 9.48608 17C9.58237 11.7838 13.3509 8.5 18.1787 8.5C19.9185 8.5 21.1736 8.88516 22.525 9.5625L20.981 12.1689C20.2074 11.8801 19.3408 11.6875 18.4708 11.6875C15.5722 11.6875 13.2546 13.5236 13.2546 17C13.2546 20.2838 15.4759 22.3125 18.5671 22.3125Z"
        fill="white"
      ></Path>,
    ],
  });
  return <CustomIcon size={7} />;
};

export default CoinbaseIcon;
