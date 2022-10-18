let str = "whistle"

let m = "whe".trim()
let s = m.split("").join(".*") 
console.log(s)

let reg = RegExp(s)
console.log(/w/.test(str))