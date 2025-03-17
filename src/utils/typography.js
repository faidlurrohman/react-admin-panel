// simpling uppercasing text | string
export function upper(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  throw new Error(":=> data is not valid, expected string");
}

// simpling lowercasing text | string
export function lower(value) {
  if (typeof value === "string") {
    return value.toLowerCase();
  }

  throw new Error(":=> data is not valid, expected string");
}

// simpling uppercasing first letter of any text | string
export function upperFirst(value) {
  if (typeof value === "string") {
    let splitStr = lower(value).split(" ");

    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = upper(splitStr[i].charAt(0)) + splitStr[i].substring(1);
    }

    return splitStr.join(" ");
  }

  throw new Error(":=> data is not valid, expected string");
}
