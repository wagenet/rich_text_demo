SC.Designer=SC.Object.extend({});SC.ObjectCoder=SC.Object.extend({className:"SC.Object",extendMethodName:"extend",encodeMethodName:"encode",attributes:null,transform:function(b,a){if(SC.typeOf(b)===SC.T_ARRAY){b=b.map(function(c){return this.transform(c,a)
},this);b="["+b+"]"}else{b=a.call(this,b)}return b},js:function(b,c,a){if(c===undefined){c=b;
b=undefined}c=this.transform(c,function(d){return(d===null)?"null":a?a.call(this,d):d
});if(b!==undefined&&(c!==undefined)){this.attributes[b]=c;return this}else{return c
}},string:function(a,b){return this.js(a,b,function(c){return'"'+c.replace(/"/g,'\\"')+'"'
})},number:function(a,b){return this.js(a,b,function(c){return c.toString()})},bool:function(a,b){return this.js(a,b,function(c){return c?"YES":"NO"
})},encode:function(a,c,b){if(b===undefined&&c instanceof Function){b=c;c=a;a=undefined
}return this.js(a,c,function(d){if(b){d=b.call(this,d,null,null)}switch(SC.typeOf(d)){case SC.T_STRING:d=this.string(d);
break;case SC.T_NUMBER:d=this.number(d);break;case SC.T_BOOL:d=this.bool(d);break;
case SC.T_ARRAY:d=this.array(d,b);break;case SC.T_HASH:d=this.hash(d,b);break;default:d=d?this.object(d):this.js(d)
}return d})},hash:function(a,c,b){if(b===undefined&&c instanceof Function){b=c;c=a;
a=undefined}return this.js(a,c,function(d){var e=[];for(var f in d){if(!d.hasOwnProperty(f)){continue
}e.push("%@: %@".fmt(this.encode(f),this.encode(d[f],b)))}return"{%@}".fmt(e.join(","))
})},array:function(a,c,b){if(b===undefined&&c instanceof Function){b=c;c=a;a=undefined
}c=c.map(function(d){return this.encode(d,b)},this);c="[%@]".fmt(c.join(","));return this.js(a,c)
},object:function(a,b){return this.js(a,b,function(c){return this.constructor.encode(c,this)
})},spaces:function(){var a=this.context?this.context.get("spaces"):"";a=a+"  ";return a
}.property().cacheable(),emit:function(){if(this.invalid){return undefined}var d=[],c=this.attributes,e;
var b=this.get("extendMethodName");var a=this.get("spaces");for(e in c){if(!c.hasOwnProperty(e)){continue
}d.push("%@: %@".fmt(e,c[e]))}if(d.length<=0){return"%@1%@2.%@3({})".fmt(a,this.className,b)
}else{d=d.join(",");return"%@2.%@3({%@4})".fmt(a,this.className,b,d)}},begin:function(c){var a=this.get("encodeMethodName");
if(SC.typeOf(c[a])!==SC.T_FUNCTION){throw SC.$error("Cannot encode %@ because it does not respond to %@()".fmt(c,a))
}this.set("className",SC._object_className(c.constructor));var b=c[a](this);this.invalid=b===NO;
return this},init:function(){arguments.callee.base.apply(this,arguments);this.set("attributes",{})
},destroy:function(){arguments.callee.base.apply(this,arguments);this.context=this.className=this.attributes=null
}});SC.ObjectCoder.encode=function(c,d){var b=this.create({context:d});var a=b.begin(c).emit();
b.destroy();return a};sc_require("coders/object");SC.DesignCoder=SC.ObjectCoder.extend({extendMethodName:"design",encodeMethodName:"encodeDesign"});
SC.View.prototype.encodeDesign=function(a){return this.designer?this.designer.encodeDesign(a):NO
};sc_require("coders/object");SC.LocalizationCoder=SC.ObjectCoder.extend({extendMethodName:"localization",encodeMethodName:"encodeLoc"});
SC.View.prototype.encodeLoc=function(a){return this.designer?this.designer.encodeLoc(a):NO
};SC.PageDesignController=SC.Object.extend({selection:null,select:function(b,c){var a=this.get("selection");
if(!a||!c||!a.contains(b)){a=(!c||!a)?SC.CoreSet.create():a.copy();a.add(b);this.set("selection",a.freeze())
}return this},deselect:function(b){var a=this.get("selection");if(a&&a.contains(b)){a=a.copy();
a.remove(b);this.set("selection",a.freeze())}return this},selectionDidChange:function(){var b=this.get("selection"),a=this._selection;
this._selection=b;if(b){b.setEach("designIsSelected",YES)}if(a){a.forEach(function(c){if(!b||!b.contains(c)){c.set("designIsSelected",NO)
}},this)}}.observes("selection"),repositionSelection:function(a,c){var b=this.get("selection");
if(b){b.invoke("mouseReposition",a,c)}},prepareReposition:function(b){var a=this.get("selection");
if(a){a.invoke("prepareReposition",b)}},designers:null,registerDesigner:function(a){this.get("designers").add(a)
},init:function(){this.designers=SC.Set.create();this.sel=[];arguments.callee.base.apply(this,arguments)
}});SC.CSSStyle=SC.Object.extend({style:"",rule:null});sc_require("css/css_style");
SC.CSSRule=SC.Object.extend({});sc_require("css/css_rule");SC.CSSStyleSheet=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var c=this.styleSheet;if(!c){c=this.styleSheet=document.createElement("style");c.type="text/css";
var b=document.getElementsByTagName("head")[0];if(!b){b=document.documentElement}b.appendChild(c)
}var a=this.constructor.styleSheets;if(!a){a=this.constructor.styleSheets={}}a[SC.guidFor(c)];
var d=c.rules||SC.EMPTY_ARRAY;var e=SC.SparseArray.create(d.length);e.delegate=this;
this.rules=e;return this},isEnabled:function(a,b){if(b!==undefined){this.styleSheet.disabled=!b
}return !this.styleSheet.disabled}.property(),isEnabledBindingDefault:SC.Binding.bool(),styleSheet:null,href:function(a,b){if(b!==undefined){this.styleSheet.href=b
}else{return this.styleSheet.href}}.property(),title:function(a,b){if(b!==undefined){this.styleSheet.title=b
}else{return this.styleSheet.title}}.property(),rules:null,insertRule:function(a){var b=this.get("rules")
},deleteRule:function(a){var b=this.get("rules");b.removeObject(a)},sparseArrayDidRequestIndex:function(d,a){var c=this.styleSheet.rules||SC.EMPTY_ARRAY;
var b=c[a];if(b){d.provideContentAtIndex(a,SC.CSSRule.create({rule:b,styleSheet:this}))
}},sparseArrayDidReplace:function(e,a,d,c){var b=c.collect(function(f){return f.rule
});this.styleSheet.rules.replace(a,d,b)}});SC.mixin(SC.CSSStyleSheet,{find:function(f){var i=f?f.indexOf("/")>=0:NO;
if(!f){return null}if(!i&&f.indexOf(".css")==-1){f=f+".css"}var c=this.styleSheets;
if(!c){c=this.styleSheets={}}var h=document.styleSheets;var j,d,a,e;for(var g=0,b=h.length;
g<b;++g){j=h[g];if(i){if(j.href===f){e=SC.guidFor(j);a=c[e];if(!a){a=c[e]=this.create({styleSheet:j})
}return a}}else{if(d=j.href){d=d.split("/");d=d[d.length-1];if(d==f){e=SC.guidFor(j);
a=c[e];if(!a){a=c[e]=this.create({styleSheet:j})}return a}}}}return null},styleSheets:null});
SC.Page.prototype.emitDesign=function(){this.awake();var a=this.get("pageName");var b=SC.DesignCoder.encode(this);
b=["// SproutCore ViewBuilder Design Format v1.0","// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you","// make to this file will be lost.","","%@ = %@;".fmt(a,b),""].join("\n");
return b};SC.Page.prototype.designController=function(){if(!this._designController){this._designController=SC.PageDesignController.create({page:this})
}return this._designController}.property().cacheable();SC.Page.prototype.emitLocalization=function(c){this.awake();
var a=this.get("pageName");var b=SC.LocalizationCoder.encode(this);b=["// SproutCore ViewBuilder Localization Format v1.0","// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you","// make to this file will be lost.","","%@.loc(%@);".fmt(a,b),""].join("\n");
return b};SC.Page.prototype.encodeDesign=function(d){for(var b in this){var a=this[b];
if(a instanceof SC.View){d.js(b,a.emitDesign())}}d.string("pageName",this.get("pageName"))
};SC.Page.prototype.encodeLoc=function(d){for(var b in this){var a=this[b];if(a instanceof SC.View){d.js(b,a.emitLocalization())
}}};SC.View.prototype.emitDesign=function(){var a=SC.DesignCoder.encode(this);return a
};SC.View.prototype.emitLocalization=function(design){var ret=SC.LocalizationCoder.encode(this);
if(!design){design=this.emitDesign()}var views=eval(design).loc(eval(ret)).create();
var emptyElement=views.computeEmptyElement().replace(/\'/g,"'");views.destroy();ret=ret.replace(/\)$/,", '%@')".fmt(emptyElement));
return ret};SC.Button.Designer={designProperties:"title".w()};SC.ViewDesigner=SC.Object.extend({view:null,viewClass:null,designIsSelected:NO,designIsEnabled:YES,page:function(){var a=this.get("view");
return(a)?a.get("page"):null}.property("view").cacheable(),designController:function(){var a=this.get("page");
return(a)?a.get("designController"):null}.property("page").cacheable(),encodeChildViews:YES,concatenatedProperties:["designProperties","localizedProperties"],canResizeHorizontal:YES,canResizeVertical:YES,canReposition:YES,minWidth:10,minHeight:10,maxWidth:100000000,maxHeight:100000000,layout:function(b,c){var a=this.get("view");
if(!a){return null}if(c!==undefined){a.set("layout",c)}return a.get("layout")}.property("view").cacheable(),anchorLocation:function(j,i){var d=this.get("layout"),f=SC.ViewDesigner,b,k,a,g,l,c,e;
if(!d){return null}if(i!==undefined){e={};g=this.get("view");a=g.get("frame");l=g.get("parentView");
c=l?l.get("frame"):null;if(!c){c=SC.RootResponder.responder.computeWindowSize()}if(i&f.ANCHOR_LEFT){e.left=a.x;
e.width=a.width}else{if(i&f.ANCHOR_RIGHT){e.right=(c.width-SC.maxX(a));e.width=a.width
}else{if(i&f.ANCHOR_CENTERX){e.centerX=Math.round(SC.midX(a)-(c.width/2));e.width=a.width
}else{if(i&f.ANCHOR_WIDTH){e.left=a.x;e.right=(c.width-SC.maxX(a))}}}}if(i&f.ANCHOR_TOP){e.top=a.y;
e.height=a.height}else{if(i&f.ANCHOR_BOTTOM){e.bottom=(c.height-SC.maxY(a));e.height=a.height
}else{if(i&f.ANCHOR_CENTERY){e.centerY=Math.round(SC.midY(a)-(c.height/2));e.height=a.height
}else{if(i&f.ANCHOR_HEIGHT){e.top=a.y;e.bottom=(c.height-SC.maxY(a))}}}}this.set("layout",e);
d=e}if(!SC.none(d.left)){b=SC.none(d.width)?f.ANCHOR_WIDTH:f.ANCHOR_LEFT}else{if(!SC.none(d.right)){b=f.ANCHOR_RIGHT
}else{if(!SC.none(d.centerX)){b=f.ANCHOR_CENTERX}else{b=0}}}if(!SC.none(d.top)){k=SC.none(d.height)?f.ANCHOR_HEIGHT:f.ANCHOR_TOP
}else{if(!SC.none(d.bottom)){k=f.ANCHOR_BOTTOM}else{if(!SC.none(d.centerY)){k=f.ANCHOR_CENTERY
}else{k=0}}}return k|b}.property("layout").cacheable(),_layoutProperty:function(a,c){var b=this.get("layout");
if(!b){return null}if(!SC.none(b)&&(c!==undefined)){b=SC.copy(b);b[a]=c;this.set("layout",b)
}return b[a]},layoutTop:function(a,b){return this._layoutProperty("top",b)}.property("layout").cacheable(),layoutBottom:function(a,b){return this._layoutProperty("bottom",b)
}.property("layout").cacheable(),layoutCenterY:function(a,b){return this._layoutProperty("centerY",b)
}.property("layout").cacheable(),layoutHeight:function(a,b){return this._layoutProperty("height",b)
}.property("layout").cacheable(),layoutTop:function(a,b){return this._layoutProperty("top",b)
}.property("layout").cacheable(),layoutLeft:function(a,b){return this._layoutProperty("left",b)
}.property("layout").cacheable(),layoutRight:function(a,b){return this._layoutProperty("right",b)
}.property("layout").cacheable(),layoutCenterX:function(a,b){return this._layoutProperty("centerX",b)
}.property("layout").cacheable(),layoutWidth:function(a,b){return this._layoutProperty("width",b)
}.property("layout").cacheable(),encodeSimpleProperties:function(c,b){var a=this.get("view"),d=this.get("viewClass").prototype;
c.forEach(function(f){var e=a[f];if(e!==undefined&&(e!==d[f])){b.encode(f,e)}},this)
},designProperties:"layout isVisible isEnabled styleClass".w(),encodeDesign:function(a){a.set("className",SC._object_className(this.get("viewClass")));
this.encodeDesignProperties(a);this.encodeChildViewsDesign(a);return YES},encodeDesignProperties:function(a){return this.encodeSimpleProperties(this.get("designProperties"),a)
},encodeChildViewsDesign:function(b){if(!this.get("encodeChildViews")){return}var a=this.view,c=a.childViews;
if(c.length>0){b.object("childViews",c)}},localizedProperties:[],encodeLoc:function(a){a.set("className",SC._object_className(this.get("viewClass")));
this.encodeLocalizedProperties(a);this.encodeChildViewsLoc(a);return YES},encodeLocalizedProperties:function(a){return this.encodeSimpleProperties(this.get("localizedProperties"),a)
},encodeChildViewsLoc:function(b){if(!this.get("encodeChildViews")){return}var a=this.view,c=a.childViews;
if(c.length>0){b.object("childViews",c)}},awakeDesign:function(){},viewDidChange:function(){var b=this.get("view"),a=this._designer_view;
if(b===a){return}var c=this.viewPropertyDidChange;if(a){a.removeObserver("*",this,c)
}this._designer_view=b;if(b){b.addObserver("*",this,c)}this.viewPropertyDidChange(b,"*",null,null)
}.observes("view"),viewPropertyDidChange:function(a,b){if(b==="*"){this.allPropertiesDidChange()
}else{if(this[b]===undefined){this.notifyPropertyChange(b)}}if((b==="*")||(b==="layout")){if(this.get("designIsSelected")&&this._handles){this._handles.set("layout",SC.clone(a.get("layout")))
}}},unknownProperty:function(a,b){if(b!==undefined){this.view.set(a,b);return b}else{return this.view.get(a)
}},init:function(){this.awakeDesign();arguments.callee.base.apply(this,arguments);
this.viewDidChange();var a=this.get("designController");if(a){a.registerDesigner(this)
}},destroy:function(){arguments.callee.base.apply(this,arguments);this.set("view",null)
},designIsSelectedDidChange:function(){if(SC.kindOf(this.view,SC.Pane)){return this
}var a=this.get("designIsSelected");var b=this._handles;if(a){if(!b){b=this._handles=SC.SelectionHandlesView.create({designer:this})
}var c=this.view.get("parentView");if(!b.get("parentView")!==c){c.appendChild(b)}b.set("layout",this.view.get("layout"))
}else{if(b){if(b.get("parentView")){b.removeFromParent()}}}}.observes("designIsSelected"),tryToPerform:function(c,d,b){var e=this.view?this.view.get("page"):null;
var a=e?e.get("needsDesigner")||e.get("isDesignMode"):NO;if(a){return arguments.callee.base.apply(this,arguments)
}else{return SC.Object.prototype.tryToPerform.apply(this.view,arguments)}},didCreateLayer:function(){},didUpdateLayer:function(){},willDestroyLayer:function(){},HANDLE_MARGIN:5,mouseDown:function(i){if(!this.get("designIsEnabled")){return NO
}var g=this.get("view"),b,f,j,e,a,k,d,h,c;if(!g){return NO}this._mouseDownInfo=b={layout:SC.copy(g.get("layout")),selected:this.get("designIsSelected"),dragged:NO,metaKey:i.metaKey||i.shiftKey,source:this,x:i.pageX,y:i.pageY};
b.hanchor=b.vanchor=b.reposition=NO;e=this.get("canReposition");j=f=NO;if(b.selected){a=g.get("frame");
k=g.get("parentView");if(a&&k){a=k.convertFrameToView(a,null)}d=this.HANDLE_MARGIN;
if(a){if(Math.abs(b.x-SC.minX(a))<=d){j="left"}else{if(Math.abs(b.x-SC.maxX(a))<=d){j="right"
}}if(Math.abs(b.y-SC.minY(a))<=d){f="top"}else{if(Math.abs(b.y-SC.maxY(a))<=d){f="bottom"
}}}h=this.get("canResizeHorizontal");c=this.get("canResizeVertical");if(h&&c){if(!f||!j){f=j=NO
}}else{if(h){f=NO;if(Math.abs(b.y-SC.midY(a))>d){j=NO}}else{if(c){j=NO;if(Math.abs(b.x-SC.midX(a))>d){f=NO
}}else{j=f=NO}}}}if(j){b.hanchor=j}if(f){b.vanchor=f}if(!j&&!f&&e){b.reposition=YES
}if(!b.selected){this.get("designController").select(this,b.metaKey)}if(b.reposition){this.get("designController").prepareReposition(b)
}return YES},prepareReposition:function(c){var a=this.get("view"),b=a?SC.copy(a.get("layout")):{};
c[SC.keyFor("layout",SC.guidFor(this))]=b;return this},mouseDragged:function(b){if(!this.get("designIsEnabled")){return NO
}var d=this._mouseDownInfo,a=this.get("view"),c;if(a&&(d.hanchor||d.vanchor)){c=SC.copy(this.get("layout"));
if(d.hanchor){this._mouseResize(b,d,this.HKEYS,c)}if(d.vanchor){this._mouseResize(b,d,this.VKEYS,c)
}this.set("layout",c)}else{if(d.reposition){this.get("designController").repositionSelection(b,d)
}}},mouseUp:function(c){if(!this.get("designIsEnabled")){return NO}var e=this._mouseDownInfo;
if(e.selected&&!e.dragged){var b=this.get("view"),f=b?b.get("frame"):null,d=b.get("parentView");
if(f&&d){f=d.convertFrameToView(f,null)}if(!f||SC.pointInRect({x:c.pageX,y:c.pageY},f)){var a=this.get("designController");
if(e.metaKey){a.deselect(this)}else{a.select(this,NO)}}}this._mouseDownInfo=null;
return YES},mouseReposition:function(a,c){var b=SC.copy(this.get("layout"));this._mouseReposition(a,c,this.HKEYS,b);
this._mouseReposition(a,c,this.VKEYS,b);this.set("layout",b);return this},HKEYS:{evtPoint:"pageX",point:"x",min:"minWidth",max:"maxWidth",head:"left",tail:"right",center:"centerX",size:"width",anchor:"hanchor"},VKEYS:{evtPoint:"pageY",point:"y",min:"minHeight",max:"maxHeight",head:"top",tail:"bottom",center:"centerY",size:"height",anchor:"vanchor"},_mouseResize:function(j,o,i,r){var q=j[i.evtPoint]-o[i.point],p=o.layout,g=this.get("view"),l=this.get(i.min),m=this.get(i.max),b=i.head,h=i.tail,n=i.center,k=i.size,a=!SC.none(p[i.head]),c=!SC.none(p[i.tail]),e=!SC.none(p[i.center]),d=!SC.none(p[i.size]),f;
if(o[i.anchor]===b){if(a){if(d){f=p[k];r[k]=Math.min(m,Math.max(l,Math.floor(p[k]-q)));
l=(p[b]+f)-l;m=(p[b]+f)-m;r[b]=Math.max(m,Math.min(l,Math.floor(p[b]+q)))}else{r[b]=Math.floor(p[b]+q)
}}else{if(c||e){if(e){q*=2}r[k]=Math.max(l,Math.min(m,Math.floor((p[k]||0)-q)))}else{r[b]=Math.floor((p[b]||0)+q)
}}}else{if(o[i.anchor]===h){if(c){if(d){f=p[k];r[k]=Math.min(m,Math.max(l,Math.floor(p[k]+q)));
l=(p[h]+f)-l;m=(p[h]+f)-m;r[h]=Math.max(m,Math.min(l,Math.floor(p[h]-q)))}else{r[h]=Math.floor(p[h]-q)
}}else{if(e){q*=2}r[k]=Math.max(l,Math.min(m,Math.floor((p[k]||0)+q)))}}}return this
},_mouseReposition:function(o,c,p,j){var n=o[p.evtPoint]-c[p.point],h=c[SC.keyFor("layout",SC.guidFor(this))],k=this.get("view"),m=p.head,f=p.tail,e=p.center,g=p.size,d=!SC.none(h[m]),b=!SC.none(h[f]),a=!SC.none(h[e]),i=!SC.none(h[g]),l;
if(d&&b&&!i){return NO}if(d){j[m]=h[m]+n}else{if(b){j[f]=h[f]-n}else{if(a){j[e]=h[e]+n
}else{j[m]=(h[m]||0)+n}}}return YES}});if(!SC.View.Designer){SC.View.Designer=SC.ViewDesigner
}SC.ViewDesigner.mixin({ANCHOR_LEFT:1,ANCHOR_RIGHT:2,ANCHOR_CENTERX:4,ANCHOR_WIDTH:16,ANCHOR_TOP:256,ANCHOR_BOTTOM:512,ANCHOR_CENTERY:1024,ANCHOR_HEIGHT:4096,didLoadDesign:function(b,a,c){b.isDesign=YES
},didLoadLocalization:function(a,b){},didCreateView:function(a,c){var d=a.get("page"),b=a.constructor;
if(b.isDesign&&d&&d.get("needsDesigner")){var f=b;while(f&&!f.Designer){f=f.superclass
}var e=(f)?f.Designer:SC.View.Designer;while(b&&b.isDesign){b=b.superclass}if(!b){b=SC.View
}a.designer=e.create({view:a,viewClass:b})}}});SC.View.prototype._orig_respondsTo=SC.View.prototype.respondsTo;
SC.View.prototype._orig_tryToPerform=SC.View.prototype.tryToPerform;SC.View.prototype._orig_createLayer=SC.View.prototype.createLayer;
SC.View.prototype._orig_updateLayer=SC.View.prototype.updateLayer;SC.View.prototype._orig_destroyLayer=SC.View.prototype.destroyLayer;
SC.View.prototype.respondsTo=function(a){if(this.designer){var b=!!(SC.typeOf(this[a])===SC.T_FUNCTION);
b=b||this.designer.respondsTo(a);return b}else{return this._orig_respondsTo(a)}};
SC.View.prototype.tryToPerform=function(b,c,a){if(this.designer){return this.designer.tryToPerform(b,c,a)
}else{return this._orig_tryToPerform(b,c,a)}};SC.View.prototype.createLayer=function(){var a=this._orig_createLayer.apply(this,arguments);
if(this.designer){this.designer.didCreateLayer()}return a};SC.View.prototype.updateLayer=function(){var a=this._orig_updateLayer.apply(this,arguments);
if(this.designer){this.designer.didUpdateLayer()}return a};SC.View.prototype.destroyLayer=function(){if(this.designer){this.designer.willDestroyLayer()
}return this._orig_destroyLayer.apply(this,arguments)};sc_require("views/designer");
sc_require("mixins/button");SC.ButtonView.Designer=SC.ViewDesigner.extend(SC.Button.Designer,{encodeChildViews:NO,designProperties:"theme buttonBehavior href".w(),canResizeVertical:NO,canResizeHorizontal:YES});
sc_require("views/designer");SC.LabelView.Designer=SC.ViewDesigner.extend({encodeChildViews:NO,designProperties:"value escapeHTML".w()});
SC.SelectionHandlesView=SC.View.extend({designer:null,classNames:"handles",render:function(e,f){var d=this.get("designer"),b=d?d.get("canResizeVertical"):NO,a=d?d.get("canResizeHorizontal"):NO,c;
if(f||(b!==this._vertical)||(a===this._horizontal)){this._vertical=b;this._horizontal=a;
if(b&&a){c=["top left","top right","bottom left","bottom right"]}else{if(b){c="top bottom".w()
}else{if(a){c="left right".w()}else{c=[]}}}c.forEach(function(g){e.begin("span").classNames(g.w()).addClass("handle").end()
},this)}},mouseDown:function(a){var b=this.designer;return(b&&b.mouseDown)?b.mouseDown(a):null
},mouseUp:function(a){var b=this.designer;return(b&&b.mouseUp)?b.mouseUp(a):null},mouseMoved:function(a){var b=this.designer;
return(b&&b.mouseMoved)?b.mouseMoved(a):null},mouseDragged:function(a){var b=this.designer;
return(b&&b.mouseDragged)?b.mouseDragged(a):null}});sc_require("views/designer");
SC.TabView.Designer=SC.ViewDesigner.extend({encodeChildViews:NO,designProperties:"nowShowing items itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey tabLocation userDefaultKey".w()});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/designer")
};