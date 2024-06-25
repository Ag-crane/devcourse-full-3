"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Employee_empId, _Employee_empName, _Employee_empDept;
// 직원 클래스
class Employee {
    // 생성자
    constructor(empId, empName, empDept) {
        // 속성(프로퍼티) = 필드 = 멤버 변수
        _Employee_empId.set(this, void 0); // private 키워드 대신 #을 사용해서 private 필드 선언 가능
        _Employee_empName.set(this, void 0);
        _Employee_empDept.set(this, void 0);
        __classPrivateFieldSet(this, _Employee_empId, empId, "f");
        __classPrivateFieldSet(this, _Employee_empName, empName, "f");
        __classPrivateFieldSet(this, _Employee_empDept, empDept, "f");
    }
    // // 필드 선언와 생성자를 한번에 처리하려면 private 키워드를 사용하여 생성자 매개변수를 필드로 선언할 수 있다.
    // constructor(private empId: number, private empName: string, private empDept: string) {
    //     this.empId = empId;
    //     this.empName = empName;
    //     this.empDept = empDept;
    // }
    // 메소드 = 멤버 함수 
    display() {
        console.log(`사번: ${__classPrivateFieldGet(this, _Employee_empId, "f")}`);
        console.log(`이름: ${__classPrivateFieldGet(this, _Employee_empName, "f")}`);
        console.log(`부서: ${__classPrivateFieldGet(this, _Employee_empDept, "f")}`);
    }
    // getter 메소드
    get empId() {
        return __classPrivateFieldGet(this, _Employee_empId, "f");
    }
    // setter 메소드
    set empId(empId) {
        __classPrivateFieldSet(this, _Employee_empId, empId, "f");
    }
}
_Employee_empId = new WeakMap(), _Employee_empName = new WeakMap(), _Employee_empDept = new WeakMap();
// 객체 생성
let emp = new Employee(101, "lee", "dev");
emp.display(); // 메소드 호출
console.log(emp.empId); // getter 메소드 호출
emp.empId = 102; // setter 메소드 호출
