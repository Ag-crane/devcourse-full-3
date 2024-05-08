## 회원 API 설계

1. 로그인 : POST /login
    - req : body (userId, pwd)
    - res : ~~님 환영합니다 -> 메인 페이지 이동
<br>
2. 회원 가입 : POST /join
    - req : body (userId, pwd, name)
    - res : ~~님 환영합니다 -> 로그인 페이지 이동
<br>
3. 회원 정보 (개별) 조회 : GET /users
    - req : body (userId)
    - res : id, name
<br>
4. 회원 (개별) 탈퇴 : DELETE /users
    - req : body (userId)
    - res : 탈퇴 페이지