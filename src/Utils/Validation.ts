export const isObjectEmpty = (object:any)=>{
    return !Object.keys(object).every(key=>object[key]!=='');
}