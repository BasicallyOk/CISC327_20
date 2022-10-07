//const alphanumeric = /^[\p{L}\p{N}]*$/u;
const alphanumeric = /^[^\s][a-zA-Z0-9\s*]*[^\s]$/gm
const valid   = "hellotytr"; // <- these are all letters and numbers

console.log(alphanumeric.test(valid));