import { FunctionComponent } from "react";
import Image from "@/components/Post/components/Image";
import Metadata from "@/components/Post/components/Metadata";
import Title from "@/components/Post/components/Title";
import { PostElementProps } from "@/components/Post";

const Media: FunctionComponent<PostElementProps> = (props) => {
  return (
    <>
      <Title {...props} />
      <Image {...props} />
      <Metadata {...props} />
    </>
  );
};

export default Media;
