import { FunctionComponent } from "react";
import IcoMoon, { IconProps } from "react-icomoon";

import iconSet from "@/utils/iconSet";

const Icon: FunctionComponent<Partial<IconProps>> = ({
  icon = "",
  size = "1em",
  ...props
}) => {
  return <IcoMoon iconSet={iconSet} icon={icon} size={size} {...props} />;
};

export default Icon;
