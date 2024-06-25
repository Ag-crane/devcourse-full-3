// 직원 클래스
class Employee {
    // 속성(프로퍼티) = 필드 = 멤버 변수
    #empId: number; // private 키워드 대신 #을 사용해서 private 필드 선언 가능
    #empName: string;
    #empDept: string;
    

    // 생성자
    constructor(empId: number, empName: string, empDept: string) {
        this.#empId = empId;
        this.#empName = empName;
        this.#empDept = empDept;
    }

    // // 필드 선언와 생성자를 한번에 처리하려면 private 키워드를 사용하여 생성자 매개변수를 필드로 선언할 수 있다.
    // constructor(private empId: number, private empName: string, private empDept: string) {
    //     this.empId = empId;
    //     this.empName = empName;
    //     this.empDept = empDept;
    // }

    // 메소드 = 멤버 함수 
    display() {
        console.log(`사번: ${this.#empId}`);
        console.log(`이름: ${this.#empName}`);
        console.log(`부서: ${this.#empDept}`);
    }

    // getter 메소드
    get empId() {
        return this.#empId;
    }

    // setter 메소드
    set empId(empId: number) {
        this.#empId = empId;
    }
}

// 객체 생성
let emp = new Employee(101, "lee", "dev")
emp.display(); // 메소드 호출
console.log(emp.empId); // getter 메소드 호출
emp.empId = 102; // setter 메소드 호출