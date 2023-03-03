import * as dotenv from "dotenv";
dotenv.config();
let key1 = process.env.APIKEY1 || null;
let key2 = process.env.APIKEY2 || null;
let key3 = process.env.APIKEY3 || null;
function key(): string {
  let keys = [];
  if (key1) keys.push(key1);
  if (key2) keys.push(key2);
  if (key3) keys.push(key3);
  let key = keys[Math.floor(Math.random() * keys.length)];

  return key;
}
export { key };
