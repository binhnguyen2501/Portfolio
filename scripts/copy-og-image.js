const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "src", "assets", "images", "me.png");
const destination = path.join(__dirname, "..", "public", "me.png");

fs.copyFileSync(source, destination);
console.log("Copied OG share image to public/me.png");
