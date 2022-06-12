import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";

interface SkillLevelProps {
  level: number;
}

const useStyles = createUseStyles({
  skillLevel: ({ theme, level }) => ({
    fontSize: "36px",
    lineHeight: 1,
    height: 20,
    margin: 0,
    padding: 0,
    fontFamily: theme.font.title,
    color: theme.color.body,
    position: "relative",

    "&:after": {
      display: "block",
      content: "' '",
      background: "rgba(255,255,255,0.85)",
      position: "absolute",
      top: "0",
      right: "0",
      width: `${(1 - level) * 100}%`,
      height: "100%",
      pointerEvents: "none",
    },
  }),
});

export const SkillLevel: FunctionComponent<SkillLevelProps> = ({ level }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, level });

  const label = `${(level * 100) / 10}/10`;

  return (
    <span className={classes.skillLevel} title={label}>
      *****
    </span>
  );
};
