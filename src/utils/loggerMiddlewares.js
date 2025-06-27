export function logAction(action, payload) {
    const timestamp = new Date().toISOString();
    const log = { timestamp, action, payload };
    window.customLogs = window.customLogs || [];
    window.customLogs.push(log);
}