export const DateCompareToday = (date1: string)=>{
    const today = new Date(Date.now());
    const day = new Date(date1);
    const dateSame = day.getDate()===today.getDate();
    const monthSame = day.getMonth()===today.getMonth();
    const yearSame = day.getFullYear()===today.getFullYear();
    return (dateSame && monthSame && yearSame)
}