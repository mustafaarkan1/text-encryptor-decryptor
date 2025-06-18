# 🔐 Text Encryptor / Decryptor

A lightweight and beginner-friendly web application that allows users to **encrypt** and **decrypt** text using several well-known algorithms. Ideal for learning about classical and modern encryption techniques.

---

## 🧠 Supported Algorithms

- **Caesar Cipher** – Shifts each letter by a fixed number of positions.
- **Vigenère Cipher** – Encrypts letters using a repeating keyword.
- **AES Encryption** – Modern and secure encryption using the [CryptoJS](https://github.com/brix/crypto-js) library.

---

## 🚀 Features

- Clean, intuitive user interface
- Toggle between encryption and decryption modes
- Copy encrypted/decrypted output with one click
- Supports multiple encryption schemes
- Fully open-source and educational

---

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)
- [CryptoJS](https://github.com/brix/crypto-js) – for AES encryption support

---

## 🧪 How to Use

1. Enter the **original text** into the input field.
2. Select the desired **encryption algorithm** from the dropdown menu.
3. Provide the **appropriate key**:
   - 🔸 *Caesar Cipher*: A number (e.g., `3`)
   - 🔸 *Vigenère Cipher*: A keyword (e.g., `"SECRET"`)
   - 🔸 *AES*: Any secret passphrase (e.g., `"MyStrongKey123"`)
4. Click on **"Encrypt"** or **"Decrypt"**.
5. The result will appear in the **output box**.
6. Click the **"Copy Result"** button to copy the output to your clipboard.

---

## 📦 Getting Started

No installation or server required.

Just clone the repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/mustafaarkan1/text-encryptor-decryptor.git
cd text-encryptor-decryptor
