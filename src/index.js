import { EmbeddedBlob } from "./EmbeddedBlob.js";
import "./libv86.min.js";

const blobCache = {};

const blob = id => blobCache[id] || (blobCache[id] = EmbeddedBlob.fromId(id).read());

const emulator = new V86({
    wasm_fn: async (param) => {
        // Instantiate the WebAssembly module directly from the buffer
        const result = await WebAssembly.instantiate(blob("v86wasm").blob, param);
        return result.instance.exports;
    },
    memory_size: 256 * 1024 * 1024,
    vga_memory_size: 8 * 1024 * 1024,
    screen_container: document.getElementById("screen_container"),

    bios: { buffer: blob("bios").blob.buffer },
    vga_bios: { buffer: blob("vga_bios").blob.buffer },

    bzimage: { buffer: blob("system_image").blob.buffer },

    filesystem: {},
    cmdline: "tsc=reliable mitigations=off random.trust_cpu=on",

    autostart: true,
});

window.emu = emulator;