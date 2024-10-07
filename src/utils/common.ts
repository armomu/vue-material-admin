import dayjs from 'dayjs';

export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(format);
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
    return formatDateTime(date, format);
}
