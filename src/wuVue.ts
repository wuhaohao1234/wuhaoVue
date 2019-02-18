type Callback = <T>(payload: any) => void | T;
type Subscribe = <T>(this: T, event: string, callback: Callback) => boolean;
type UnsubscribeAll = <T>(this: T, event: string) => boolean;
type Clear = <T>(this: T) => boolean;
type Notify = <T, S>(this: T, event: string, ...payload: S[]) => void;

export interface IEventBus {
    subscribe: Subscribe;
    unsubscribe: Subscribe;
    unsubscribeAll: UnsubscribeAll;
    notify: Notify;
    clear: Clear;
}
interface Events {
    [event: string]: Callback[]
}

function subscribe(event: string, callback: Callback): boolean {
    if (this.events[event]) {
        this.events[event].push(callback)
    } else {
        this.events[event] = [callback]
    }
    return true;
}

function unsubscribe(event: string, callback: Callback): boolean {
    if (this.events[event]) {
        this.events[event].forEach((myCallback: Callback, key: number) => {
            if (myCallback === callback) {
                this.events[event].splice(key, 1)
            } else {
                return false
            }
        })
        return true
    }
}

function unsubscribeAll(event: string): boolean {
    if (this.events[event]) {
        this.events[event] = null
        return true
    } else {
        return false
    }
}
function notify<T>(event: string, ...payload: T[]) {
    if (this.events[event]) {
        this.events[event].forEach((callback: Callback) => {
            callback.apply(null, payload)
        })
    } else {
        console.error('该事件没有订阅')
        return false
    }
}
function clear(): boolean {
    this.events = {}
    return true
}
module.exports = class EventBus implements IEventBus {
    // 外部无法直接修改events
    private events: Events = {}
    // 接口API对外开放
    public subscribe = subscribe
    public unsubscribe = unsubscribe
    public unsubscribeAll = unsubscribeAll
    public clear = clear
    public notify = notify
}
