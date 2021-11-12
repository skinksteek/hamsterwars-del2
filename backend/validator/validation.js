function isHamsterObject(maybe) {
  if ((typeof maybe !== 'object')) {
    return false
  }
  // hamster objektet måste ha dessa egenskaper
  let keys = Object.keys(maybe)
  if (!keys.includes('name') ||
    !keys.includes('favFood') ||
    !keys.includes('loves') ||
    !keys.includes('imgName') ||
    !keys.includes('wins') ||
    !keys.includes('defeats') ||
    !keys.includes('games') ) {
    return false
  }
    return true
}

function isHamsterCute(maybe) {
  if ((typeof maybe !== 'object')) {
    return false
  }
  // hamster objektet måste ha dessa egenskaper
  let keys = Object.keys(maybe)
  if (!keys.includes('wins') || !keys.includes('games') ) {
    return false
  }
    return true
}

function isMatches(matches) {
  if ((typeof matches !== 'object')) {
    return false
  }
  // hamster objektet måste ha dessa egenskaper
  let keys = Object.keys(matches)
  if (!keys.includes('winnerId') || !keys.includes('loserId') ) {
    return false
  }
    return true
}
   


module.exports = {  isHamsterObject, isHamsterCute, isMatches }
