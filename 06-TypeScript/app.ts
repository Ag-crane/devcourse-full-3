// 변수의 데이터 타입 명시
let studentId: number = 12345;
let studentName: string = "John Doe";
let studentAge: number = 18;
let isStudent: boolean = true;
let studentGrade: string = "A";
let studentSubjects: string[] = ["Math", "Science", "English"];

// 열거형 : 사용자 정의 데이터 타입
enum StudentGrade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    F = "F",
}

interface Student {
    id: number;
    name: string;
    age?: number; // Optional Property : 없어도 컴파일 에러가 발생하지 않음
    isStudent: boolean;
    grade: StudentGrade;
    subjects: string[];
}

function getStudentInfo(id: number): Student {
    return {
        id: 12345,
        name: "John Doe",
        // age: 18,
        isStudent: true,
        grade: StudentGrade.A,
        subjects: ["Math", "Science", "English"],
    };
}

function setStudentInfo(student: Student): void {
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
