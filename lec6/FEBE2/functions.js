const fs = require("fs");
const http = require("http");
const url = require("url");

function createServer(text_data_arr) {
  const home = fs.readFileSync(`${__dirname}/templates/index.html`);
  const server = http.createServer((req, res) => {
    let pathName = req.url;
    const path = url.parse(pathName, true);
    pathName = path.pathname;
    const query = path.query;
    const method = req.method;

    if (pathName === "/") {
      res.setHeader("Content-Type", "text/html");
      // write html file to the client and complete the request (return)
      return res.end(home);
    }

    if (pathName === "/search") {
      if (method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
          body.push(chunk);
        });
        req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString(); //
          //console.log(parsedBody); //str_to_search=qwer

          //get str
          const str_to_search = parsedBody.split("=")[1].replaceAll("+", " ");
          console.log(
            `String "${str_to_search}" exists in file: ${searchStrInArr(
              str_to_search,
              text_data_arr
            )}`
          );
        });
      }
      // redirection to home page
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.writeHead(302, { Location: "/" });
      return res.end();
    }
    // invalid url
    res.writeHead(404, {
      "Content-TYpe": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  });

  server.listen(3000);
}
function searchStrInArr(str, arr) {
  let isEquals = arr.find((item) => item.localeCompare(str) == 0); //return item if exists or undefined
  return isEquals !== undefined;
}

module.exports = { createServer, searchStrInArr };
