import React from "react";
import { createIcon } from "native-base";
import { Path, Rect } from "react-native-svg";

const EditProfileIcon = ({ color, selected }) => {
  const CustomIcon = createIcon({
    viewBox: "0 0 24 24",
    path: [
      <Rect width="24" height="24" opacity="0" fill={color} />,

      <Path
        fill={color}
        d="M19.4 7.34L16.66 4.6A2 2 0 0 0 14 4.53l-9 9a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71zM9.08 17.62l-3 .28.27-3L12 9.32l2.7 2.7zM16 10.68L13.32 8l1.95-2L18 8.73z"
      ></Path>,
    ],
  });
  return <CustomIcon size={10} />;
};

export default EditProfileIcon;
