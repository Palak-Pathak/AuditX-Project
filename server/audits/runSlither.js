const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const auditsDir = path.join(__dirname, "..", "audits");

async function runSlither(code) {
  const fileName = `${uuidv4()}.sol`;
  const filePath = path.join(auditsDir, fileName);

  fs.writeFileSync(filePath, code, "utf8");

  const command = `source ./venv/bin/activate && slither ${filePath}`;

  return new Promise((resolve, reject) => {
    exec(command, { shell: "/bin/bash" }, (error, stdout, stderr) => {
      fs.unlinkSync(filePath); // clean up temp file

      const output = `${stdout}\n${stderr}`.trim();

      if (output.length) {
        resolve(output);
      } else {
        reject("Slither failed without output");
      }
    });
  });
}

module.exports = { runSlither };
