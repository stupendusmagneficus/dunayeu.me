import { createUseStyles, useTheme } from "react-jss";
import * as r from "ramda";
import { NextPage } from "next";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import matter from "@/utils/matter";
import getSlug from "@/utils/getSlug";
import Head from "@/components/Head";

interface RawPost {
  rawPost: string;
  slug: string;
}

const useStyles = createUseStyles({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    borderBottom: ({ theme }) => `1px solid ${theme.color.border}`,
    margin: ({ theme }) => `${theme.size.lg}px 0 0`,
    padding: ({ theme }) => `0 0 ${theme.size.lg}px`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

const BlogPage: NextPage<{ rawPosts: RawPost[] }> = ({ rawPosts }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const posts = r.pipe(
    r.map(({ rawPost, ...rest }: RawPost) => ({
      ...rest,
      post: matter(rawPost),
    })),
    r.sort((a, b) => b.post.data.date.getTime() - a.post.data.date.getTime())
  )(rawPosts);

  return (
    <Layout>
      <Head title="Blog" />
      <ul className={classes.list}>
        {posts.map(({ slug, post }) => (
          <li className={classes.listItem} key={slug}>
            <Post slug={slug} post={post} short />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const context = (require as any).context("../../posts", true, /\.md$/);
  const keys = context.keys();

  const rawPosts: RawPost[] = r.reduce((acc: RawPost[], filename: string) => {
    const rawPost = context(filename).default as string;

    const newPost = {
      rawPost,
      slug: getSlug(filename),
    };

    return [newPost, ...acc];
  }, [])(keys);

  return {
    props: { rawPosts },
  };
};

export default BlogPage;
