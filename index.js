export class SingleTypeEventHandler {
    constructor(type) {
        this.funcs=[];
        this.type=type;
    }
    on(...args) {
        const f=args.pop();
        if (typeof f!=="function") {
            console.log(args, f);
            throw new Error("Not a function for type "+this.type);
        }
        this.funcs.push(f);
        const r={
            remove: ()=>{
                const e=this.funcs.indexOf(f);
                if (e>=0) this.funcs.splice(e,1);
            }
        };
        return r;
    }
    fire(...args) {
        for (let f of this.funcs) f(...args);
    }
}
export class EventHandler {
    constructor() {
        this.types={};
    }
    on(type, ...args) {
        this.types[type]=this.types[type]||new SingleTypeEventHandler(type);
        return this.types[type].on(...args);
    }
    fire(type,...args) {
        this.types[type]=this.types[type]||new SingleTypeEventHandler(type);
        return this.types[type].fire(...args);
    }
    static attachTo(o){
        let e=new EventHandler();
        o.on=e.on.bind(e);
        o.fire=e.fire.bind(e);
        return o;
    }
}