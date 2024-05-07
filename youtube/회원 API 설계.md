## 회원 API 설계

1. 로그인 : POST /login
    - req : body (id, pwd)
    - res : ~~님 환영합니다 -> 메인 페이지 이동
<br>
2. 회원 가입 : POST /join
    - req : body (id, pwd, name)
    - res : ~~님 환영합니다 -> 로그인 페이지 이동
<br>
3. 회원 정보 (개별) 조회 : GET /users/:id
    - req : URL (id)
    - res : id, name
<br>
4. 회원 (개별) 탈퇴 : DELETE /users/:id
    - req : URL (id)
    - res : 탈퇴 페이지