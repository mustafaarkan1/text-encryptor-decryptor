/**
 * Caesar Cipher Implementation
 * 
 * This algorithm shifts each letter in the plaintext by a fixed number of positions in the alphabet.
 * For example, with a shift of 1, A would be replaced by B, B would become C, and so on.
 * 
 * @author Mustafa Arkan
 * @copyright 2023-2024 Mustafa Arkan. All rights reserved.
 * @license MIT
 */

/**
 * Encrypts text using Caesar cipher
 * @param {string} text - The text to encrypt
 * @param {number} shift - The shift value (key)
 * @returns {string} - The encrypted text
 */
function caesarEncrypt(text, shift) {
    // Ensure shift is within 0-25 range
    shift = ((shift % 26) + 26) % 26;
    
    return text.split('').map(char => {
        // Get the character code
        const code = char.charCodeAt(0);
        
        // Handle uppercase letters (ASCII 65-90)
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        // Handle lowercase letters (ASCII 97-122)
        else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        // Leave non-alphabetic characters unchanged
        return char;
    }).join('');
}

/**
 * Decrypts text encrypted with Caesar cipher
 * @param {string} text - The encrypted text
 * @param {number} shift - The shift value (key)
 * @returns {string} - The decrypted text
 */
function caesarDecrypt(text, shift) {
    // To decrypt, we shift in the opposite direction
    // This is equivalent to encrypting with (26 - shift)
    return caesarEncrypt(text, 26 - (shift % 26));
}