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

// 객체 타입 명시
let user: { name: string; age: number } = {
  name: "John Doe",
  age: 18,
};

// 유니온 타입
let numStr: number | string = 123;

// 타입 별칭
type numOrStr = number | string;
let numStr2: numOrStr = "123";

// 타입 가드
// Union 타입의 경우, 타입이 더 큰 범위의 변수를 더 작은 범위의 변수에 그냥 할당하면 에러가 발생한다.
// typeof 연산자를 사용하여 타입을 구분하여 해결한다.
function twiceNumber(numStr: numOrStr) {
  if (typeof numStr === "number") {
    return numStr * 2;
  } else {
    return 0;
  }
}
console.log(twiceNumber(123));
console.log(twiceNumber("123"));

// 배열
let numbers: number[] = [1, 2, 3, 4, 5];
let numStrs: numOrStr[] = [1, "two", 3, "four", 5];

// 튜플: 배열의 길이가 고정되고 각 요소의 타입이 지정된 배열
let greeting: [number, string, boolean] = [1, "Hello", true];
