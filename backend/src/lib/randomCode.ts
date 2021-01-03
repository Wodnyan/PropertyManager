export default function randomCode(
  length: number,
  charSet?: string | string[]
) {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * charSet.length);
    randomStr += charSet[randomNum];
  }
  return randomStr;
}
