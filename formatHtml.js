/* 格式化typora导出的html文件，适应iframe */
const fs = require("fs")

const FILENAME = "flex & grid Layout.html"
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
let reg1 = /[\s]*?max-width: 860px;/
let reg2 = /(?<=#write {[\s\S]*?margin: 0 auto;)[\s]*?padding: 30px;/
let reg3 = /body\.typora-export { padding-left: 30px; padding-right: 30px; }/
let reg4 = /(?<=p > img:only-child {[\s\S]*?)margin: auto;/
let reg5 = /padding-left: 20px;/
let reg6 = /(?<=overflow-x: visible;).*?padding-top: 40px;/
// reg5 添加跨域script
let reg7 = /(?<=<\/body>)[\s\S]*?(?=<\/html>)/

let oldHtml = fs.readFileSync(FILENAME).toString()
let newHtml = oldHtml.replace(reg1, "").replace(reg2, "").replace(reg3, "").replace(reg4, "").replace(reg5, "").replace(reg6, "").replace(reg7, ADDSCRIPT)

fs.writeFile("flex & grid Layout.html", newHtml, err => {
  if (!err) {console.log(`修改成功！- ${FILENAME}`)}
  else console.log(err)
})
