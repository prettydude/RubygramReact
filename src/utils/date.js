export const TIME_FORMAT = {
    hour: '2-digit',
    minute: '2-digit',
    //hour12: false //support USA
}

export const DATE_FORMAT = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
}

// returns hh:mm:ss for last 24 hours and dd/mm/yy for later dates
// time in seconds
export function formatDate(date) {
    const now = Date.now()/1000;
    const time = date.getTime()/1000;
    let format = TIME_FORMAT;
    if(Math.abs(now-time)>60*60*24) format = DATE_FORMAT;
    return new Date(time*1000).toLocaleString(window.navigator.language, format);
}

// returns hh:mm:ss
// time in seconds
export function formatTime(date) {
    if (!date) return "00:00";
    const time = Math.floor(date.getTime()/1000);
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor(time / 60) % 60
    let seconds = time % 60

    let formatted = [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    if (formatted.startsWith("0")) formatted = formatted.substr(1);
    return formatted;
}