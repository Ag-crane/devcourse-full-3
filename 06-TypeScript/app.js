"use strict";
// 변수의 데이터 타입 명시
let studentId = 12345;
let studentName = "John Doe";
let studentAge = 18;
let isStudent = true;
let studentGrade = "A";
let studentSubjects = ["Math", "Science", "English"];
// 열거형 : 사용자 정의 데이터 타입
var StudentGrade;
(function (StudentGrade) {
    StudentGrade["A"] = "A";
    StudentGrade["B"] = "B";
    StudentGrade["C"] = "C";
    StudentGrade["D"] = "D";
    StudentGrade["F"] = "F";
})(StudentGrade || (StudentGrade = {}));
function getStudentInfo(id) {
    return {
        id: 12345,
        name: "John Doe",
        // age: 18,
        isStudent: true,
        grade: StudentGrade.A,
        subjects: ["Math", "Science", "English"],
    };
}
function setStudentInfo(student) {
    console.log(student);
}
console.log(getStudentInfo(12345));
setStudentInfo({
    id: 12345,
    name: "Alice Doe",
    age: 18,
    isStudent: true,
    grade: StudentGrade.B,
    subjects: ["Math", "Science", "English"],
});
// 객체 타입 명시
let user = {
    name: "John Doe",
    age: 18,
};
// 유니온 타입
let numStr = 123;
let numStr2 = "123";
// 타입 가드
// Union 타입의 경우, 타입이 더 큰 범위의 변수를 더 작은 범위의 변수에 그냥 할당하면 에러가 발생한다.
// typeof 연산자를 사용하여 타입을 구분하여 해결한다.
function twiceNumber(numStr) {
    if (typeof numStr === "number") {
        return numStr * 2;
    }
    else {
        return 0;
    }
}
console.log(twiceNumber(123));
console.log(twiceNumber("123"));
// 배열
let numbers = [1, 2, 3, 4, 5];
let numStrs = [1, "two", 3, "four", 5];
// 튜플: 배열의 길이가 고정되고 각 요소의 타입이 지정된 배열
let greeting = [1, "Hello", true];
