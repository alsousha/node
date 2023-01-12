const crypto = require("crypto");
const startTime = Date.now();

//encrypt key by 10000 iteration
crypto.pbkdf2("kuku1234", "5", 1000000, 64, "sha512", () => {
  console.log("1 end", Date.now() - startTime);
});
crypto.pbkdf2("kuku1234", "5", 1000000, 64, "sha512", () => {
  console.log("2 end", Date.now() - startTime);
});
crypto.pbkdf2("kuku1234", "5", 1000000, 64, "sha512", () => {
  console.log("3 end", Date.now() - startTime);
});
crypto.pbkdf2("kuku1234", "5", 1000000, 64, "sha512", () => {
  console.log("4 end", Date.now() - startTime);
});
crypto.pbkdf2("kuku1234", "5", 1000000, 64, "sha512", () => {
  console.log("5 end", Date.now() - startTime);
});
