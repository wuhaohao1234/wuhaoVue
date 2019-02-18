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

module.exports = class EventBus implements IEventBus {
    private events: Events = {}
    constructor() {

    }
    public subscribe(event: string, callback: Callback): boolean {
        if (this.events[event]) {
            this.events[event].push(callback)
        } else {
            this.events[event] = [callback]
        }
        return true;
    }
    public unsubscribe(event: string, callback: Callback): boolean {
        if (this.events[event]) {
            this.events[event].forEach((myCallback, key) => {
                if (myCallback === callback) {
                    this.events[event].splice(key, 1)
                } else {
                    return false
                }
            })
            return true
        }
    }
    public unsubscribeAll(event: string): boolean {
        if (this.events[event]) {
            this.events[event] = null
            return true
        } else {
            return false
        }
    }
    public clear(): boolean {
        this.events = {}
        return true
    }
    public notify<T>(event: string, ...payload: T[]) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => {
                callback.apply(null, payload)
            })
        } else {
            console.error('该事件没有订阅')
            return false
        }
    }
}
