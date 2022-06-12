import Markdown from "@/components/Markdown";
import Profile from "@/components/Profile";
import Intro from "@/components/Profile/components/Intro";
import resume from "@/public/dunayeu_yahor_resume.yml";
import { getHeaderStyles } from "@/utils/theme";
import { createUseStyles } from "react-jss";
import { NextPage } from "next";

const useStyles = createUseStyles({
  container: {
    ...getHeaderStyles(),
  },
});

const introContent = `
${resume.intro}

* Date of birth: ${resume.dob}
* Email: <${resume.email}>
* Website: <${resume.website}>
* Location: ${resume.location}
`;

const ResumePage: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,600;1,400;1,600&display=swap"
        rel="stylesheet"
      />
      <Profile profile={resume}>
        <Intro title={resume.name}>
          <Markdown source={introContent} />
        </Intro>
      </Profile>
    </div>
  );
};

export default ResumePage;
