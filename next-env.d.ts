/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "@/utils/iconSet" {
  declare let iconSet: object;
  export default iconSet;
}

declare module "react-icomoon" {
  declare let comp: React.FunctionComponent<IconProps>;
  export default comp;

  export interface IconProps {
    iconSet: object;
    icon: string;
    size?: number | string;
    color?: string;
    style?: object;
    className?: string;
    disableFill?: boolean;
    removeInlineStyle?: boolean;
  }
}

declare module "@/public/dunayeu_yahor_resume.yml" {
  declare let resume: Resume;
  export default resume;

  export interface Resume {
    name: string;
    email: string;
    website: string;
    location: string;
    dob: string;
    photo: string;
    about: string;
    intro: string;
    skills: Skill[];
    projects: Project[];
    experience: Experience[];
    languages: Language[];
  }

  interface Language {
    name: string;
    proficiency: string;
  }

  interface Experience {
    role: string;
    company?: string;
    from: string;
    note: string;
    highlights?: string[];
    to?: string;
  }

  interface Project {
    name: string;
    link: string;
    note: string;
  }

  interface Skill {
    name: string;
    note: string;
    level: number;
    tech?: string[];
  }
}
