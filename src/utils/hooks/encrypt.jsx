import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const secretKey = "1234567890";

const useCrypto = () => {
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);

  const encrypt = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    setEncryptedData(encrypted);
    localStorage.setItem("auth", encrypted);
  };

  const decrypt = () => {
    const storedEncryptedData = localStorage.getItem("auth");
    if (storedEncryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(storedEncryptedData, secretKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setDecryptedData(decrypted);
      } catch (e) {
        console.error("Error decrypting data", e);
        setDecryptedData(null);
      }
    } else {
      setDecryptedData(null);
    }
  };

  useEffect(() => {
    decrypt();
  }, []);

  return { encrypt, encryptedData, decryptedData };
};

export default useCrypto;
