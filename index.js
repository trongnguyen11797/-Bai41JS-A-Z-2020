/**
 * Sử dụng Promise.all + axios để tải về 3 đường link sau cùng lúc và hiển thị ra kết quả:
 * https://jsonplaceholder.typicode.com/todos/1
 * https://jsonplaceholder.typicode.com/todos/2
 * https://jsonplaceholder.typicode.com/todos/3
 */
var axios = require('axios');
var fs = require('fs');
var Promise = require('promise')
// axios.get('https://jsonplaceholder.typicode.com/todos/3')
//     .then(function(response) {
//         console.log(response.data)
//         axios.get('https://jsonplaceholder.typicode.com/todos/2')
//         .then(function(response){
//             console.log(response.data);
//             axios.get('https://jsonplaceholder.typicode.com/todos/3')
//             .then(function(response) {
//                 console.log(response.data)
//             })
//         })
//     })

for (let i = 0; i < 4; i++) {
    axios({
        url: `https://jsonplaceholder.typicode.com/todos/1`,
        responseType: 'stream'
    })
        .then(function (response) {
            response.data.pipe(fs.createWriteStream(`todos1.txt`));
            axios({
                url: `https://jsonplaceholder.typicode.com/todos/2`,
                responseType: 'stream'
            })
                .then(function (response) {
                  response.data.pipe(fs.createWriteStream('todos2.txt'));
                  axios ({
                      url: `https://jsonplaceholder.typicode.com/todos/3`,
                      responseType: 'stream'
                  })
                  .then(function(response) {
                      response.data.pipe(fs.createWriteStream('todos3.txt'))
                  })
                })
        })
}

function readFilePromise(path) {
    return new Promise(function(reslove, reject) {
        fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
            if(err) reject(err);
            else reslove(data)
        })
    })
}
readFilePromise('todos1.txt')
.then(function(body) {
    console.log('Link 1: ', body);
    readFilePromise('todos2.txt')
    .then(function(body) {
        console.log('Link 2: ', body);
        readFilePromise('todos3.txt')
        .then(function(body) {
            console.log('Link 3: ', body)
        })
    })
})