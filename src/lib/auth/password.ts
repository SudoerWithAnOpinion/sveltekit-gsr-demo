import crypto from 'crypto';

/**
 * @remarks Generates a random salt for password hashing.
 * @returns random salt hex, converted to a string
 */
export function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

/**
 * @remarks Generates a hash of the password using the salt.
 * @param password - password to hash
 * @param salt - salt to use in the hash
 * @returns hash of the password
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        password = password.normalize('NFC');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}

/**
 * @remarks Checks if the password is correct.
 * @param password The password to check
 * @param salt The user's password salt
 * @returns true if the password matches the hash
 */
export function verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
    console.debug('verifyPassword', password, salt);
    return new Promise((resolve, reject) => {
        return hashPassword(password.normalize('NFC'), salt).then((checkHash) => {
            resolve(checkHash === hash);
        }).catch((err) => {
            reject(err);
        });
    });
}