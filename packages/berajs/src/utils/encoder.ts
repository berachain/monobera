import { enc } from "crypto-js";
import AES from "crypto-js/aes";

export const encrypt = (message: string, key: string) => {
  const cipherText = AES.encrypt(message, key);
  return cipherText.toString();
};

export const decrypt = (cipher: string, key: string): `0x${string}` => {
  let bytes;

  try {
    bytes = AES.decrypt(cipher, key);
    const decrypted = bytes.toString(enc.Utf8);
    return ("0x" + decrypted) as `0x${string}`;
  } catch (err) {
    console.log("UNABLE TO DECIPHER", err);
    return "0x";
  }
};
