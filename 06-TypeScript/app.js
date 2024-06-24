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
