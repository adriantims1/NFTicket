import React from "react";
import { createIcon, Text } from "native-base";
import { Path } from "react-native-svg";

const MastercardIcon = () => {
  const CustomIcon = createIcon({
    viewBox: "0 0 71 40",
    path: [
      <Path
        fill="#1E3059"
        d="M41 20C41 31.0457 31.8218 40 20.5 40C9.17816 40 0 31.0457 0 20C0 8.9543 9.17816 0 20.5 0C31.8218 0 41 8.9543 41 20Z"
      />,
      <Path
        fill="#1E3059"
        fillOpacity={0.5}
        d="M71 20C71 31.0457 61.8218 40 50.5 40C39.1782 40 30 31.0457 30 20C30 8.9543 39.1782 0 50.5 0C61.8218 0 71 8.9543 71 20Z"
      ></Path>,
    ],
  });
  return <CustomIcon size="xl" />;
};

export default MastercardIcon;
