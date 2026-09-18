// 1. Create a safe 256-character alphabet.
// This skips control characters (0-31), quotes, ampersand, and angle brackets.
const createSafeAlphabet = () => {
    const safeChars = [];
    const unsafe = new Set([
        0, 34, 38, 39, 60, 62, 92 // Null, ", &, ', <, >, \
    ]);

    // Fill with standard printable ASCII where possible
    for (let i = 32; i < 127; i++) {
        if (!unsafe.has(i)) safeChars.push(String.fromCharCode(i));
    }

    // Fill the rest of the 256 slots with safe extended Latin/Unicode characters
    let current = 160;
    while (safeChars.length < 256) {
        safeChars.push(String.fromCharCode(current++));
    }
    return safeChars;
};

const ALPHABET = createSafeAlphabet();
const CHAR_TO_BYTE = new Map(ALPHABET.map((char, index) => [char, index]));

/**
 * Encodes a Uint8Array (binary) into a safe Base256 string.
 */
export function encodeBase256(uint8Array) {
    let result = "";
    for (let i = 0; i < uint8Array.length; i++) {
        result += ALPHABET[uint8Array[i]];
    }
    return result;
}

/**
 * Decodes a safe Base256 string back into a Uint8Array.
 */
export function decodeBase256(str) {
    const uint8Array = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        const byte = CHAR_TO_BYTE.get(str[i]);
        if (byte === undefined) {
            throw new Error(`Invalid or unsafe character detected at index ${i}`);
        }
        uint8Array[i] = byte;
    }
    return uint8Array;
}
