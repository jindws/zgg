module.exports = {
    db:{
        dialect:'mysql',
        host:'localhost',
        database:'main',
        username:'root',
        password:'root'
    },
    middleware: ['logger'] // 以数组形式，保证执⾏顺序
}