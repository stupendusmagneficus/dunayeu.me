import libMatter, { GrayMatterOption, GrayMatterFile } from "gray-matter";

const MATTER_OPTS: GrayMatterOption<string, {}> = {
  excerpt: true,
};

const matter = (raw: string) => libMatter(raw, MATTER_OPTS)

export default matter;
