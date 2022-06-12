import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { PostElementProps } from "@/components/Post";
import Metadata from "@/components/Post/components/Metadata";
import Title from "@/components/Post/components/Title";

const useStyles = createUseStyles({
  container: ({ theme }) => ({
    textAlign: "center",
  }),
});

const TitlePost: FunctionComponent<PostElementProps> = (props) => {
  const { post, short } = props;
  const theme = useTheme();
  const classes = useStyles({ theme, short });

  return (
    <>
      <div className={classes.container}>
        <Title {...props} href={post.data.link} />
      </div>
      <Metadata {...props} />
    </>
  );
};

export default TitlePost;
