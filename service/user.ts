function delay(time=2000){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },time)
    })
}

// 可复⽤的服务 ⼀个同步，⼀个异步
module.exports = {
    getId:async ()=>{
        return 1
    },

    getIds:async ()=>{
        await delay(2000)
        return [1,2,3]
    }
}