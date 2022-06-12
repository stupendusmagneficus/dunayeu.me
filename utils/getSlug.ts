const getSlug = (filename: string) => filename
  .replace(/^.*[\\\/]/, "")
  .split(".")
  .slice(0, -1)
  .join(".")

export default getSlug