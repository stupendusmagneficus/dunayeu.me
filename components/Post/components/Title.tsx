import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Link from "@/components/Link";
import { PostElementProps } from "@/components/Post";
import { formatDate } from "@/utils/date";
import * as r from "ramda";

interface TitleProps extends PostElementProps {
  href?: string;
  target?: string;
}

const useStyles = createUseStyles({
  container: ({ theme, short }) => ({
    display: "flex",
    justifyContent: "space-between",
    borderBottom: !short && `1px solid ${theme.color.border}`,
    margin: `0 0 ${theme.size.sm}px 0`,
    padding: `${theme.size.sm}px 0`,

    [theme.responsive.mobile]: {
      display: "block",
    },
  }),
  title: {
    flex: 1,
    fontSize: 24,
    margin: ({ theme }) => `${theme.size.sm}px 0px`,
  },
  date: ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    fontFamily: theme.font.title,
    fontSize: "0.9em",
    color: theme.color.off,

    [theme.responsive.mobile]: {
      display: "none",
    },
  }),
});

const Title: FunctionComponent<TitleProps> = (props) => {
  const { slug, post, short } = props;
  const theme = useTheme();
  const classes = useStyles({ theme, short });

  const titleEl = (
    <div className={classes.container}>
      <h1 className={classes.title}>{post.data.title}</h1>
      {!short && (
        <div className={classes.date}>{formatDate(post.data.date)}</div>
      )}
    </div>
  );

  if (short) {
    // If a `href` prop is supplied, use it instead of link
    // Otherwise fall back to linking to post
    const linkProps = r.cond([
      [
        r.where({ href: r.is(String) }),
        r.always({ href: props.href, target: props.target }),
      ],
      [r.T, r.always({ as: `/blog/${slug}`, to: "/blog/[slug]" })],
    ])(props);

    return <Link {...linkProps}>{titleEl}</Link>;
  }

  return titleEl;
};

export default Title;
