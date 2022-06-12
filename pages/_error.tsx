import { createUseStyles, useTheme } from "react-jss";
import Head from "@/components/Head";
import Glitch from "@/components/Glitch";
import { NextPage } from "next";

const useStyles = createUseStyles({
  text: {
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: 900,
  },
  subtext: {
    fontFamily: ({ theme }) => theme.font.title,
  },
});

const ErrorPage: NextPage = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <Head title="Error" />
      <Glitch flip>
        <h1 className={classes.text}>You should not be here</h1>
        <div className={classes.subtext}>An error has occured</div>
      </Glitch>
    </>
  );
};

export default ErrorPage;
