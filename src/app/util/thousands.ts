/**
 * https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 * @param x
 * @returns
 */
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function thousands(n: number | string) {
  return numberWithCommas(typeof n == 'string' ? Number(n) : n);
}
export { thousands };