import * as r from "ramda";

/**
 * This function returns the excerpt from a Gray Matter document
 * Excerpt is the first text block and is separated by `---` from the main post body
 */
const removeExcerpt = (text: string) =>
  r.pipe(
    r.replace("---\r\n", "---\n"),
    r.split("---\n"), 
    r.last,
  )(text) as string;

export default removeExcerpt;
