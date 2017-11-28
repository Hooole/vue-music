function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length - 1; i++) {
    let j = getRandomInt(0, i)
    let k = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = k
  }
  return _arr
}
