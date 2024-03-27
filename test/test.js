import {EventHandler} from "../index.js";
import {equal} from "assert";
const buf=[];
const out=(s)=>{
    console.log(s);
    buf.push(s);
};
async function main() {
    // create EventHandler
    const e=new EventHandler();
    // set event handler for event "foo"
    e.on("foo", ()=>out("foo1"));
    // set event handler for event "foo" and get remover object 'r'
    const r=e.on("foo", ()=>out("foo2"));
    e.fire("foo");// fire "foo" event, outputs "foo1" and "foo2"
    r.remove(); // disable the event hander which outputs "foo2"
    e.fire("foo");// fire "foo" event, outputs only "foo1".
    equal(buf.join("\n"),["foo1","foo2","foo1"].join("\n"));

    // attach Event Handler to other object
    buf.length=0;
    const t=new Test();
    EventHandler.attachTo(t);// attach event handler to 't'
    // Now t.on and t.fire is available.
    const r2=t.on("bar", ({x})=>out("bar2 "+x*2));
    t.on("bar", ({x})=>out("bar3 "+x*3));
    t.bar(100);
    r2.remove();
    t.bar(200);

    equal(buf.join("\n"),["bar 100","bar2 200","bar3 300","bar 200","bar3 600"].join("\n"));

} 
class Test {
    bar(x) {
        out("bar "+x);
        this.fire("bar",{x});
    }
}
main();