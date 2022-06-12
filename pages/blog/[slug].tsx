import { createUseStyles, useTheme } from "react-jss";
import { NextPage } from "next";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import matter from "@/utils/matter";
import getSlug from "@/utils/getSlug";
import Head from "@/components/Head";

const useStyles = createUseStyles({
  container: {
    margin: ({ theme }) => `${theme.size.lg}px 0 0`,
    padding: ({ theme }) => `0 0 ${theme.size.lg}px`,
  },
});

const BlogPage: NextPage<{ raw?: string }> = ({ raw }) => {
  if (!raw) {
    return null;
  }
  const theme = useTheme();
  const classes = useStyles({ theme });
  const post = matter(raw);

  return (
    <Layout>
      <Head title={post.data.title} description={post.excerpt} />
      <div className={classes.container}>
        <Post slug={"/"} post={post} />
      </div>
    </Layout>
  );
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;

  const content = await import(`../../posts/${slug}.md`);
  const raw = content.default;

  return {
    props: { raw },
  };
};

export async function getStaticPaths() {
  const context = (require as any).context("../../posts", true, /\.md$/);
  const keys = context.keys();

  const paths = keys.map((filename: string) => ({
    params: { slug: getSlug(filename) },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default BlogPage;
