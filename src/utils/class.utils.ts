type BolleanHash = { [key:string]: boolean }

function stringFromBoolHash (obj: BolleanHash) {
  return Object.values(obj).reduce((acc, cur) => {
    // @ts-ignore
    const [key, value] = cur;
    if (value) {
      acc += key
    }
    return acc;
  }, '')
}

export function cn (c: string, c2: string|BolleanHash, c3?: string|BolleanHash) {
  let c2Classes = '';
  if (typeof c2 == 'object') {
    c2Classes  = stringFromBoolHash(c2)
  } else {
    c2Classes = c2 || ''
  }

  let c3Classes = '';
  if (typeof c3 == 'object') {
    c3Classes  = stringFromBoolHash(c3)
  } else {
    c3Classes = c3 || ''
  }

  return c + ' ' + c2 + ' ' + c3
}

