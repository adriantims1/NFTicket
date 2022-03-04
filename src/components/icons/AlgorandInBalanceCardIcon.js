import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const AlgorandInBalanceCardIcon = ({ color }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 45 46",
    path: [
      <Path
        fill="#1E3059"
        d="M45 23C45 35.4264 34.9264 45.5 22.5 45.5C10.0736 45.5 0 35.4264 0 23C0 10.5736 10.0736 0.5 22.5 0.5C34.9264 0.5 45 10.5736 45 23Z"
      />,

      <Path
        fill="#FFFBFB"
        d="M32.25 34.2802H28.7225L26.4315 25.7582L21.506 34.2812H17.5678L25.1808 21.0885L23.9555 16.5085L13.69 34.284H9.75L22.7595 11.75H26.2087L27.719 17.3486H31.2777L28.848 21.5737L32.25 34.2802Z"
      ></Path>,
    ],
  });
  return <CustomIcon size={10} />;
};

export default AlgorandInBalanceCardIcon;
