// src/utils/formatDateTime.ts
export function formatDateTime(dateString: string | null | undefined) {
    if (!dateString) return { date: "", time: "" };

    const dateObj = new Date(dateString);

    return {
        date: dateObj.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}
