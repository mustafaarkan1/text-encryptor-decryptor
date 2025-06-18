/**
 * Vigenère Cipher Implementation
 * 
 * This algorithm uses a keyword to determine the shift value for each letter in the plaintext.
 * It's a polyalphabetic substitution cipher that improves upon the Caesar cipher by using
 * multiple shift values determined by the keyword.
 * 
 * @author Mustafa Arkan
 * @copyright 2023-2024 Mustafa Arkan. All rights reserved.
 * @license MIT
 */

/**
 * Encrypts text using Vigenère cipher
 * @param {string} text - The text to encrypt
 * @param {string} key - The encryption key (a word)
 * @returns {string} - The encrypted text
 */
function vigenereEncrypt(text, key) {
    // Ensure key contains only letters
    key = key.replace(/[^a-zA-Z]/g, '');
    if (key.length === 0) {
        throw new Error('المفتاح يجب أن يحتوي على حروف إنجليزية على الأقل');
    }
    
    let result = '';
    let keyIndex = 0;
    
    // Process each character in the input text
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        
        // Only encrypt alphabetic characters
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            // Get the shift value from the current key character
            const keyChar = key[keyIndex % key.length].toUpperCase();
            const shift = keyChar.charCodeAt(0) - 65; // A=0, B=1, ..., Z=25
            
            // Apply the shift
            if (code >= 65 && code <= 90) { // Uppercase
                result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else { // Lowercase
                result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
            
            // Move to the next key character
            keyIndex++;
        } else {
            // Non-alphabetic characters remain unchanged
            result += char;
        }
    }
    
    return result;
}

/**
 * Decrypts text encrypted with Vigenère cipher
 * @param {string} text - The encrypted text
 * @param {string} key - The encryption key (a word)
 * @returns {string} - The decrypted text
 */
function vigenereDecrypt(text, key) {
    // Ensure key contains only letters
    key = key.replace(/[^a-zA-Z]/g, '');
    if (key.length === 0) {
        throw new Error('المفتاح يجب أن يحتوي على حروف إنجليزية على الأقل');
    }
    
    let result = '';
    let keyIndex = 0;
    
    // Process each character in the input text
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        
        // Only decrypt alphabetic characters
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            // Get the shift value from the current key character
            const keyChar = key[keyIndex % key.length].toUpperCase();
            const shift = keyChar.charCodeAt(0) - 65; // A=0, B=1, ..., Z=25
            
            // Apply the reverse shift
            if (code >= 65 && code <= 90) { // Uppercase
                result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
            } else { // Lowercase
                result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            }
            
            // Move to the next key character
            keyIndex++;
        } else {
            // Non-alphabetic characters remain unchanged
            result += char;
        }
    }
    
    return result;
}