import { createUseStyles, useTheme } from "react-jss";
import * as r from "ramda";
import { FunctionComponent } from "react";

interface GlitchProps {
  flip?: boolean;
}

const BLEND_COLORS = ["transparent", "#af4949"];
const BLEND_MODES = ["none", "overlay"];
const ANIMATION_TIME = "8s";
const ANIMATION_DELAY = "0.1s";
const GLITCH_HEIGHT = "100vh";
const GAP_HORIZONTAL = "10px";
const GAP_VERTICAL = "10px";

const useStyles = createUseStyles({
  container: {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    textAlign: "center",
    "&:after": {
      display: "block",
      content: "''",
      height: "100%",
      width: "100%",
      top: "0",
      left: "0",
      position: "absolute",
      background: "rgba(0, 0, 0, 0.4)",
    },

    color: "rgb(232, 230, 227)",
    textShadow: ({ theme }) => `0 0 10px ${theme.color.brand}`,
    textTransform: "uppercase",
  },
  glitchContainer: {},
  contentContainer: {
    zIndex: 999,
    maxWidth: 550,
    width: "100%",
    padding: ({ theme }) => `${theme.size.lg}px`,
    fontFamily: ({ theme }) => theme.font.title,
  },
  element: ({ flip }) => ({
    backgroundImage: "url(/home/cool-background-mobile.svg)",
    "@media only screen and (min-width: 576px)": {
      backgroundImage: "url(/home/cool-background.svg)",
    },
    transform: flip ? "rotate(180deg)" : null,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    position: "absolute",

    "&:nth-child(n+2)": {
      opacity: 0,
      animationDuration: ANIMATION_TIME,
      animationDelay: ANIMATION_DELAY,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },

    "&:nth-child(2)": {
      backgroundColor: BLEND_COLORS[0],
      backgroundBlendMode: BLEND_MODES[0],
      animationName: "$anim-3",
    },

    "&:nth-child(4)": {
      backgroundColor: BLEND_COLORS[0],
      backgroundBlendMode: BLEND_MODES[1],
      animationName: "$anim-4",
    },

    "&:nth-child(5)": {
      backgroundColor: BLEND_COLORS[1],
      backgroundBlendMode: BLEND_MODES[1],
      animationName: "$flash",
    },
  }),
  "@keyframes flash": {
    "0%,5%": {
      opacity: 0.2,
      transform: `translate3d(0, ${GLITCH_HEIGHT}, 0)`,
    },
    "5.5%,100%": {
      opacity: 0,
      transform: "translate3d(0, 0, 0)",
    },
  },
  "@keyframes anim-3": {
    "0%": {
      opacity: 1,
      transform: `translate3d(calc(-1 * ${GAP_HORIZONTAL}),0,0)`,
      clipPath: "polygon(0 25%, 100% 25%, 100% 30%, 0 30%)",
    },
    "3%": {
      clipPath: "polygon(0 3%, 100% 3%, 100% 3%, 0 3%)",
    },
    "5%": {
      clipPath: "polygon(0 5%, 100% 5%, 100% 20%, 0 20%)",
    },
    "7%": {
      clipPath: "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
    },
    "9%": {
      clipPath: "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
    },
    "11%": {
      clipPath: "polygon(0 52%, 100% 52%, 100% 59%, 0 59%)",
    },
    "13%": {
      clipPath: "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
    },
    "15%": {
      clipPath: "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
    },
    "17%": {
      clipPath: "polygon(0 65%, 100% 65%, 100% 40%, 0 40%)",
    },
    "19%": {
      clipPath: "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
    },
    "20%": {
      clipPath: "polygon(0 14%, 100% 14%, 100% 33%, 0 33%)",
    },
    "21.9%": {
      opacity: 1,
      transform: `translate3d(calc(-1 * ${GAP_HORIZONTAL},0,0)`,
    },
    "22%, 100%": {
      opacity: 0,
      transform: "translate3d(0,0,0)",
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
    },
  },
  "@keyframes anim-4": {
    "0%": {
      opacity: 1,
      transform: `translate3d(0, calc(-1 * ${GAP_VERTICAL}), 0) scale3d(-1,-1,1)`,
      clipPath: "polygon(0 1%, 100% 1%, 100% 3%, 0 3%)",
    },
    "1.5%": {
      clipPath: "polygon(0 10%, 100% 10%, 100% 9%, 0 9%)",
    },
    "2%": {
      clipPath: "polygon(0 5%, 100% 5%, 100% 6%, 0 6%)",
    },
    "2.5%": {
      clipPath: "polygon(0 20%, 100% 20%, 100% 20%, 0 20%)",
    },
    "3%": {
      clipPath: "polygon(0 10%, 100% 10%, 100% 10%, 0 10%)",
    },
    "5%": {
      clipPath: "polygon(0 30%, 100% 30%, 100% 25%, 0 25%)",
    },
    "5.5%": {
      clipPath: "polygon(0 15%, 100% 15%, 100% 16%, 0 16%)",
    },
    "7%": {
      clipPath: "polygon(0 40%, 100% 40%, 100% 39%, 0 39%)",
    },
    "8%": {
      clipPath: "polygon(0 20%, 100% 20%, 100% 21%, 0 21%)",
    },
    "9%": {
      clipPath: "polygon(0 60%, 100% 60%, 100% 55%, 0 55%)",
    },
    "10.5%": {
      clipPath: "polygon(0 30%, 100% 30%, 100% 31%, 0 31%)",
    },
    "11%": {
      clipPath: "polygon(0 70%, 100% 70%, 100% 69%, 0 69%)",
    },
    "13%": {
      clipPath: "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
    },
    "14%": {
      clipPath: "polygon(0 80%, 100% 80%, 100% 75%, 0 75%)",
    },
    "14.5%": {
      clipPath: "polygon(0 50%, 100% 50%, 100% 51%, 0 51%)",
    },
    "15%": {
      clipPath: "polygon(0 90%, 100% 90%, 100% 90%, 0 90%)",
    },
    "16%": {
      clipPath: "polygon(0 60%, 100% 60%, 100% 60%, 0 60%)",
    },
    "18%": {
      clipPath: "polygon(0 100%, 100% 100%, 100% 99%, 0 99%)",
    },
    "20%": {
      clipPath: "polygon(0 70%, 100% 70%, 100% 71%, 0 71%)",
    },
    "21.9%": {
      opacity: 1,
      transform: `translate3d(0, calc(-1 * ${GAP_VERTICAL}), 0) scale3d(-1,-1,1)`,
    },
    "22%, 100%": {
      opacity: 0,
      transform: "translate3d(0,0,0)",
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
    },
  },
});

const Glitch: FunctionComponent<GlitchProps> = ({ children, flip }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, flip });

  const glitches = r.pipe(
    r.range(0),
    r.map((x) => <div key={`glitch_${x}`} className={classes.element} />)
  )(5);

  return (
    <div className={classes.container}>
      <div className={classes.glitchContainer}>{glitches}</div>
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

export default Glitch;
