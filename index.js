const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");
require("dotenv").config();

//TODO
//BUG
//FIXME
//HACK

const { replaceTemplate } = require("./modules/replaceTemplate");

const data = fs.readFileSync("./data.json", { encoding: "utf-8" });
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);

const slugs = dataObj.map((el) =>
  slugify(el.productName, {
    replacement: "*",
    remove: undefined,
    lower: true,
  })
);

//server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query, pathname);
  // overview page

  if (pathname === "/overview" || pathname == "/") {
    const cardHTML = dataObj.map((el) => {
      return replaceTemplate(tempCard, el);
    });

    res.writeHead(200, {
      "content-type": "html",
    });
    res.end(tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHTML.join("")));
    // api
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    // console.log(data);
    res.end(data);
    //product
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.writeHead(200, {
      "content-type": "html",
    });
    res.end(output);
    // not found
  } else {
    res.writeHead(400, {
      "content-type": "text/html",
      "my-own-header": "hello world",
    });

    res.end("<h2>Page not found</h2> ");
  }
});

//listen from post
const port = 2000;
server.listen(port, "127.0.0.1", () => {
  console.log("Listen from port:", port);
});
