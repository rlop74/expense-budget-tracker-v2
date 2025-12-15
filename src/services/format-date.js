import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export const formatDate = (date) => {
    const d = new Date(date);

    if (isToday(d)) {
        return formatDistanceToNow(d, { addSuffix: true }); // "5 minutes ago"
    }
    if (isYesterday(d)) return "Yesterday";
    if (d.getFullYear() === new Date().getFullYear()) {
        return format(d, "MMM d"); // "Nov 29"
    }
    return format(d, "MMM d, yyyy"); // "Nov 29 Nov, 2024
};
