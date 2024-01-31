export const convertDate = (toDate:Date|string|undefined) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(toDate){
        const date = new Date(toDate).getDate();
        const month = new Date(toDate).getMonth();
        const year = new Date(toDate).getFullYear();
        return `${date} ${monthNames[month]} ${year}`
    }
    else{
        return "-"
    }
}
