
/**
 * @returns {number}
 */
function random() {
  const rand: any = (Math.random() + "").split(".");
  return (rand[rand.length - 1]) - 1 + 1;
}
/**
 * @param {number} MAX
 * @returns {number} randomNumber
 */
function randomNumber(MAX: number) {
  const rand = random();
  if (MAX) {
    return rand % MAX;
  }
  return rand;
}
/**
 * @param {number} size Range of randomBytes (unsigned)
 * @returns {number} randomBytes (unsigned)
 */
function randomUnsignedBytes(size: number) {
  return randomNumber(size * (2 ** 3));
}
/**
 * @returns {string} randomBackground
 */
function randomBackground() {
  return `rgba(${randomUnsignedBytes(32)},${randomUnsignedBytes(32)},${randomUnsignedBytes(32)},160) none repeat scroll 0% 0%`;
}

/**
 * @param {string} _percent
 * @returns {string} _percent
 */
function _prcnt(_percent: string) {
  if (typeof _percent == 'undefined') {
    return "";
  }
  _percent = _percent.replaceAll(/[^0-9|.|%]/g, "");
  if (_percent.includes("%")) {
    if (_percent.indexOf("%") == _percent.lastIndexOf("%")) {
      return _percent;
    }
    while (_percent.indexOf("%") != _percent.lastIndexOf("%")) {
      _percent = _percent.replace("%", "");
    }
    return _percent;
  }
  return _percent + "%";
}

function randomGradientBackground(deg: string, colorLen: number, ...colorPlcs: (string)[]) {
  let colors = "";
  for (let i = 0; i < colorLen; i++) {
    colors += (`${randomBackground().split(" ")[0]} ${_prcnt(colorPlcs[i])},`);
  }
  colors = colors.substring(0, colors.length - 2);
  return `linear-gradient(${deg},${colors}) no-repeat fixed`;
}

export { randomBackground, randomGradientBackground, randomNumber };