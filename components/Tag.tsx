import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  tag: ({ theme }) => ({
    display: "inline-block",
    padding: `0 ${theme.size.sm}px`,
    margin: `1px ${theme.size.sm}px 1px 0`,
    border: `1px solid ${theme.color.border}`,
    fontFamily: theme.font.title,
    fontWeight: 400,
    fontStyle: "normal",
  }),
});

const Metadata: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return <span className={classes.tag}>{children}</span>;
};

export default Metadata;
