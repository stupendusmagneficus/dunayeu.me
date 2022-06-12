var exec = require("child_process").exec;
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

(async () => {
  const args = process.argv.slice(2);
  const filePath = path.resolve(args[0]);

  const dev = false;
  const PORT = 3002;

  console.log("Preparing Next app");
  const app = next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();

  console.log("Creating web server");
  const url = `http://localhost:${PORT}`;

  createServer((req, res) => handle(req, res, parse(req.url, true))).listen(
    PORT,
    (err) => {
      if (err) {
        console.error("Error occured while serving:");
        console.error(err);
      }
      console.log(`Ready on ${url}`);

      delFile(filePath);
      runPuppeteer(`${url}/resume`, filePath);
    }
  );
})();

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

function delFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (e) {
    console.warn(`File ${filePath} doesn't exist.`);
  }
}

async function runPuppeteer(url, filePath) {
  console.log(`Rendering into ${filePath}`);
  const margin_h = "2cm";
  const margin_v = "2cm";
  const opts = {
    margin: {
      top: margin_v,
      bottom: margin_v,
      left: margin_h,
      right: margin_h,
    },
    path: filePath,
    format: "A4",
  };

  try {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });
    await sleep(3);
    await page.pdf(opts);
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("Error occured while rendering:");
    console.error(err);
    process.exit(1);
  }
}
