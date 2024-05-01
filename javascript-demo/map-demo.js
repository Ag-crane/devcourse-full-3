const arr = [1, 2, 3, 4, 5];

// forEach와 map의 차이
const forEachReturn = arr.forEach((a ,b ,c)=>{
    return a + 1
})
console.log(forEachReturn) // undefined

const mapReturn = arr.map((a ,b ,c)=>{
    return a + 1
})
console.log(mapReturn) // [2, 3, 4, 5, 6]

// forEach는 반환값이 없고, map은 새로운 배열을 반환한다.