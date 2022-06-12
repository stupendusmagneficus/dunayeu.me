import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PostElementProps } from "@/components/Post";
import { formatDate } from "@/utils/date";
import Tag from "@/components/Tag";
import Markdown from "@/components/Markdown";
import * as r from "ramda";

/**
 * I have to call `createUseStyles` inside the render function because of a bug in React JSS:
 * https://github.com/cssinjs/jss/issues/1320
 */

const KNOWN_KEYS = [
  "title",
  "date",
  "tags",
  "image",
  "imageAlt",
  "imageAttr",
  "link",
];
const getOtherMeta = r.curry((keys: string[], data: object) =>
  r.pipe(
    r.keys,
    r.reject((key: string) => keys.includes(key)),
    r.map((key) => ({ key, value: r.path([key], data) }))
  )(data)
);

const Metadata: FunctionComponent<PostElementProps> = (props) => {
  const { post, short } = props;

  const useStyles = createUseStyles({
    container: ({ theme, short }) => ({
      borderTop: !short && `1px solid ${theme.color.border}`,
      margin: short ? `${theme.size.sm}px 0px` : `${theme.size.lg}px 0px`,
      padding: !short && `${theme.size.lg}px 0px`,
      display: "flex",
      alignItems: "center",

      [theme.responsive.mobile]: {
        display: "block",
      },
    }),
    key: {
      textTransform: "capitalize",
    },
    content: ({ theme }) => ({
      fontSize: "0.8em",
      display: "flex",
      alignItems: "center",
      margin: `${theme.size.sm}px ${theme.size.md}px ${theme.size.sm}px 0`,
      paddingRight: theme.size.md,
      color: theme.color.off,
      fontFamily: theme.font.title,
      borderRight: `1px solid ${theme.color.border}`,
      whiteSpace: "nowrap",
      wordBreak: "keep-all",

      "&:last-child": {
        borderRight: "none",
      },

      [theme.responsive.mobile]: {
        borderRight: "none",
        width: "100%",
      },
    }),

    tags: {
      flexWrap: "wrap",
    },
  });

  const theme = useTheme();
  const classes = useStyles({ theme, short });
  const otherMeta = getOtherMeta(KNOWN_KEYS)(post.data);

  return (
    <div className={classes.container}>
      <div className={classes.content}>{formatDate(post.data.date)}</div>
      {post.data.tags && post.data.tags.length && (
        <div className={`${classes.content} ${classes.tags}`}>
          Tags:&nbsp;&nbsp;
          {post.data.tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
      {otherMeta.map(({ key, value }) => (
        <div key={key} className={classes.content}>
          <span className={classes.key}>{key}</span>:&nbsp;
          <Markdown>{value as string}</Markdown>
        </div>
      ))}
    </div>
  );
};

export default Metadata;
