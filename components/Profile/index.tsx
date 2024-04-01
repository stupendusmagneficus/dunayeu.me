import { FunctionComponent } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { SkillLevel } from "@/components/Profile/components";
import {
  Item,
  ItemTitle,
  ItemName,
  ItemInfo,
  ItemText,
  ItemList,
} from "@/components/Profile/components/Item";
import { Section } from "@/components/Profile/components/Section";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";
import PrintOnly from "@/components/PrintOnly";
import { getDateDiff, formatDate } from "@/utils/date";
import { Resume } from "@/public/dunayeu_yahor_resume.yml";

interface ProfileProps {
  profile: Resume;
}

const useStyles = createUseStyles({
  experienceAt: ({ theme }) => ({
    color: theme.color.off,
  }),
  experienceLength: ({ theme }) => ({
    color: theme.color.off,
  }),
  tags: ({ theme }) => ({
    display: "inline-block",
    fontSize: "0.8em",
  }),
  projectLink: ({ theme }) => ({
    fontSize: 20,
    lineHeight: "16px",
    color: theme.color.body,

    "&:hover, &:active": {
      color: theme.color.brand,
    },
  }),
  projectURL: {
    fontSize: "0.8em",
    margin: "0 8px",
  },

  languangesContainer: {
    display: "flex",
  },

  languageContainer: {
    flex: 1,
  },
});

const Profile: FunctionComponent<ProfileProps> = ({ profile, children }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      {children}

      <Section title="Experience">
        {profile.experience.map((exp) => {
          const lengthHint = `${formatDate(exp.from)} - ${
            exp.to ? formatDate(exp.to) : "Present"
          }`;
          const { diffYears, diffMonths } = getDateDiff(exp.from, exp.to);

          const companyEl = exp.company ? (
            <>
              <span className={classes.experienceAt}> at</span> {exp.company}
            </>
          ) : null;

          return (
            <Item key={`${exp.role}_${exp.company}`}>
              <ItemTitle>
                <ItemName>
                  {exp.role}
                  {companyEl}
                </ItemName>
                <ItemInfo>
                  <span className={classes.experienceLength} title={lengthHint}>
                    {diffYears > 0 && `${diffYears} year`}
                    {diffYears ? 1 && "s " : " "}
                    {diffMonths > 0 && `${diffMonths} month`}
                    {diffMonths ? 1 && "s " : " "}
                  </span>
                  <PrintOnly>&nbsp; {lengthHint}</PrintOnly>
                </ItemInfo>
              </ItemTitle>
              <ItemText>{exp.note}</ItemText>
              <ItemList items={exp.highlights}></ItemList>
            </Item>
          );
        })}
      </Section>

      <Section title="Skills">
        {profile.skills.map((skill) => {
          return (
            <Item key={skill.name}>
              <ItemTitle>
                <ItemName>{skill.name}</ItemName>
                <ItemInfo>
                  {skill.link && (
                    <a
                      href={skill.link}
                      style={{ marginRight: 8 }}
                      className={classes.projectLink}
                      target="_blank"
                    >
                      <Icon icon="new-tab" />
                    </a>
                  )}
                  <SkillLevel level={skill.level} />
                </ItemInfo>
              </ItemTitle>
              <ItemText>{skill.note}</ItemText>
              {skill.tech && (
                <div className={classes.tags}>
                  {skill.tech.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}
            </Item>
          );
        })}
      </Section>

      <Section title="Certifications">
        {profile.certifications.map((certification) => {
          return (
            <Item key={certification.name}>
              <ItemTitle oneline>
                <ItemName>{certification.name}</ItemName>
                <ItemInfo>
                  <>
                    <PrintOnly>
                      <a
                        href={certification.link}
                        className={classes.projectURL}
                        target="_blank"
                      >
                        {certification.link}
                      </a>
                    </PrintOnly>
                    <a
                      href={certification.link}
                      className={classes.projectLink}
                      target="_blank"
                    >
                      <Icon icon="new-tab" />
                    </a>
                  </>
                </ItemInfo>
              </ItemTitle>
              <ItemText>{certification.note}</ItemText>
            </Item>
          );
        })}
      </Section>

      <Section title="Projects">
        {profile.projects.map((project) => {
          return (
            <Item key={project.name}>
              <ItemTitle oneline>
                <ItemName>{project.name}</ItemName>
                <ItemInfo>
                  {project.link && (
                    <>
                      <PrintOnly>
                        <a
                          href={project.link}
                          className={classes.projectURL}
                          target="_blank"
                        >
                          {project.link}
                        </a>
                      </PrintOnly>
                      <a
                        href={project.link}
                        className={classes.projectLink}
                        target="_blank"
                      >
                        <Icon icon="new-tab" />
                      </a>
                    </>
                  )}
                </ItemInfo>
              </ItemTitle>
              <ItemText>{project.note}</ItemText>
            </Item>
          );
        })}
      </Section>

      <Section title="Languages">
        <div className={classes.languangesContainer}>
          {profile.languages.map((lang) => {
            return (
              <div className={classes.languageContainer} key={lang.name}>
                <Item>
                  <ItemTitle isColumn>
                    <ItemName>{lang.name}</ItemName>
                    <ItemInfo>{lang.proficiency}</ItemInfo>
                  </ItemTitle>
                </Item>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
};

export default Profile;
