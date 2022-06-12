import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  title: ({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: `0 0 ${theme.size.lg}px 0`,
  }),
  titleText: {
    margin: 0,
    flex: 1,
    "@media only print": {
      fontSize: ({ theme }) => `${theme.size.font * 2}px !important`,
    },
  },
  titleLink: ({ theme }) => ({
    color: theme.color.off,
    fontSize: `${theme.size.font * 1.5}px !important`,
    height: `${theme.size.font * 1.5}px !important`,
    marginLeft: theme.size.lg,

    "&:hover, &:active": {
      color: theme.color.brand,
    },
  }),
  introContainer: ({ theme }) => ({
    display: "flex",
    flexDirection: "row",

    [theme.responsive.mobile]: {
      flexDirection: "column-reverse",
    },
  }),
  intro: {
    flex: 2,

    "& p": {
      margin: ({ theme }) => `0 0 ${theme.size.md}px`,
    },
  },
  photo: ({ theme }) => ({
    flex: 1,
    margin: `0 0 0 ${theme.size.lg}px`,

    [theme.responsive.mobile]: {
      // Trying to center my face in the pic
      maxHeight: 450,
      paddingTop: 50,
      margin: `0 0 ${theme.size.lg}px 0`,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    },
  }),
  photoLink: {
    display: "block",
    lineHeight: 0,
  },
});

interface IntroProps {
  title: React.ReactNode;
  links?: {
    href: string;
    title: string;
    el: React.ReactNode;
  }[];
}

export const Intro: FunctionComponent<IntroProps> = ({
  children,
  links,
  title,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <div className={classes.title}>
        <h1 className={classes.titleText}>{title}</h1>
        {links &&
          links.map((link) => (
            <a
              className={classes.titleLink}
              key={link.href}
              href={link.href}
              title={link.title}
              target="_blank"
            >
              {link.el}
            </a>
          ))}
      </div>
      <div className={classes.introContainer}>
        <div className={classes.intro}>{children}</div>
        <div className={classes.photo}>
          <a
            href="/profile/avatar.webp"
            target="_blank"
            className={classes.photoLink}
          >
            <img src="/profile/avatar.webp" alt="A photo of me" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Intro;
