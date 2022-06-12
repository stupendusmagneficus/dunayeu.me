import { FunctionComponent, ReactNode } from "react";
import * as r from "ramda";

interface ListItemProps {
  checked: boolean;
  children: ReactNode;
}

const ListItem: FunctionComponent<ListItemProps> = ({ checked, children }) => {
  let className;

  if (!r.isNil(checked)) {
    className = checked ? "checked" : "unchecked";
  }

  return <li className={className}>{children}</li>;
};

export default ListItem;
