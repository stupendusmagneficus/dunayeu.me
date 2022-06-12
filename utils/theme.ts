
const theme = {
  size: {
    sm: 4,
    md: 8,
    lg: 18,
    width: 760,
    font: 16,
  },
  color: {
    background: "#FFFFFF",
    border: "#eeeeee",
    brand: "#223f67",
    body: "#000000",
    off: "#777777",
  },
  font: {
    title: "Poppins, sans-serif",
    body: "PT Serif, serif",
  },
  responsive: {
    mobile: '@media only screen and (max-width: 768px)'
  }
};

export const getHeaderStyles = () => ({
  "& h1": {
    fontSize: `${theme.size.font * 1.5}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
  "& h2": {
    fontSize: `${theme.size.font * 1.4}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
  "& h3": {
    fontSize: `${theme.size.font * 1.3}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
  "& h4": {
    fontSize: `${theme.size.font * 1.2}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
  "& h5": {
    fontSize: `${theme.size.font * 1.1}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
  "& h6": {
    fontSize: `${theme.size.font * 1}px`,
    fontFamily: theme.font.title,
    fontWeight: 600,
  },
})

export default theme