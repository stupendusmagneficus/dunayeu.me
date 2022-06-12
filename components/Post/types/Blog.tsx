import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Link from "@/components/Link";
import removeExcerpt from "@/utils/removeExcerpt";
import Title from "@/components/Post/components/Title";
import Image from "@/components/Post/components/Image";
import Metadata from "@/components/Post/components/Metadata";
import Markdown from "@/components/Markdown";
import { PostElementProps } from "@/components/Post";
import getIndentStyle from "@/utils/getIndentStyle";

const useStyles = createUseStyles({
  readMoreLink: {
    fontFamily: ({ theme }) => theme.font.title,
    fontSize: "0.8em",
    display: "inline-block",
    margin: ({ theme }) => `${theme.size.sm}px 0`,
    padding: ({ theme }) => `${theme.size.sm}px ${theme.size.md}px`,
    border: ({ theme }) => `2px solid ${theme.color.body}`,
    color: ({ theme }) => theme.color.body,
    background: ({ theme }) => theme.color.background,
    "&:hover,&:active": {
      color: "#FFFFFF",
      background: "#000000",
    },
  },
  postBody: {
    "& p:first-of-type::first-letter": getIndentStyle(),
  },
});

const Post: FunctionComponent<PostElementProps> = (props) => {
  const { slug, post, short } = props;
  const theme = useTheme();
  const classes = useStyles({ theme, short });
  const href = `/blog/${slug}`;

  return (
    <>
      <Title {...props} />
      <Image {...props} />
      {short ? (
        <>
          <Markdown {...props}>{post.excerpt}</Markdown>
          <Link to="/blog/[slug]" as={href}>
            {() => <a className={classes.readMoreLink}>Read more</a>}
          </Link>
        </>
      ) : (
        <div className={classes.postBody}>
          <Markdown>{removeExcerpt(post.content)}</Markdown>
        </div>
      )}
      <Metadata {...props} />
    </>
  );
};

export default Post;
