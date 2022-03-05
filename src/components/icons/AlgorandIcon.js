import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const ActivityIcon = ({ color }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    path: [
      <Rect width="24" height="24" opacity="0" fill={color} />,
      <Path
        fill={color}
        d="M22.75 22.5302H19.2225L16.9315 14.0082L12.006 22.5311H8.0678L15.6808 9.3385L14.4555 4.75845L4.19005 22.534H0.25L13.2595 0H16.7087L18.219 5.59857H21.7777L19.348 9.82369L22.75 22.5302Z"
      ></Path>,
    ],
  });
  return <CustomIcon size={7} />;
};

export default ActivityIcon;
