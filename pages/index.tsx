import Markdown from "@/components/Markdown";
import Layout from "@/components/Layout";
import Profile from "@/components/Profile";
import Intro from "@/components/Profile/components/Intro";
import Icon from "@/components/Icon";
import resume from "@/public/dunayeu_yahor_resume.yml";
import Head from "@/components/Head";
import { NextPage } from "next";

const links = [
  {
    href: "/dunayeu_yahor_resume.yml",
    title: "Download resume as YML",
    el: <Icon icon="document-file-yml" />,
  },
  {
    href: "/dunayeu_yahor_resume.pdf",
    title: "Download resume as PDF",
    el: <Icon icon="document-file-pdf" />,
  },
];

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head title="About" />
      <Profile profile={resume}>
        <Intro title="About me" links={links}>
          <Markdown source={resume.about} />
        </Intro>
      </Profile>
    </Layout>
  );
};

export default AboutPage;
