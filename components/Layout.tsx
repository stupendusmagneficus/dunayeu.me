import { createUseStyles, useTheme } from "react-jss";
import { FunctionComponent } from "react";
import Nav from "@/components/Nav";
import { getHeaderStyles } from "@/utils/theme";

const LINKS = [
  { to: "/", el: "About" },
  { to: "/blog", el: "Blog" },
  {
    href: "https://www.linkedin.com/in/yahor-dunayeu-375855203/",
    el: "Contact",
  },
];

const useStyles = createUseStyles({
  container: ({ theme }) => ({
    display: "flex",
    minHeight: "100%",
    flexDirection: "column",
    alignItems: "center",
    background: theme.color.background,
  }),
  navContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  nav: ({ theme }) => ({
    width: "100%",
    maxWidth: theme.size.width,
    borderBottom: `1px solid ${theme.color.border}`,
  }),
  contentContainer: ({ theme }) => ({
    width: "100%",
    padding: `${theme.size.lg}px ${theme.size.lg}px`,
    maxWidth: theme.size.width,
    fontSize: `${theme.size.font}px`,

    ...getHeaderStyles(),
  }),
});

const Layout: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.container}>
      <div className={classes.navContainer}>
        <div className={classes.nav}>
          <Nav links={LINKS} />
        </div>
      </div>
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

export default Layout;
