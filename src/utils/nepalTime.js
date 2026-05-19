const NEPAL_TZ = 'Asia/Kathmandu';

/** YYYY-MM-DD for the given instant in Nepal time */
export function toNepalDateString(date = new Date()) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: NEPAL_TZ }).format(date);
}

/** Parse API/DB timestamps that are stored as UTC but may lack a "Z" suffix */
export function parseUtcDate(value) {
    if (value == null || value === '') return null;
    if (value instanceof Date) return value;
    const s = String(value).trim();
    if (/[Zz]$/.test(s) || /[+-]\d{2}:\d{2}$/.test(s)) return new Date(s);
    const normalized = s.includes('T') ? s : `${s}T00:00:00`;
    return new Date(`${normalized}Z`);
}

/** datetime-local value is Nepal wall time; convert to UTC ISO for the API */
export function nepalDatetimeLocalToUtcIso(localValue) {
    if (!localValue) return null;
    return new Date(`${localValue}+05:45`).toISOString();
}

/** Value for <input type="datetime-local"> in Nepal time */
export function toNepalDatetimeLocalValue(date = new Date()) {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', {
            timeZone: NEPAL_TZ,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        })
            .formatToParts(date)
            .filter((p) => p.type !== 'literal')
            .map((p) => [p.type, p.value])
    );
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export function formatNepalDateTime(dateString) {
    const date = parseUtcDate(dateString);
    if (!date || Number.isNaN(date.getTime())) return '-';
    return (
        date.toLocaleString('en-US', {
            timeZone: NEPAL_TZ,
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }) + ' NPT'
    );
}
