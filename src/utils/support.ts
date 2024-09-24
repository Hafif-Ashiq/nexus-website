export const getStatusColor = (status: string) => {
    switch (status) {
        case "Resolved":
            return "#2B9F03"
        case "Closed":
            return "#B50202"
    }
    return "#F29339"
}