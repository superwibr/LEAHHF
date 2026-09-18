import { decodeBase256, encodeBase256 } from "./base256.js";

export class EmbeddedBlob {
    blob = new Uint8Array();

    /**
     * Manager for reading/writing a base256-encoded blob from the document
     * @param {HTMLScriptElement} scriptElement script of type `application/octet-stream` with its contents 
     *                                          as a base256-encoded blob
     */
    constructor(scriptElement){
        this.el = scriptElement;
    }

    static fromId(id){
        return new EmbeddedBlob(document.getElementById(id));
    }

    read() {
        this.blob = decodeBase256(this.el.textContent);
        return this;
    }

    write() {
        this.el.textContent = encodeBase256(this.blob);
    }
}