# LEAHHF
# Linux Ext Absolutely Horrible HTML Floppy

In-browser linux emulator packed into a single html file.

Powered by the [v86 emulator](https://github.com/copy/v86) and some hackery using a [custom extended latin encoding](./src/base256.js) and [octet-stream-typed script elements](./src/EmbeddedBlob.js) to [pack](./bin-bundler.js) all the blobs into the document.

Next steps are replacing buildroot with a stripped-down alpine, making a better terminal emulator, and adding controls for the system and file upload/download through the vm