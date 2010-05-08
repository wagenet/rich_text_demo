var SC=SC||{};SC._mapDisplayNamesUseHashForSeenTypes=["object","number","boolean","array","string","function","class","undefined","error"];
SC.mapDisplayNames=function(h,a,m,f,q){if(!SC.browser.safari){return}if(!SC._mapDisplayNamesUseHashForSeenTypesHash){var g=SC._mapDisplayNamesUseHashForSeenTypes;
var l={};var p=g.length;for(var o=0;o<p;++o){var c=g[o];l[c]=true}SC._mapDisplayNamesUseHashForSeenTypesHash=l
}if(h===undefined){h=window}if(a===undefined){a=0}if(m===undefined){m=[]}if(f===undefined){f={}
}if(q===undefined){q=[]}if(a>5){return}var d=!!SC._mapDisplayNamesUseHashForSeenTypesHash[SC.typeOf(h)];
var b;var k;if(d){b=SC.hashFor(h);k=f[b]}else{k=q}if(k&&k.indexOf(h)!==-1){return
}if(k){k.push(h)}else{if(d){f[b]=[h]}}var e=m.length,n,s,j;m[e]="";for(var r in h){if(h.hasOwnProperty&&!h.hasOwnProperty(r)){continue
}if(!isNaN(Number(r))){continue}if(r==="constructor"){continue}if(r==="superclass"){continue
}if(r==="document"){continue}s=h[r];if(r==="SproutCore"){r="SC"}j=SC.typeOf(s);if(j===SC.T_FUNCTION){if(!s.displayName){m[e]=r;
n=m.join(".").replace(".prototype.","#");s.displayName=n}if(s.prototype){m.push("prototype");
SC.mapDisplayNames(s.prototype,a+1,m,f,q);m.pop()}}else{if(j===SC.T_CLASS){m[e]=r;
SC.mapDisplayNames(s,a+1,m,f,q)}else{if((r.indexOf("_")!==0)&&(j===SC.T_OBJECT||j===SC.T_HASH)){m[e]=r;
SC.mapDisplayNames(s,a+1,m,f,q)}}}}m.pop()};var SC=SC||{};SC.addInvokeOnceLastDebuggingInfo=function(){SC.ObserverSet.add=function(j,b,e,i,p,l){var c=(j)?SC.guidFor(j):"__this__";
var g=this[c];if(!g){g=this[c]=SC.CoreSet.create();g.target=j;g.isTargetSet=YES;this.targets++
}g.add(b);if(e!==undefined){var h=g.contexts;if(!e){h={}}h[SC.guidFor(b)]=e}if(p!==undefined){var f=g.originatingTargets;
var o=g.originatingMethods;var a=g.originatingStacks;if(!f){f=g.originatingTargets={}
}if(!o){o=g.originatingMethods={}}if(!a){a=g.originatingStacks={}}var n=SC.guidFor(b);
var d=o[n];if(d&&SC.typeOf(d)!==SC.T_ARRAY){var k=f[n];var m=a[n];f[n]=[k,i];o[n]=[d,p];
a[n]=[m,l]}else{f[n]=i;o[n]=p;a[n]=l}}this._membersCacheIsValid=NO};SC.ObserverSet.invokeMethods=function(){for(var p in this){if(!this.hasOwnProperty(p)){continue
}var n=this[p];if(n&&n.isTargetSet){var o=n.length;var j=n.target;var c,d=SC.LOG_RUNLOOP_INVOCATIONS;
while(--o>=0){c=n[o];if(d){var s=c.displayName||c;var g=SC.guidFor(c);var b=n.originatingTargets[g];
var r=n.originatingMethods[g];var a=n.originatingStacks[g];if(r&&SC.typeOf(r)===SC.T_ARRAY){console.log("Invoking runloop-scheduled method %@ on %@, which was scheduled by multiple target/method pairs:".fmt(s,j));
var e,h,f,q,k;for(e=0,h=r.length;e<h;++e){f=b[e];q=r[e];q=q.displayName||q;k=a[e];
console.log("[%@]  originated by target %@,  method %@,  stack:".fmt(e,f,q),k)}}else{var l=r.displayName||r;
console.log("Invoking runloop-scheduled method %@ on %@.  Originated by target %@,  method %@,  stack: ".fmt(s,j,b,l),a)
}}c.call(j)}}}};SC.Object.prototype.invokeOnce=function(b){var a=this;if(SC.LOG_RUNLOOP_INVOCATIONS){originatingStack=SC.getRecentStack();
originatingMethod=originatingStack[0]}else{originatingStack=null;originatingMethod=arguments.callee.caller
}SC.RunLoop.currentRunLoop.invokeOnce(this,b,a,originatingMethod,originatingStack);
return this};SC.Object.prototype.invokeLast=function(d){var a=this;var c,b;if(SC.LOG_RUNLOOP_INVOCATIONS){c=SC.getRecentStack();
b=c[0]}else{c=null;b=arguments.callee.caller}SC.RunLoop.currentRunLoop.invokeLast(this,d,a,b,c);
return this};SC.RunLoop.prototype.invokeOnce=function(c,e,a,b,d){if(!a){a=null}if(!b){if(SC.LOG_RUNLOOP_INVOCATIONS){d=SC.getRecentStack();
b=d[0]}else{d=null;b=arguments.callee.caller}}if(e===undefined){e=c;c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()}this._invokeQueue.add(c,e,null,a,b,d);
return this};SC.RunLoop.prototype.invokeLast=function(c,e,a,b,d){if(!a){a=null}if(!b){if(SC.LOG_RUNLOOP_INVOCATIONS){d=SC.getRecentStack();
b=d[0]}else{d=null;b=arguments.callee.caller}}if(e===undefined){e=c;c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()}this._invokeLastQueue.add(c,e,null,a,b,d);
return this};SC.getRecentStack=function(){var d=arguments.callee.caller,b=0,a={},e=YES,c;
while(d&&b<6){if(e){e=NO}else{c=d.displayName||d.toString();a[b++]=c}d=d.caller}return a
}};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/debug")
};