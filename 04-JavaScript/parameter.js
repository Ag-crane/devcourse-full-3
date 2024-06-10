// 자바스크립트 매개변수의 특징

// 1. 기본값 매개변수 (Default Parameter)
// 매개변수가 전달되지 않는 경우, 기본값이 없으면 undefined가 할당된다.
function add(a, b) {
    console.log(a, b); // 1 undefined
    return a + b;
}
console.log(add(1)); // 1 + undefined = NaN
// 기본값을 설정하면, 전달되지 않은 매개변수에는 기본값이 할당된
function add(a, b = 1) {
    console.log(a, b); // 1 1
    return a + b;
}
console.log(add(1)); // 1 + 1 = 2

// 2. 나머지 매개변수 (Rest Parameter)
// 함수의 매개변수가 정해지지 않은 경우, 나머지 매개변수로 받을 수 있다.
function add2(a, b, ...args) {
    console.log(a, b); // 1 2
    console.log(args); // [ 3, 4, 5 ]
    return a + b;
}
console.log(add2(1, 2, 3, 4, 5)); // 1 + 2 = 3

// 3. arguments 객체
// arguments 객체는 함수 호출 시 전달된 인자들의 정보를 담고 있는 유사 배열 객체이다.
function add3(a, b) {
    console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
    return a + b;
}
console.log(add3(1, 2)); // 1 + 2 = 3

// 4. 매개변수 해체 (Destructuring)
// 객체나 배열을 해체하여 개별 변수로 추출할 수 있다.
// 객체 해체
function add4({ a, b }) {
    console.log(a, b); // 1 2
    return a + b;
}
console.log(add4({ a: 1, b: 2 })); // 1 + 2 = 3
// 배열 해체
function add5([a, b]) {
    console.log(a, b); // 1 2
    return a + b;
}
console.log(add5([1, 2])); // 1 + 2 = 3