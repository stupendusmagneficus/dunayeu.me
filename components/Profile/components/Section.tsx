import { FunctionComponent, ReactNode } from "react";
import { createUseStyles, useTheme } from "react-jss";

interface SectionProps {
  title: ReactNode;
}

const useStyles = createUseStyles({
  section: ({ theme }) => ({
    margin: `${theme.size.lg * 2}px 0`,
  }),
  sectionTitle: ({ theme }) => ({
    margin: `${theme.size.lg}px 0 0`,
  }),
  sectionContent: ({ theme }) => ({
    marginLeft: 2,
    paddingLeft: theme.size.lg,
    borderLeft: `2px solid ${theme.color.body}`,
  }),
});

export const Section: FunctionComponent<SectionProps> = ({
  title,
  children,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.section}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      <div className={classes.sectionContent}>{children}</div>
    </div>
  );
};
