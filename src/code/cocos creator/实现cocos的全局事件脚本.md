# 事件系统的原理

监听方进行事件的注册(事件的被动响应者)，然后事件触发方进行事件的发射(主动的一方).

    案例：点击按钮，方块颜色变色。其中按钮就是事件发出方，方块就是事件订阅方。

    step1: 方块在事件中心进行事件对应的回调函数的注册

    step2：按钮通过事件中心发出对于事件的触发

1. `on` : 监听事件:用于被订阅方进行相关的动作执行(嗲用注册的回调函数)

2. `off` : 取消事件监听

3. `emit` : 事件发射

伪代码实现: 感觉这个代码有一定的问题就是this的绑定问题，后面再进行修改。

~~~typescript

import Singleton from "../base/Singleton";
import SysLog from "../utils/SysLog";
import GamePublicUtil from "../utils/GamePublicUtil";
 
interface IEvent {
    func: Function,
    ctx: unknown
}
 
/**
 * 事件(订阅/发布)管理器
 */
export default class EventManager extends Singleton {
 
    private _eventMap: Map<string, Array<IEvent>> = new Map<string, Array<IEvent>>();
 
    role: cc.Node;
    private _timer;
    private _duration: number = 2000;
 
    private _delayMap: Map<string, any> = new Map();
 
    constructor() {
        super();
        this._delayMap.clear();
    }
 
    static get instance() {
        return super.getInstance<EventManager>();
    }
 
    on(eventName: string, func: Function, ctx: unknown) {
        if (this._eventMap.has(eventName)) {
            this._eventMap.get(eventName).push({func, ctx});
        } else {
            this._eventMap.set(eventName, [{func, ctx}]);
        }
    }
 
    off(eventName: string, func: Function, ctx: unknown) {
        if (this._eventMap.has(eventName)) {
            let events = this._eventMap.get(eventName);
            let index = events.findIndex(i => i.func === func && i.ctx === ctx);
            index > -1 && events.splice(index, 1);
            if (events.length == 0) {
                this._eventMap.delete(eventName);
            }
        } else {
            SysLog.warn(`事件解绑失败:事件名(${eventName})不存在`);
        }
    }
 
    emit(eventName: string, detail?: any) {
        if (this._eventMap.has(eventName)) {
            this._eventMap.get(eventName).forEach(({func, ctx}) => {
                typeof detail === "undefined" ? func.call(ctx) : func.call(ctx, detail);
            })
        }
    }
 
    /**
     * 延迟事件通知
     * @param eventName
     * @param detail
     */
    delayEmit(eventName: string, detail?: any) {
        if (this._delayMap) {
            this._delayMap.set(eventName, detail);
            if (!this._timer) {
                this._timer = setInterval(this.delayEvent.bind(this), this._duration);
            }
        }
    }
 
    private delayEvent() {
        if (this.role && !GamePublicUtil.getIsTalkingNpc() && this._delayMap.size > 0) {
            let next = this._delayMap.entries().next();
            if (next) {
                let key: string = next.value[0];
                let val = next.value[1];
                this.emit(key, val);
                this._delayMap.delete(key);
            }
 
            if (this._delayMap.size === 0 && this._timer) {
                //没有延迟事件停止轮询
                clearInterval(this._timer);
                this._timer = null;
            }
        }
    }
 
    clear() {
        this._delayMap.clear();
        this._eventMap.clear();
    }
 
    log() {
        if (this._eventMap.size > 0) {
            this._eventMap.forEach((events, eventName) => {
                SysLog.info(`事件名:${eventName}`);
                SysLog.info(`   订阅者信息:`);
                events.forEach((event) => {
                    // @ts-ignore
                    SysLog.info(`           ${event.ctx.node.name}`);
                })
            })
        } else {
            SysLog.info(`事件管理器暂无任何信息`);
        }
    }
}


~~~




# cocos自带的事件系统

[cocos文档官方解释](https://docs.cocos.com/creator/manual/zh/engine/event/event-emit.html)

# 封装事件系统进行全局管理

