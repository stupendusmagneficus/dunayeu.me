import { FunctionComponent } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  printOnly: {
    display: "none",
    "@media only print": {
      display: "inline",
    },
  },
});

const PrintOnly: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <span className={classes.printOnly}>{children}</span>;
};

export default PrintOnly;
