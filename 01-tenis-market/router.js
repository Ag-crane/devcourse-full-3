function route(pathname, handle, response, productId){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, productId)
    } else {
        console.log('No request handler found for ' + pathname)
    }
}

exports.route = route // route 함수를 외부에서 사용할 수 있도록 exports 한다.