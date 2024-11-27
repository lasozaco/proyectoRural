import { environment } from './../../environments/environment';
import * as CryptoJS from "crypto-js"


export const encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data, environment.keyCrypt).toString();
}

export const decrypt = (valueEncrypt: string): string => {
    const valueDecrypt = CryptoJS.AES.decrypt(valueEncrypt, environment.keyCrypt).toString(CryptoJS.enc.Utf8);
    return valueDecrypt;
}