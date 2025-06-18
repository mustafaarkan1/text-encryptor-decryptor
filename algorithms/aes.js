/**
 * AES Encryption Implementation
 * 
 * This implementation uses the CryptoJS library to perform AES encryption and decryption.
 * AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for
 * secure data transmission.
 * 
 * @author Mustafa Arkan
 * @copyright 2023-2024 Mustafa Arkan. All rights reserved.
 * @license MIT
 */

/**
 * Encrypts text using AES encryption
 * @param {string} text - The text to encrypt
 * @param {string} key - The encryption key
 * @returns {string} - The encrypted text (as a Base64 string)
 */
function aesEncrypt(text, key) {
    try {
        // Encrypt the text using AES
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        return encrypted;
    } catch (error) {
        console.error('AES Encryption Error:', error);
        throw new Error('فشل في تشفير النص باستخدام AES');
    }
}

/**
 * Decrypts text encrypted with AES
 * @param {string} encryptedText - The encrypted text (as a Base64 string)
 * @param {string} key - The encryption key
 * @returns {string} - The decrypted text
 */
function aesDecrypt(encryptedText, key) {
    try {
        // Decrypt the text using AES
        const bytes = CryptoJS.AES.decrypt(encryptedText, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        
        // Check if decryption was successful
        if (!decrypted) {
            throw new Error('فشل في فك التشفير. تأكد من صحة المفتاح.');
        }
        
        return decrypted;
    } catch (error) {
        console.error('AES Decryption Error:', error);
        throw new Error('فشل في فك تشفير النص. تأكد من صحة المفتاح والنص المشفر.');
    }
}