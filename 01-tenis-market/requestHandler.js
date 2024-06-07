const fs = require('fs')
const main_view = fs.readFileSync('./main.html')
const mariadb = require('./database/connect/mariadb')
const orderlist_view = fs.readFileSync('./orderlist.html')
function main(response){
    console.log('main')
    mariadb.query("select * from product", function(err,rows){
        console.log(rows)
    })
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(main_view)
    response.end()
}

function login(response){
    console.log('login')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write('<h1>Login page</h1>')
    response.end()
}

function name(response){
    console.log('name')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write('<h1>Lee Eun Hak</h1>')
    response.end()
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'image/png'})
        response.write(data)
        response.end()
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'image/png'})
        response.write(data)
        response.end()
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'image/png'})
        response.write(data)
        response.end()
    })
}

function order(response, productId){
    console.log('order')
    mariadb.query("insert into orderlist values(?, ?)", [productId, new Date().toLocaleDateString()])
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write('<h1>Order page</h1>')
    response.end()
}

function orderList(response){
    console.log('orderList')

    response.writeHead(200, {'Content-Type': 'text/html'})
    
    mariadb.query("select * from orderlist", function(err, rows){
        response.write(orderlist_view)
        console.log(rows)

        rows.forEach(row =>{
            response.write('<tr><td>' + row.productId + '</td><td>' + row.order_date + '</td></tr>')
        })
        response.write("</table>");
        response.end()
    })

}

let handle = {}; // key:value
handle['/'] = main;
handle['/login'] = login;
handle['/name'] = name;
handle['/order'] = order;
handle['/orderlist'] = orderList;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle; // handle 객체를 외부에서 사용할 수 있도록 exports 한다.