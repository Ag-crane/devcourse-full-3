const obj1 = {}
const obj2 = { message : "not empty" }

console.log(Object.keys(obj1)) // 빈 객체
console.log(Object.keys(obj2)) // 비어있지 않은 객체

console.log(Object.keys(obj1).length === 0) // true
console.log(Object.keys(obj2).length === 0) // false

const num = 1
const str = "one"

console.log(Object.keys(num)) // [] 객체가 아님
console.log(Object.keys(str)) // [ '0', '1', '2' ] index를 key로 하는 객체 취급

function isEmpty(obj) {
    if (obj.constructor === Object){ // 객체인지 확인
        return Object.keys(obj).length === 0 // 객체가 비어있는지 확인
    }else{
        return console.error("This is not an object");
    }
}

console.log(isEmpty(obj1)) // true
console.log(isEmpty(obj2)) // false
console.log(isEmpty(num)) // This is not an object
console.log(isEmpty(str)) // This is not an object
