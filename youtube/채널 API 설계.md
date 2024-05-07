## 채널 API 설계

1. 채널 생성 : POST /channels
    - req : body (channelTitle)
    - res : 201, 'channelTitle님 채널을 응원합니다' -> 채널 관리 페이지 이동

2. 채널 개별 수정 : PUT /channels/:id
    - req : URL (id), body (channelTitle, newTitle)
    - res : 200, '{기존 채널명} -> {수정 채널명} 수정 완료'

3. 채널 개별 삭제 : DELETE /channels/:id
    - req : URL (id)
    - res : 200, '삭제 완료` -> 메인 페이지 이동

4. 채널 전체 조회 : GET /channels
    - req : 
    - res : 200, 채널 전체 데이터

5. 채널 개별 조회 : GET /channels/:id
    - req : URL (id)
    - res : 채널 개별 데이터