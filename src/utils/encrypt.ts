import JSEncrypt from 'jsencrypt';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmAUZSCuoJR2d4qyKN/Ugqndl0
K1DNnWVb9fQE74U8sNh3J9bHuLOOa8LIaWWxvZO8rkofk/tlP3BB3ehRa+QI7RKm
RyE4EZ85CiS+40H5ESF+WBInpQ125Jmzk9nBv3dqTM+4img0pWqtLezlN9C3nx5I
XvlkcKVNlr7LUMdfHQIDAQAB
-----END PUBLIC KEY-----`;

export const encrypt = (value: string) => {
  const jsEncrypt = new JSEncrypt({});
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(value);
};
