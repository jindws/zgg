module.exports = {
    interval:'30 * * * * *',
    handler(){
        console.log('定时任务 每分钟第30秒执⾏⼀次'+ new Date())
    }
}