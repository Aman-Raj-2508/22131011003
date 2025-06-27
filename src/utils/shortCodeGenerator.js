
export function generateShortCode(existingCodes = new Set()) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = Array.from({ length: 5 }, () =>
            charset[Math.floor(Math.random() * charset.length)]
        ).join('');
    } while (existingCodes.has(code));
    return code;
}