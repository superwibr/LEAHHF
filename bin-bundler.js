import { readFileSync, writeFileSync } from "fs";
import { encodeBase256 } from "./src/base256.js";

console.log("Embedding blobs...");

const templateFile = process.argv[2];
const outputFile = process.argv[3] || templateFile;

const htmlTemplate = readFileSync(templateFile, "utf-8");
const blobs = {
    "%v86.wasm%": "lobs/v86.wasm",
    "%bios%": "lobs/seabios.bin",
    "%vga_bios%": "lobs/vgabios.bin",
    "%system_image%": "lobs/buildroot-bzimage.bin"
};
const finalBundle = Object.entries(blobs).reduce(
    (html, [placeholder, file]) => 
        html.replace(placeholder, () => encodeBase256(readFileSync(file))),
    htmlTemplate
);

writeFileSync(outputFile, finalBundle, "utf-8");
console.log("Bundle generated successfully!");
