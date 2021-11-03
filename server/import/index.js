const article = require("../controllers/articleCotroller");
const xlsx = require("xlsx");
const filePath = process.argv.slice(2)[0];
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
require("../database");

//console.log("worksheet", worksheet);

const posts = [];
let post = {};

for (let cell in worksheet) {
  const cellAsString = cell.toString();

  if (cellAsString[1] !== "r" && cellAsString !== "m" && cellAsString[1] > 1) {
    if (cellAsString[0] === "F") {
      //console.log("cell", parseInt(worksheet[cell].v));
      post.stock = parseInt(worksheet[cell].v);
    }
    if (cellAsString[0] === "G") {
      //console.log("cell", parseInt(worksheet[cell].v));
      post.descripcion = worksheet[cell].v;
    }
    if (cellAsString[0] === "H") {
      let pr = parseFloat(worksheet[cell].v);
      post.prDolar = pr.toFixed(2);
      post.ingreso = 0;

      posts.push(post);
      post = {};
    }
  }
}

console.log("post", posts);

article.saveFile(posts);
