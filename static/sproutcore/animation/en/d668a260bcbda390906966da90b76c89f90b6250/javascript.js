SC.Animatable={isAnimatable:YES,transitions:{},concatenatedProperties:["transitions"],style:{},_cssTransitionFor:{left:"left",top:"top",right:"right",bottom:"bottom",width:"width",height:"height",opacity:"opacity"},_styleProperties:["opacity","display"],_layoutStyles:["left","right","top","bottom","width","height","centerX","centerY"],_animationsToStart:{},_animationOrder:["top","left","bottom","right","width","height","centerX","centerY","opacity","display"],initMixin:function(){this._animatable_original_did_update_layer=this.didUpdateLayer||function(){};
this.didUpdateLayer=this._animatable_did_update_layer;this._animatable_original_willRemoveFromParent=this.willRemoveFromParent||function(){};
this.willRemoveFromParent=this._animatable_will_remove_from_parent;this._animateTickPixel.displayName="animate-tick";
var b;if(SC.isArray(this.transitions)){var a={};for(b=0;b<this.transitions.length;
b++){SC.mixin(a,this.transitions[b])}this.transitions=a}for(b in this.transitions){if(typeof this.transitions[b]=="number"){this.transitions[b]={duration:this.transitions[b]}
}}this._animatableCurrentStyle=null;this._animators={};this._animatableSetCSS="";
this._last_transition_css="";this._disableAnimation=0},_animatable_will_remove_from_parent:function(){this.resetAnimation()
},disableAnimation:function(){this._disableAnimation++},enableAnimation:function(){this._disableAnimation--;
if(this._disableAnimation<0){this._disableAnimation=0}},adjust:function(k,l){if(!SC.none(l)){var m=k;
k={};k[m]=l}else{k=SC.clone(k)}var a=SC.clone(this.get("style")),c=NO,g=SC.clone(this.get("layout")),b=NO;
var n=this._styleProperties;for(var e in k){var h=NO;var j=(n.indexOf(e)>=0)?a:g;
var d=j[e],f=k[e];if(f!==undefined&&d!==f){if(f===null){if(d!==undefined){h=YES}delete j[e]
}else{j[e]=f;h=YES}}if(h){if(j===a){c=YES}else{b=YES}}}if(c){this.set("style",a)}if(b){this.set("layout",g)
}return this},getCurrentJavaScriptStyles:function(){return this._animatableCurrentStyle
},resetAnimation:function(){this._animatableCurrentStyle=null;this._stopJavaScriptAnimations();
this.disableAnimation();this.updateStyle();this.enableAnimation()},_stopJavaScriptAnimations:function(){for(var a in this._animators){if(this._animators[a]&&this._animators[a].isQueued){SC.Animatable.removeTimer(this._animators[a])
}}},_getStartStyleHash:function(h,g){var e=this.layout;this.layout=h;this.notifyPropertyChange("layout");
var c=this.get("frame");var d=this.getPath("layoutView.frame");this.layout=e;var a={};
for(var b in g){if(c){if(b=="left"){a[b]=c.x;continue}else{if(b=="top"){a[b]=c.y;
continue}else{if(b=="right"){a[b]=d.width-c.x-c.width;continue}else{if(b=="bottom"){a[b]=d.height-c.y-c.height;
continue}else{if(b=="width"){a[b]=c.width;continue}else{if(b=="height"){a[b]=c.height;
continue}else{if(b=="centerX"){a[b]=c.x+(c.width/2)-(d.width/2);continue}else{if(b=="centerY"){a[b]=c.y+(c.height/2)-(d.height/2);
continue}}}}}}}}}if(!SC.none(h[b])){a[b]=h[b]}else{a[b]=g[b]}}return a},_TMP_CSS_TRANSITIONS:[],updateStyle:function(){var v=this.get("layer");
var k=this.get("style");var s;if(!this._animatableCurrentStyle||this._disableAnimation>0||!v){this._animatableCurrentStyle={};
for(s in k){if(s[0]!="_"){this._animatableCurrentStyle[s]=k[s]}}if(v){this._animatableApplyStyles(v,k)
}return this}if(!v){return}var j=true;for(s in k){if(s[0]=="_"){continue}if(k[s]!=this._animatableCurrentStyle[s]){j=false;
break}}if(j){return this}var d=this._getStartStyleHash(this._animatableCurrentStyle,k);
var n;var e=this._TMP_CSS_TRANSITIONS;if(SC.Animatable.enableCSSTransitions){for(s in this.transitions){if(!this._cssTransitionFor[s]){continue
}var h="linear";if(this.transitions[s].timing||SC.Animatable.defaultTimingFunction){n=this.transitions[s].timing||SC.Animatable.defaultTimingFunction;
if(SC.typeOf(n)!=SC.T_STRING){h="cubic-bezier("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+")"
}else{h=n}}e.push(this._cssTransitionFor[s]+" "+this.transitions[s].duration+"s "+h)
}}for(s in k){if(s[0]=="_"){continue}var c=!this.transitions[s]||k[s]==d[s];if(s=="display"&&k[s]!="none"){c=true
}if(c){d[s]=k[s];var u=this._animators[s];if(u){u.endValue=k[s];u.end=0}continue}if(SC.Animatable.enableCSSTransitions&&this._cssTransitionFor[s]){d[s]=k[s];
continue}var r=this._animateTickPixel,b=s,m=d[s],g=k[s];if(b=="centerX"||b=="centerY"){r=this._animateTickCenter
}else{if(b=="opacity"){r=this._animateTickNumber}else{if(b=="display"){r=this._animateTickDisplay
}}}if(!this._animators[s]){this._animators[s]={}}var t=this._animators[s];t.start=null;
t.duration=Math.floor(this.transitions[s].duration*1000);t.startValue=m;t.endValue=g;
t.layer=v;t.property=b;t.action=r;t.style=v.style;t.holder=this;n=this.transitions[s].timing||SC.Animatable.defaultTimingFunction;
if(n&&SC.typeOf(n)!=SC.T_STRING){t.timingFunction=n}if(!t.going){this._animationsToStart[s]=t
}}var o=this._animationOrder,p=this._animationOrder.length;for(s=0;s<p;s++){var q=o[s];
if(this._animationsToStart[q]){SC.Animatable.addTimer(this._animationsToStart[q]);
delete this._animationsToStart[q]}}var f=e.join(",");e.length="";this._animatableSetCSS=f;
this._animatableApplyStyles(v,d);return this}.observes("style"),_style_opacity_helper:function(c,a,b){c.opacity=b.opacity;
c.mozOpacity=b.opacity;c.filter="alpha(opacity="+b.opacity*100+")"},_animatableApplyStyles:function(a,b){if(!a){return
}if(b.display){a.style.display=b.display}if(this._animatableSetCSS!=this._last_transition_css){a.style["-webkit-transition"]=this._animatableSetCSS;
a.style["-moz-transition"]=this._animatableSetCSS;this._last_transition_css=this._animatableSetCSS
}if(!this._animators["display-styles"]){this._animators["display-styles"]={}}var c=this._animators["display-styles"];
c.holder=this;c.action=this._animatableApplyNonDisplayStyles;c.layer=a;c.styles=b;
this._animatableCurrentStyle=b;SC.Animatable.addTimer(c)},_animatableApplyNonDisplayStyles:function(){var f=SC.RunLoop.begin();
var g=this.layer,k=this.styles;var c={opacity:this.holder._style_opacity_helper};
var h={},l=NO,a=g.style;for(var e in k){if(e=="display"){continue}if(this.holder._layoutStyles.indexOf(e)>=0){h[e]=k[e];
l=YES;continue}if(c[e]){c[e](a,e,k)}}if(l){var b=this.holder.layout;this.holder.layout=h;
this.holder.notifyPropertyChange("layoutStyle");var d=this.holder.get("layoutStyle");
for(var j in d){if(SC.none(d[j])){a[j]=""}else{if(a[j]!=d[j]){a[j]=d[j]}}}this.holder.layout=b
}f.end()},_animatable_did_update_layer:function(){this._animatable_original_did_update_layer();
var d=this._animatableCurrentStyle,b=this.get("layer");if(!d){d={};var c=this.get("style");
var a=this.get("layout");SC.mixin(d,c,a)}this._animatableApplyStyles(b,d)},updateLayout:function(c,a){var b=SC.clone(this.get("style"));
var g=this.get("layout");var d=0,e=this._layoutStyles,h=e.length,f=NO;for(d=0;d<h;
d++){var j=e[d];if(b[j]!==g[j]){if(SC.none(g[j])){b[j]=""}else{b[j]=g[j]}f=YES}}if(f){this.style=b;
this.updateStyle()}return this},_solveBezierForT:function(b,p,m,l,f,d,n,e){var o=1/(200*e);
var k,j,h,c,a,g;for(h=n,g=0;g<8;g++){c=((b*h+m)*h+f)*h-n;if(Math.abs(c)<o){return h
}a=(3*b*h+2*m)*h+f;if(Math.abs(a)<Math.pow(10,-6)){break}h=h-c/a}k=0;j=1;h=n;if(h<k){return k
}if(h>j){return j}while(k<j){c=((b*h+m)*h+f)*h;if(Math.abs(c-n)<o){return h}if(n>c){k=h
}else{j=h}h=(j-k)*0.5+k}return h},_solveBezier:function(c,b,j,i,k,e){var f=3*c;var h=3*(j-c)-f;
var a=1-f-h;var d=3*b;var g=3*(i-b)-d;var m=1-d-g;var l=this._solveBezierForT(a,m,h,g,f,d,k,e);
return((m*l+g)*l+d)*l},_animateTickPixel:function(m){if(SC.none(this.start)){this.start=m;
this.end=this.start+this.duration}var n=this.start,g=this.end;var l=this.startValue,j=this.endValue;
var h=g-n;var b=j-l;var i=m-n;var f=Math.min(i/h,1);if(this.timingFunction){var a=this.timingFunction;
f=this.holder._solveBezier(a[0],a[1],a[2],a[3],f,h)}var k=Math.floor(l+(b*f));this.holder._animatableCurrentStyle[this.property]=k;
this.style[this.property]=k+"px";if(m<g){SC.Animatable.addTimer(this)}else{this.going=false;
this.styles=null;this.layer=null}},_animateTickDisplay:function(a){if(SC.none(this.start)){this.start=a;
this.end=this.start+this.duration}var b=this.end;if(a<b){SC.Animatable.addTimer(this);
return}this.holder._animatableCurrentStyle[this.property]=this.endValue;this.style[this.property]=this.endValue;
this.going=false;this.styles=null;this.layer=null},_animateTickNumber:function(m){if(SC.none(this.start)){this.start=m;
this.end=this.start+this.duration}var n=this.start,g=this.end;var l=this.startValue,j=this.endValue;
var h=g-n;var b=j-l;var i=m-n;var f=Math.min(i/h,1);if(this.timingFunction){var a=this.timingFunction;
f=this.holder._solveBezier(a[0],a[1],a[2],a[3],f,h)}var k=Math.round((l+(b*f))*100)/100;
this.holder._animatableCurrentStyle[this.property]=k;this.style[this.property]=k;
if(this.property=="opacity"){this.style.zoom=1;this.style.filter="alpha(opacity="+Math.round(k*20)*5+")"
}if(m<g){SC.Animatable.addTimer(this)}else{this.going=false;this.styles=null;this.layer=null
}},_animateTickCenter:function(o){if(SC.none(this.start)){this.start=o;this.end=this.start+this.duration
}var p=this.start,h=this.end;var n=this.startValue,k=this.endValue;var i=h-p;var f=k-n;
var j=o-p;var g=Math.min(j/i,1);if(this.timingFunction){var b=this.timingFunction;
g=this.holder._solveBezier(b[0],b[1],b[2],b[3],g,i)}var m=n+(f*g);this.holder._animatableCurrentStyle[this.property]=m;
var l,a;if(this.property=="centerX"){l="width";a="margin-left"}else{l="height";a="margin-top"
}this.style[a]=Math.round(m-(this.holder._animatableCurrentStyle[l]/2))+"px";if(o<h){SC.Animatable.addTimer(this)
}else{this.going=false;this.styles=null;this.layer=null}}};SC.mixin(SC.Animatable,{NAMESPACE:"SC.Animatable",VERSION:"0.1.0",TRANSITION_NONE:"linear",TRANSITION_CSS_EASE:"ease",TRANSITION_CSS_EASE_IN:"ease-in",TRANSITION_CSS_EASE_OUT:"ease-out",TRANSITION_CSS_EASE_IN_OUT:"ease-in-out",TRANSITION_EASE:[0.25,0.1,0.25,1],TRANSITION_LINEAR:[0,0,1,1],TRANSITION_EASE_IN:[0.42,0,1,1],TRANSITION_EASE_OUT:[0,0,0.58,1],TRANSITION_EASE_IN_OUT:[0.42,0,0.58,1],defaultTimingFunction:null,baseTimer:{next:null},going:false,_ticks:0,_timer_start_time:null,interval:10,currentTime:new Date().getTime(),enableCSSTransitions:false,stats:SC.Object.create({lastFPS:0}),addTimer:function(a){if(a.isQueued){return
}a.prev=SC.Animatable.baseTimer;a.next=SC.Animatable.baseTimer.next;if(SC.Animatable.baseTimer.next){SC.Animatable.baseTimer.next.prev=a
}SC.Animatable.baseTimer.next=a;a.isQueued=true;if(!SC.Animatable.going){SC.Animatable.start()
}},removeTimer:function(a){if(!a.isQueued){return}if(a.next){a.next.prev=a.prev}a.prev.next=a.next;
a.isQueued=false},start:function(){SC.Animatable._ticks=0;SC.Animatable._timer_start_time=new Date().getTime();
SC.Animatable.going=true;setTimeout(SC.Animatable.timeout,0)},timeout:function(){SC.Animatable.currentTime=new Date().getTime();
var h=SC.Animatable.currentTime;var f=SC.Animatable.baseTimer.next;SC.Animatable.baseTimer.next=null;
var e=0;while(f){var d=f.next;f.isQueued=false;f.next=null;f.prev=null;f.action.call(f,h);
f=d;e++}if(SC.Animatable._ticks<1000000){SC.Animatable._ticks++}var c=new Date().getTime();
var b=c-h;if(SC.Animatable.baseTimer.next){setTimeout(function(){SC.Animatable.timeout()
},Math.max(0,SC.Animatable.interval-b))}else{SC.Animatable.going=false;var g=c-SC.Animatable._timer_start_time;
var a=SC.RunLoop.begin();SC.Animatable.stats.set("lastFPS",SC.Animatable._ticks/(g/1000));
a.end()}}});(function(){var b=function(){var f=document.createElement("div");var g=["-webkit"];
var c=["moz","Moz","o","ms","webkit"];var e="",d=null;for(d=0;d<g.length;d++){e+=g[d]+"-transition:all 1s linear;"
}f.style.cssText=e;for(d=0;d<c.length;d++){if(f.style[c[d]+"TransitionProperty"]!==undefined){return true
}}return false};var a=b();if(a){SC.Animatable.enableCSSTransitions=true}})();if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/animation")
};