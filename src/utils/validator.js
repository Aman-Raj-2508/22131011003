
export function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function isValidShortCode(code) {
    return /^[a-zA-Z0-9]{1,10}$/.test(code);
}

export function isValidMinutes(min) {
    return Number.isInteger(min) && min > 0;
}