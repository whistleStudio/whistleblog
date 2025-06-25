import mongoose from "mongoose";
import Info, { IInfoSchema } from "../db/models/Info";
const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const oneDoc: IInfoSchema = {
  k1: "aguato",
  k2: "check_update",
  v1: "simple text",
  v2: {
    version: "1.0.1",
    releaseDate: formatDate(new Date()),
    changelog: `<span style="color: orange; font-size: 14px;">你好</span><p>1111</p>`,
    info: `<span style="color: skyblue;">测试</span>`
  }
}
  await Info.create(oneDoc)
  console.log(`Info doc with key ${oneDoc.k1}, ${oneDoc.k2} created!`)
}
