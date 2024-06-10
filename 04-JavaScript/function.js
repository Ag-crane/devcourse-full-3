// 함수의 형태

// 1. 즉시 실행 함수 (IIFE : Immediately Invoked Function Expression)
// 선언과 동시에 실행된다.
(function() {
    console.log('IIFE');
})();
// 2. 재귀 함수 (Recursive Function)
// 함수 내부에서 자기 자신을 호출한다.
function countdown(n) {
    if(n < 0) return;
    console.log(n);
    countdown(n - 1);
}
countdown(5);
// 3. 중첩 함수 (Nested Function)
// 함수 내부에 함수가 정의되어 있다.
function outer() {
    console.log('outer');
    function inner() {
        console.log('inner');
    }
    inner();
}
outer();
// 4. 콜백 함수 (Callback Function)
// 함수의 인자로 전달되어 실행되는 함수
function run(callback) {
    callback();
}
run(function() {
    console.log('callback');
});

// ------------------------------------------------------------
// 함수 생성 방법

// 1. 함수 선언식
function add(a, b) {
    return a + b;
}
// 2. 함수 표현식
const sub = function(a, b) {
    return a - b;
}
// 3. 화살표 함수
const mul = (a, b) => {
    return a * b;
}
// 4. Function 생성자 함수
const div = new Function('a', 'b', 'return a / b');