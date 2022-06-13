import { createUseStyles } from "react-jss";
import Head from "@/components/Head";
import Nav from "@/components/Nav";
import { NextPage } from "next";
import React from "react";
import Glitch from "@/components/Glitch";

const LINKS = [
  { to: "/about", el: "About" },
  { to: "/blog", el: "Blog" },
  { href: "mailto:yadunayeu@gmail.com", el: "Contact" },
];

const useStyles = createUseStyles({
  text: {
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: 900,
  },
});

const HomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <Head />
      <Glitch useAnimation={false}>
        <h1 className={classes.text}>
          Surf it easy
        </h1>
        <Nav links={LINKS} noHover />
      </Glitch>
    </>
  );
};

export default HomePage;
