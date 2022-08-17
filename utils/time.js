export function unixEpochTimeToMonthDay(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + " " + date;
    return time;
}
export function dateObjectToUnixEpoch(date) {
    return Math.floor(date.getTime() / 1000);
}
export function unixEpochToDateObject(unixEpoch) {
    return new Date(unixEpoch * 1000);
}
export function addHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}
export function unixEpochTimeToClock(timestamp) {
    var a = new Date(timestamp * 1000);
    var hours = a.getHours();
    hours = (hours > 12) ? hours % 12 : hours;
    hours = (hours == 0) ? 12 : hours;
    var mins = a.getMinutes();
    if (mins < 10) {
        mins = '0' + mins;
    }
    return hours + ":" + mins;
}
export function findTimeCategory(timestamp) {
    // convert from seconds to miliseconds (js Date library uses ms)
    timestamp *= 1000;
    var currentTime = Date.now();
    // Ongoing event
    if (timestamp === 0) {
        return -1;
    }
    var a = new Date(timestamp);
    var b = new Date(currentTime);
    // It is the current day
    if (
        a.getDate() == b.getDate() &&
        a.getMonth() == b.getMonth() &&
        a.getFullYear == b.getFullYear
    ) {
        return 0;
    }
    // Day off in the future
    return 1;
}