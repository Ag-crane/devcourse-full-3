let http = require('http') // node.js가 http를 활용할 수 있도록 제공하는 모듈을 가져온다.
let url = require('url')

function start(route, handle){
    function onRequest(request, response){ // 클라이언트로부터 요청이 오면
        let pathname = url.parse(request.url).pathname // 요청 url을 파싱하여 pathname을 얻는다.
        console.log('Request for ' + pathname + ' received.') // 요청 url을 콘솔에 출력한다.
        let queryData = url.parse(request.url, true).query; // url을 파싱하여 queryData를 얻는다.
        console.log('queryData: ', queryData)
        route(pathname, handle, response, queryData.productId) // router의 route 함수를 호출하고 pathname을 인자로 넘긴다.
       
    }
    
    http.createServer(onRequest).listen(8888) // 서버를 생성하고 8888번 포트로 서버를 열어준다.
}

exports.start = start // start 함수를 외부에서 사용할 수 있도록 exports 한다.
