
let monlist = ["A", "B","C","D","E"]
const abclist = ["AOW","API","BOW","BEL","BNM","CPO","EPI","ERO"]

let abd = abclist.reduce((prev, cur)=>{
    const i = cur.slice(0,1);
    prev[i] == "" ? prev[i] = cur : prev[i] = prev[i]+',' + cur
    return prev;
},{})

console.log(abd)
