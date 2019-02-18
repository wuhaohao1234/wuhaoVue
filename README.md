# wuhaoVue
全局事件订阅系统

## API

* 订阅事件(subscribe)
* 发布事件(notify)
* 取消指定事件(unsubscribe)
* 取消特定事件(unsubscribeAll)
* 取消所有事件(clear)

## demo

```
    import { IEventBus } from "./wuVue"; //引入类型声明
    let EventBus = require("./wuVue")

    let eventBus: IEventBus = new EventBus()
    //订阅click事件
    eventBus.subscribe('click',()=>{
        console.log('自定义函数')
    })
    let dbClick = (arg:string) => {
        console.log(arg)
        console.log(1)
    }
    eventBus.subscribe('click', dbClick)
    // 清空所有事件
    // 发布事件
    eventBus.notify('click', 'dbClick')
    // 清空click事件内所有的事件
    eventBus.unsubscribeAll('click')
    // 清空click事件中的dbClick事件
    eventBus.unsubscribe('click',dbClick)
    // 清空所有事件
    eventBus.clear()
```