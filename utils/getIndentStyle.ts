interface ThemeItem {
    [k: string]: ThemeItem
}

const getIndentStyle = () => ({
    float: "left",
    fontSize: "48px",
    lineHeight: "30px",
    padding: ({ theme }: ThemeItem) => `${theme.size.md}px ${theme.size.sm}px 0 0px`,
    verticalAlign: "baseline",
  })

  export default getIndentStyle