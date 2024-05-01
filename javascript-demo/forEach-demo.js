// 배열의 forEach 메소드
const arr = [1, 2, 3, 4, 5];
// 배열의 요소를 하나씩 꺼내서 콜백함수를 실행
// 콜백함수의 첫 번째 인자: 배열의 요소, 두 번째 인자: 배열의 인덱스, 세 번째 인자: 배열 자체
arr.forEach((a ,b ,c)=>{
    console.log(`a: ${a}, b: ${b}, c: ${c}`)
})

arr.forEach((value, index, array) => {
    console.log(`value: ${value}, index: ${index}, array: ${array}`)
})

// Map의 forEach 메소드
const map = new Map();
map.set(5, 'five')
map.set(6, 'six')
map.set(7, 'seven')

// Map의 요소를 하나씩 꺼내서 콜백함수를 실행
// 콜백함수의 첫 번째 인자: value, 두 번째 인자: key, 세 번째 인자: map 자체
map.forEach((a, b, c)=>{
    console.log(`a: ${a}, b: ${b}, c: ${c}`)
})

arr.forEach((value, index, array) => {
    console.log(`value: ${value}, index: ${index}, array: ${array}`)
})

