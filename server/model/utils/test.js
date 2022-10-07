// const alphanumeric = /^[\p{L}\p{N}]*$/u;
const alphanumeric = /^[^\s!@#$%^&*)(':;][a-zA-Z0-9\s]*[^\s!@#$%^&*)(':;]$/gm
const valid = 'he    llw' // <- these are all letters and numbers

console.log(alphanumeric.test(valid))

const dateBefore = new Date('2025-01-02')
const dateAfter = new Date('2021-01-02')
console.log(dateAfter > dateBefore)
