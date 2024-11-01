export function getCurrentTimeFormatted(): string {
    const now = new Date();

    // Extract the components of the date and time
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0').padEnd(6, '0'); // Convert to 6 digits

    // Combine into the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}



export function getDateFormatted(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
