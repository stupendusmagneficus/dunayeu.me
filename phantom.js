const page = require("webpage").create();
const system = require("system");

const margin_h = "2cm";
const margin_v = "2cm";

page.paperSize = {
  format: "A4",
  orientation: "portrait",
  margin: {
    top: margin_v,
    bottom: margin_v,
    left: margin_h,
    right: margin_h,
  },
};

// This will fix some things that I'll talk about in a second
page.settings.dpi = "96";

const url = system.args[1] + "/resume";
console.log("Opening: ", url);
page.open(url);

window.setTimeout(function () {
  const output = system.args[2];
  console.log("Writitng: ", output);

  page.render(output, { format: "pdf" });
  phantom.exit(0);
}, 2000);
