import { GrayMatterFile } from "gray-matter";
import BlogPost from "./types/Blog";
import TitlePost from "./types/Title";
import MediaPost from "./types/Media";
import * as r from "ramda";
import { FunctionComponent } from "react";

const isMediaPost = r.where({
  content: r.isEmpty,
  data: r.where({ image: r.is(String) }),
});
const isTitlePost = r.where({
  content: r.isEmpty,
  data: r.where({ image: r.isNil }),
});

export interface PostProps {
  slug: string;
  post: GrayMatterFile<string>;
  short?: boolean;
}

export interface PostElementProps extends Partial<PostProps> {
  post: GrayMatterFile<string>;
}

/**
 * This component renders a blog post, depending on it's content
 * Styles and markup are defined in the *Post components
 */
const Post: FunctionComponent<PostProps> = ({ post, ...props }) => {
  const element = r.cond([
    [isMediaPost, r.always(<MediaPost post={post} {...props} />)],
    [isTitlePost, r.always(<TitlePost post={post} {...props} />)],
    [r.T, r.always(<BlogPost post={post} {...props} />)],
  ])(post);

  return <article>{element}</article>;
};

export default Post;
