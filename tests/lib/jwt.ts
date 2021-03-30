// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

export const generateJwt = async(secret: string, claims: {[key: string]: string|number|boolean}): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(claims, secret, function(err: any, token: string) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};