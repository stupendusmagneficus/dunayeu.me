import Link from "@/components/Link";
import { createUseStyles, useTheme } from "react-jss";
import { FunctionComponent } from "react";

/**
 * I have to call `createUseStyles` inside the render function because of a bug in React JSS:
 * https://github.com/cssinjs/jss/issues/1320
 */

interface LinkType {
  to?: string;
  href?: string;
  el: React.ReactNode;
}

interface NavProps {
  links: LinkType[];
  noHover?: boolean;
}

const Nav: FunctionComponent<NavProps> = ({ links, noHover }) => {
  const useStyles = createUseStyles({
    nav: {
      alignItems: "start",
      textTransform: "uppercase",
      fontStyle: "italic",
      fontWeight: 600,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      fontFamily: ({ theme }) => theme.font.title,
    },
    link: ({ theme, noHover }) => ({
      display: "block",
      padding: `${theme.size.lg}px ${theme.size.lg * 2}px`,
      borderBottom: `${theme.size.sm}px solid transparent`,

      [theme.responsive.mobile]: {
        padding: `${theme.size.md}px ${theme.size.md * 2}px`,
      },

      "&.isActive": {
        borderBottomColor: theme.color.border,
      },

      "&:hover, &:active": !noHover && {
        color: theme.color.brand,
        borderBottomColor: theme.color.brand,
      },
    }),
  });

  const theme = useTheme();
  const classes = useStyles({ theme, noHover });

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {links.map(({ to, href, el }) => (
          <li key={to || href} className={classes.listItem}>
            <Link to={to} href={href}>
              {({ isActive }) => (
                <a
                  href={href || to}
                  target={href ? "_blank" : undefined}
                  className={`${classes.link} ${isActive && "isActive"}`}
                >
                  {el}
                </a>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
