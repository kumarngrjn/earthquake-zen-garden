/**
 * capitalize - capitalizes the first letter in the string
 * @param {string} s 
 * @returns capitalized string
 */
export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * compareStringsAsc - sorts string in ascending order 
 * @param {*} a 
 * @param {*} b 
 * @returns sorted strings
 */
export const compareStringsAsc = (a,b) => {
  // convert to uppper case so that both strings are in same case
  const uppercaseA = a.value.toUpperCase();
  const uppercaseB = b.value.toUpperCase();
  if (uppercaseA > uppercaseB) {
    return 1;
  }
  if (uppercaseA < uppercaseB) {
    return -1;
  }
  return 0;
}

/**
 * compareStringsAsc - sorts string in descending order
 * @param {*} a 
 * @param {*} b 
 * @returns sorted strings
 */
export const compareStringsDesc = (a,b) => {
  // convert to uppper case so that both strings are in same case
  const uppercaseA = a.value.toUpperCase();
  const uppercaseB = b.value.toUpperCase();
  if (uppercaseA > uppercaseB) {
    return -1;
  }
  if (uppercaseA < uppercaseB) {
    return 1;
  }
  return 0;
}


/**
 * compareStringsAsc - sorts numbers in ascending order
 * @param {*} a 
 * @param {*} b 
 * @returns sorted numbers
 */
export const compareNumberAsc = (a,b) => {
 return  a.value - b.value;
}

/**
 * compareStringsAsc - sorts numbers in descending order
 * @param {*} a 
 * @param {*} b 
 * @returns sorted numbers
 */
export const compareNumberDesc = (a,b) => {
  return  b.value - a.value;
}


/**
 * compareStringsAsc - sorts dates in ascending order
 * @param {*} a 
 * @param {*} b 
 * @returns sorted dates 
 */
export const compareDateAsc = (a,b) => {
  const dateTimeA = new Date(a.value);
  const dateTimeB = new Date(b.value);
  return dateTimeA - dateTimeB;
}

/**
 * compareStringsAsc - sorts dates in descending order
 * @param {*} a 
 * @param {*} b 
 * @returns sorted dates
 */
export const compareDateDesc = (a,b) => {
  const dateTimeA = new Date(a.value);
  const dateTimeB = new Date(b.value);
  return dateTimeB - dateTimeA;
}