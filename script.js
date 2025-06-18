

/**
 * Main Script for Text Encryptor/Decryptor
 * 
 * This script handles the user interface and interactions for the text encryption/decryption application.
 * It provides functionality for encrypting and decrypting text using various algorithms.
 * 
 * @author Mustafa Arkan
 * @copyright 2023-2024 Mustafa Arkan. All rights reserved.
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const algorithmSelect = document.getElementById('algorithm');
    const keyInput = document.getElementById('key');
    const keyHint = document.getElementById('key-hint');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const copyNotification = document.getElementById('copy-notification');

    // Check if encryption functions are loaded
    if (typeof caesarEncrypt !== 'function' || 
        typeof vigenereEncrypt !== 'function' || 
        typeof aesEncrypt !== 'function') {
        
        console.warn('تحذير: لم يتم تحميل ملفات الخوارزميات بشكل صحيح. سيتم استخدام التعريفات الاحتياطية.');
        
        // Backup implementations if external files fail to load
        // Caesar Cipher
        window.caesarEncrypt = function(text, shift) {
            shift = ((shift % 26) + 26) % 26;
            return text.split('').map(char => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
                }
                return char;
            }).join('');
        };
        
        window.caesarDecrypt = function(text, shift) {
            return window.caesarEncrypt(text, 26 - (shift % 26));
        };
        
        // Vigenère Cipher
        window.vigenereEncrypt = function(text, key) {
            key = key.replace(/[^a-zA-Z]/g, '');
            if (key.length === 0) {
                throw new Error('المفتاح يجب أن يحتوي على حروف إنجليزية على الأقل');
            }
            
            let result = '';
            let keyIndex = 0;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const code = char.charCodeAt(0);
                
                if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                    const keyChar = key[keyIndex % key.length].toUpperCase();
                    const shift = keyChar.charCodeAt(0) - 65;
                    
                    if (code >= 65 && code <= 90) {
                        result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
                    } else {
                        result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
                    }
                    
                    keyIndex++;
                } else {
                    result += char;
                }
            }
            
            return result;
        };
        
        window.vigenereDecrypt = function(text, key) {
            key = key.replace(/[^a-zA-Z]/g, '');
            if (key.length === 0) {
                throw new Error('المفتاح يجب أن يحتوي على حروف إنجليزية على الأقل');
            }
            
            let result = '';
            let keyIndex = 0;
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const code = char.charCodeAt(0);
                
                if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                    const keyChar = key[keyIndex % key.length].toUpperCase();
                    const shift = keyChar.charCodeAt(0) - 65;
                    
                    if (code >= 65 && code <= 90) {
                        result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
                    } else {
                        result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
                    }
                    
                    keyIndex++;
                } else {
                    result += char;
                }
            }
            
            return result;
        };
        
        // AES Encryption (requires CryptoJS)
        if (typeof CryptoJS !== 'undefined') {
            window.aesEncrypt = function(text, key) {
                try {
                    return CryptoJS.AES.encrypt(text, key).toString();
                } catch (error) {
                    console.error('AES Encryption Error:', error);
                    throw new Error('فشل في تشفير النص باستخدام AES');
                }
            };
            
            window.aesDecrypt = function(encryptedText, key) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
                    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                    
                    if (!decrypted) {
                        throw new Error('فشل في فك التشفير. تأكد من صحة المفتاح.');
                    }
                    
                    return decrypted;
                } catch (error) {
                    console.error('AES Decryption Error:', error);
                    throw new Error('فشل في فك تشفير النص. تأكد من صحة المفتاح والنص المشفر.');
                }
            };
        } else {
            console.error('تحذير: مكتبة CryptoJS غير متوفرة. لن تعمل خوارزمية AES.');
        }
    }

    // Update key hint based on selected algorithm
    algorithmSelect.addEventListener('change', updateKeyHint);

    // Set initial key hint
    updateKeyHint();

    // Button event listeners
    encryptBtn.addEventListener('click', () => processText('encrypt'));
    decryptBtn.addEventListener('click', () => processText('decrypt'));
    clearBtn.addEventListener('click', clearAll);
    copyBtn.addEventListener('click', copyResult);

    // Function to update key hint based on selected algorithm
    function updateKeyHint() {
        const algorithm = algorithmSelect.value;
        switch (algorithm) {
            case 'caesar':
                keyHint.textContent = 'للخوارزمية Caesar، أدخل رقمًا (مثل 3).';
                break;
            case 'vigenere':
                keyHint.textContent = 'للخوارزمية Vigenère، أدخل كلمة (حروف فقط).';
                break;
            case 'aes':
                keyHint.textContent = 'للخوارزمية AES، أدخل أي نص كمفتاح سري.';
                break;
        }
    }

    // Function to process text (encrypt or decrypt)
    function processText(action) {
        const text = inputText.value.trim();
        const algorithm = algorithmSelect.value;
        const key = keyInput.value.trim();

        // Validate input
        if (!text) {
            alert('الرجاء إدخال النص!');
            return;
        }

        if (!key) {
            alert('الرجاء إدخال مفتاح التشفير!');
            return;
        }

        // Validate key based on algorithm
        if (algorithm === 'caesar' && !/^\d+$/.test(key)) {
            alert('لخوارزمية Caesar، يجب أن يكون المفتاح رقمًا!');
            return;
        }

        let result;

        try {
            // Process based on selected algorithm
            switch (algorithm) {
                case 'caesar':
                    result = action === 'encrypt' 
                        ? caesarEncrypt(text, parseInt(key)) 
                        : caesarDecrypt(text, parseInt(key));
                    break;
                case 'vigenere':
                    result = action === 'encrypt' 
                        ? vigenereEncrypt(text, key) 
                        : vigenereDecrypt(text, key);
                    break;
                case 'aes':
                    result = action === 'encrypt' 
                        ? aesEncrypt(text, key) 
                        : aesDecrypt(text, key);
                    break;
            }

            // Display result
            outputText.value = result;
        } catch (error) {
            alert(`حدث خطأ: ${error.message}`);
            console.error(error);
        }
    }

    // Function to clear all inputs and outputs
    function clearAll() {
        inputText.value = '';
        outputText.value = '';
        keyInput.value = '';
    }

    // Function to copy result to clipboard
    function copyResult() {
        if (!outputText.value) {
            alert('لا توجد نتيجة للنسخ!');
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(outputText.value)
            .then(() => {
                // Show notification
                copyNotification.classList.remove('hidden');
                setTimeout(() => {
                    copyNotification.classList.add('hidden');
                }, 2000);
            })
            .catch(err => {
                alert('فشل نسخ النص: ' + err);
            });
    }
});