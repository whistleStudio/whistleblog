/* 格式化typora导出的html文件，适应iframe */
const fs = require("fs")

const FILENAME = "IoT教程 01 - esp32点亮一盏灯(micopython, vscode).html"
const ADDSCRIPT = `
<script>
window.addEventListener("message", e => {
    let h = document.body.scrollHeight
    window.parent.postMessage(h, e.origin)
})
</script>`

/* ------------test-------------- */
// console.log(reg.exec(str)[0])
// str = str.replace(reg, "")
/* ------------------------------ */

// reg1 2 3 4删除匹配内容
let reg1 = /(?<=#write {)[\s\S]*?max-width: 860px;/
let reg2 = /(?<=#write {[\s\S]*?margin: 0 auto;)[\s\S]*?padding: 30px;/
let reg3 = /body\.typora-export { padding-left: 30px; padding-right: 30px; }/
let reg4 = /(?<=p > img:only-child {[\s\S]*?)margin: auto;/
// reg5 添加跨域script
let reg5 = /(?<=<\/body>)[\s\S]*?(?=<\/html>)/

let oldHtml = fs.readFileSync(FILENAME).toString()
let newHtml = oldHtml.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "").replace(reg5, ADDSCRIPT)

fs.writeFile("./IoT教程 01 - esp32点亮一盏灯(micopython, vscode).html", newHtml, err => {
  if (!err) {console.log(`修改成功！- ${FILENAME}`)}
  else console.log(err)
})
