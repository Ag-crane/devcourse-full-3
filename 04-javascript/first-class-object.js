// 자바스크립트는 일급 객체(First-class Object)이다.

// 1. 변수에 할당될 수 있다. (=할당명령문의 대상이 될 수 있다.)
const add = function(a, b) {
    return a + b;
}
console.log(add(1, 2)); // 3

const sub = add;
console.log(sub(1, 2)); // 3

// 2. 함수의 인자(매개변수)로 전달될 수 있다.
function calculator(func, a, b) {
    return func(a, b);
}
console.log(calculator(add, 1, 2)); // 3

// 3. 함수의 반환값으로 사용될 수 있다.
function calculator2(op) {
    if(op === '+') return add;
}
console.log(calculator2('+')(1, 2)); // 3

// 4. 데이터 구조(리스트, 딕셔너리 등)에 저장될 수 있다.
const funcs = [add, calculator, calculator2];
console.log(funcs)
console.log(funcs[0](1, 2)); // 3
console.log(funcs[1](add, 1, 2)); // 3
console.log(funcs[2]('+')(1, 2)); // 3
