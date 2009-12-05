SC.stringsFor("English",{});RichText=SC.Object.create({NAMESPACE:"RichText",VERSION:"0.3.1",blank:function(a){return SC.none(a)||a===""
}});RichText.HtmlSanitizer=SC.Object.create({fontSizeNames:function(){var a="xxx-small xx-small x-small small medium large x-large xx-large".w();
if(SC.browser.safari){a.shift();a.push("-webkit-xxx-large")}return a}.property().cacheable(),fontSizePixels:"9 10 13 16 18 24 32 48".w(),formatHTMLOutput:function(j){var k,l,d,b,c,e,g,a,m,i;
j=this.tidyXHTML(j);if(SC.browser.safari){j=j.replace(/(<div>)+/g,"\n");j=j.replace(/(<\/div>)+/g,"");
j=j.replace(/<p>\s*<\/p>/g,"");j=j.replace(/<br \/>(\n)*/g,"\n")}else{if(SC.browser.mozilla){j=j.replace(/<p>/g,"");
j=j.replace(/<\/p>(\n)?/g,"\n");j=j.replace(/<br \/>(\n)*/g,"\n")}else{if(SC.browser.msie||SC.browser.opera){j=j.replace(/<p>(&nbsp;|&#160;|\s)<\/p>/g,"<p></p>");
j=j.replace(/<br \/>/g,"");j=j.replace(/<p>/g,"");j=j.replace(/&nbsp;/g,"");j=j.replace(/<\/p>(\n)?/g,"\n")
}}}j=j.replace(/<b>/g,"<strong>");j=j.replace(/<\/b>/g,"</strong>");j=j.replace(/<i>/g,"<em>");
j=j.replace(/<\/i>/g,"</em>");j=j.replace(/<(strike|s)>/g,"<del>");j=j.replace(/<\/(strike|s)>/g,"</del>");
j=j.replace(/\n\n+/g,"</p>\n\n<p>");j=j.replace(/([^\n])\n([^\n])/,function(p,o,n){return o+"<br />\n"+n
});j="<p>"+j+"</p>";j=j.replace(/<p>\s*/g,"<p>");j=j.replace(/\s*<\/p>/g,"</p>");
var f=SC.$("<div></div>");f.html(j);f.find("ul, ol").each(function(){c=SC.$(this);
e=c.prev()[0];if(e&&e.tagName==="LI"){c.prev().append(this)}});d=f.find("font");for(i=0;
i<d.length;i++){b=d[i];c=SC.$(b);l=SC.$("<span>"+c.html()+"</span>");if(g=c.attr("color")){l.css("color",g)
}if(a=b.style.backgroundColor){l.css("background-color",a)}if(m=c.attr("size")){l.css("font-size",this._fontSizeToPixels(m))
}c.replaceWith(l)}d=f.find("span");for(i=0;i<d.length;i++){b=d[i];c=SC.$(b);g=b.style.color;
a=b.style.backgroundColor;if(g==="transparent"||g==="inherit"){c.css("color","")}if(a==="transparent"||a==="inherit"){c.css("background-color","")
}if(b.style.length===0){c.removeAttr("style")}}if(SC.browser.safari||SC.browser.mozilla){do{k=false;
d=f.find("span");for(i=0;i<d.length;i++){b=d[i];c=SC.$(b);if(c.hasClass("Apple-style-span")){c.removeClass("Apple-style-span");
if(c.attr("class")===""){c.removeAttr("class")}k=true}else{if(b.style.fontWeight==="bold"){c.css({fontWeight:""});
if(b.style.length===0){c.removeAttr("style")}c.html("<strong>"+c.html()+"</strong>");
k=true}else{if(b.style.fontStyle==="italic"){c.css({fontStyle:""});if(b.style.length===0){c.removeAttr("style")
}c.html("<em>"+c.html()+"</em>");k=true}else{if(b.style.textDecoration==="underline"){c.css({textDecoration:""});
if(b.style.length===0){c.removeAttr("style")}c.html("<u>"+c.html()+"</u>");k=true
}else{if(b.style.textDecoration==="line-through"){c.css({textDecoration:""});if(b.style.length===0){c.removeAttr("style")
}c.html("<del>"+c.html()+"</del>");k=true}else{if(m=this._fontNameToPixels(b.style.fontSize)){c.css("font-size",m);
k=true}else{if(b.attributes.length===0){c.replaceWith(c.html());k=true}}}}}}}}}while(k)
}if(SC.browser.safari||SC.browser.msie){do{d=f.find("blockquote");d.each(function(){c=SC.$(this);
c.replaceWith("<div style='margin-left: 40px'>"+c.html()+"</div>")})}while(d.length>0)
}f.find("br").replaceWith("<br />");var h=["BR","IMG"];f.find("*").filter(function(){return SC.$(this).html()===""&&h.indexOf(this.nodeName)===-1&&this.id!=="bookmark"
}).remove();j=f.html();j=this.tidyXHTML(j);j=j.replace(/<br \/>(\n)*/g,"<br />\n");
j=j.replace(/<\/p>\n<p>/g,"</p>\n\n<p>");j=j.replace(/<p>\s*<\/p>/g,"");j=j.replace(/\s*$/g,"");
return j},formatHTMLInput:function(b){var a=SC.$("<div></div>");a.html(b);if(SC.browser.mozilla||SC.browser.safari){a.find("strong").each(function(){SC.$(this).replaceWith('<span style="font-weight: bold;">'+SC.$(this).html()+"</span>")
});a.find("em").each(function(){SC.$(this).replaceWith('<span style="font-style: italic;">'+SC.$(this).html()+"</span>")
});a.find("u").each(function(){SC.$(this).replaceWith('<span style="text-decoration: underline;">'+SC.$(this).html()+"</span>")
});a.find("del").each(function(){SC.$(this).replaceWith('<span style="text-decoration: line-through;">'+SC.$(this).html()+"</span>")
})}if(SC.browser.safari){a.find("span").each(function(){if(this.style.fontWeight==="bold"){SC.$(this).addClass("Apple-style-span")
}if(this.style.fontStyle==="italic"){SC.$(this).addClass("Apple-style-span")}if(this.style.textDecoration==="underline"){SC.$(this).addClass("Apple-style-span")
}})}b=a.html();b=this.tidyXHTML(b);b=b.replace(/<\/p>(\n)*<p>/g,"\n\n");b=b.replace(/(\n)?<br( \/)?>(\n)?/g,"\n");
b=b.replace(/^<p>/g,"");b=b.replace(/<\/p>$/g,"");if(SC.browser.mozilla){b=b.replace(/\n/g,"<br>");
b=b+"<br>"}else{if(SC.browser.safari){b=b.replace(/\n/g,"</div><div>");b="<div>"+b+"</div>";
b=b.replace(/<div><\/div>/g,"<div><br></div>")}else{if(SC.browser.msie||SC.browser.opera){b=b.replace(/\n/g,"</p>\n<p>");
b="<p>"+b+"</p>";b=b.replace(/<p><\/p>/g,"<p>&nbsp;</p>");b=b.replace(/(<p>&nbsp;<\/p>)+$/g,"");
b=b.replace(/<del>/g,"<strike>");b=b.replace(/<\/del>/g,"</strike>")}}}return b},tidyXHTML:function(a){a=a.replace(/\r\n?/,"\n");
a=a.replace(/<([A-Z]+)([^>]*)>/,function(d,c,b){return"<"+c.toLowerCase()+b+">"});
a=a.replace(/<\/([A-Z]+)>/,function(c,b){return"</"+b.toLowerCase()+">"});a=a.replace(/<br>/g,"<br />");
return a},_fontSizeToPixels:function(c){var a=this.get("fontSizePixels"),b=parseInt(c,10);
if(b>=a.length){b=a.length-1}return a[b]+"px"},_fontNameToPixels:function(c){var d=this.get("fontSizeNames"),a=this.get("fontSizePixels"),b;
b=d.indexOf(c);if(b>=0){return a[b]+"px"}else{return null}}});SC.IFrameRootResponder=SC.RootResponder.extend({iframe:null,target:null,setup:function(){var d=this.get("iframe"),c=d.contentWindow,e=c.document;
this.listenFor("keydown keyup mousedown mouseup click dblclick mouseout mouseover mousemove".w(),e).listenFor("resize focus blur".w(),c);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var b=this;e.onkeypress=function(f){f=SC.Event.normalizeEvent(f);
return b.keypress.call(b,f)};SC.Event.add(c,"unload",this,function(){e.onkeypress=null
})}else{SC.Event.add(e,"keypress",this,this.keypress)}}var a=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";
SC.Event.add(e,a,this,this.mousewheel);this.set("currentWindowSize",this.computeWindowSize())
},teardown:function(){SC.Event.remove(iframeDocument);SC.Event.remove(iframeWindow)
},computeWindowSize:function(){var c=this.get("iframe"),a=c.contentWindow,d=a.document,b;
if(a.innerHeight){b={width:a.innerWidth,height:a.innerHeight}}else{if(d.documentElement&&d.documentElement.clientHeight){b={width:d.documentElement.clientWidth,height:d.documentElement.clientHeight}
}else{if(d.body){b={width:d.body.clientWidth,height:d.body.clientHeight}}}}return b
},sendEvent:function(c,a){var d=this.get("target"),b;SC.RunLoop.begin();if(d&&d[c]){d[c](a);
b=d}else{b=null}SC.RunLoop.end();return b},targetViewForEvent:function(){return this.get("target")
}});SC.RootResponder=SC.RootResponder.extend({hasRichTextExtensions:YES,richTextEditorHasFocus:NO,bodyHasFocus:NO,focus:function(){if(!this.get("bodyHasFocus")){this.set("bodyHasFocus",YES)
}return arguments.callee.base.apply(this,arguments)},blur:function(a,b){if(this.get("bodyHasFocus")){this.set("bodyHasFocus",NO)
}if(!this.get("richTextEditorHasFocus")){if(b){arguments.callee.base.apply(this,arguments)
}else{this.invokeLater("blur",1,a,YES)}}return YES}});var escapeHTML=SC.RenderContext.escapeHTML;
function warn(){var a=CoreTest.defaultPlan();return a.warn.apply(a,arguments)}var ReadyCallback=SC.Object.extend({view:null,callback:null,run:function(){var a=this.get("view");
if(a.get("editorIsReady")){ReadyCallback.complete(this);try{if(this.callback){this.callback()
}}catch(b){ok(false,"unexpected error: "+b)}}else{SC.RunLoop.begin();this.invokeLater("run",100);
SC.RunLoop.end()}}});ReadyCallback.mixin({activeRCs:[],run:function(a,c){var b=ReadyCallback.create({view:a,callback:c});
stop();this.activeRCs.push(b);b.run();return b},complete:function(a){this.activeRCs.removeObject(a);
if(this.activeRCs.length===0){start()}}});function createSelection(b,f,d){if(!(SC.browser.mozilla||SC.browser.safari||SC.browser.msie)){warn("Testing selection is not yet supported in this browser");
return}var h=b.$inputWindow().get(0),g=h.document,a=g.body,e,c;if(!f){f=a}if(!d){d={startOffset:0}
}if(SC.browser.mozilla||SC.browser.safari){if(!d.endOffset){d.endOffset=d.startOffset+1
}e=h.getSelection();c=g.createRange();c.setStart(f,d.startOffset);c.setEnd(f,d.endOffset);
e.addRange(c)}else{if(SC.browser.msie){while(f.nodeType!=1){f=f.parentNode}h.focus();
c=a.createTextRange();c.moveToElementText(f);c.moveStart("character",d.startOffset);
if(d.endOffset){c.collapse();c.moveEnd("character",d.endOffset-d.startOffset)}c.select()
}}b.mouseUp()}SC.InlineTextFieldView=SC.InlineTextFieldView.extend({willRemoveFromParent:function(){if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}},willLoseFirstResponder:function(a){if(a!==this){return}this._previousFirstResponder=null;
if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}return this.blurEditor()}});RichText.EditorView=SC.FieldView.extend({iframeRootResponder:null,value:null,classNames:["rich-text-editor-view","sc-text-field-view","text-area"],editorIsReady:NO,selection:"",selectionElement:null,cursorPos:null,stylesheets:[],loadStylesheetsInline:NO,displayProperties:"fieldValue isEditing".w(),$input:function(){return this.$("iframe")
},$inputWindow:function(){return this.$input().map(function(){return this.contentWindow
})},$inputDocument:function(){return this.$inputWindow().map(function(){return this.document
})},$inputBody:function(){return this.$inputDocument().map(function(){return this.body
})},fieldValue:function(){return RichText.HtmlSanitizer.formatHTMLInput(arguments.callee.base.apply(this,arguments))
}.property("value","validator").cacheable(),setFieldValue:function(a){if(this.get("editorIsReady")){this.$inputBody().html(a)
}return this},getFieldValue:function(){return this.get("editorIsReady")?this.$inputBody().html():null
},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
b=RichText.HtmlSanitizer.formatHTMLOutput(b);this._skipSetFieldValue=YES;SC.RunLoop.begin();
this.setIfChanged("value",b);SC.RunLoop.end();this._skipSetFieldValue=NO},_field_valueDidChange:function(){if(!this._skipSetFieldValue){this.setFieldValue(this.get("fieldValue"))
}}.observes("value"),render:function(c,d){arguments.callee.base.apply(this,arguments);
var b=SC.guidFor(this);var a=this.get("fieldValue");if(SC.none(a)){a=""}c.setClass("not-empty",a.length>0);
this._renderField(c,d,a)},_renderField:function(b,d,c){if(d){var a=SC.guidFor(this);
b.push('<span class="border"></span>');b.push('<iframe name="%@"></iframe></span>'.fmt(a))
}},didCreateLayer:function(){SC.Event.add(this.$input(),"load",this,this._field_checkIFrameDidLoad)
},_field_checkIFrameDidLoad:function(){var a=this.$input().get(0);if(a.contentWindow&&a.contentWindow.document){this.iframeDidLoad()
}else{this.invokeLater("_field_checkIFrameDidLoad",500)}},iframeDidLoad:function(){if(!this.get("editorIsReady")){if(this.get("loadStylesheetsInline")){this._loadStylesheets()
}else{this._setupEditor()}}},_loadStylesheets:function(){var b=this.get("stylesheets"),a;
this._pendingStylesheets=b.length;for(idx=0;idx<b.length;idx++){a=b[idx];if(RichText.EditorView.loadedStylesheets[a]){this._stylesheetDidLoad(a)
}else{RichText.EditorView.loadStylesheet(a,this,"_stylesheetDidLoad")}}},_stylesheetDidLoad:function(a){this._pendingStylesheets-=1;
if(this._pendingStylesheets<=0){this._setupEditor()}},_writeDocument:function(b){if(!b){b=""
}var a=this.$inputDocument().get(0);a.open("text/html","replace");a.write("<html><head>%@</head><body></body></html>".fmt(b));
if(!SC.browser.msie){a.close()}},_setupEditor:function(){if(this.get("editorIsReady")){return
}var g=this.$inputDocument(),e=g.get(0),b=(SC.browser.msie)?this.$input():g,h=this.get("stylesheets"),d,f="",c,a;
if(this.get("loadStylesheetsInline")){f+="<style type='text/css'>\n";for(a=0;a<h.length;
a++){d=h[a];f+="/* BEGIN %@ */\n\n".fmt(d);f+=RichText.EditorView.loadedStylesheets[d];
f+="/* END %@ */\n\n".fmt(d)}f+="</style>\n"}else{for(a=0;a<h.length;a++){f+='<link rel="stylesheet" href="%@" type="text/css" charset="utf-8">\n'.fmt(h[a])
}}this._writeDocument(f);if(e.body.contentEditable){e.body.contentEditable=true}else{e.designMode="On"
}this.set("editorIsReady",YES);this.setFieldValue(this.get("fieldValue"));c=SC.IFrameRootResponder.create({iframe:this.$input().get(0),target:this});
c.setup();this.set("iframeRootResponder",c);SC.Event.add(g,"paste",this,this.pasteCaught);
SC.Event.add(b,"focus",this,this._field_fieldDidFocus);SC.Event.add(g,"blur",this,this._field_fieldDidBlur)
},willDestroyLayer:function(){var c=this.$inputDocument(),a=(SC.browser.msie)?this.$input():c,b=this.get("iframeRootResponder");
b.teardown();this.set("iframeRootResponder",null);SC.Event.remove(c,"blur",this,this._field_fieldDidBlur);
SC.Event.remove(a,"focus",this,this._field_fieldDidFocus);SC.Event.remove(c,"paste",this,this.pasteCaught);
SC.Event.remove(this.$input(),"load",this,this._field_checkIFrameDidLoad)},keyUp:function(a){this.querySelection();
this.queryCursorPos();this._field_fieldValueDidChange(a)},mouseUp:function(a){this.querySelection();
this.queryCursorPos()},pasteCaught:function(a){this.querySelection();this.queryCursorPos();
this._field_fieldValueDidChange(a)},_loseBlur:function(){if(this._isFocused){this._isFocused=NO;
SC.RootResponder.responder.set("richTextEditorHasFocus",NO)}},_field_fieldDidFocus:function(){this.becomeFirstResponder()
},_field_fieldDidBlur:function(){this._loseBlur()},willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){SC.RootResponder.responder.set("richTextEditorHasFocus",YES);
this.$inputWindow().get(0).focus()}}},willLoseKeyResponderTo:function(a){this._loseBlur()
},changedSelection:function(){this.querySelection();this._field_fieldValueDidChange()
},querySelection:function(){if(SC.browser.msie){var c=this.$inputDocument().get(0).selection.createRange(),g=c.text,d;
if(SC.none(g)){g=""}d=c.parentElement()}else{var g=this.$inputWindow().get(0).getSelection(),b=g.getRangeAt(0),h=b.commonAncestorContainer,i=h.childNodes,e=[],a,f;
for(f=0;f<i.length;f++){a=i[f];if(g.containsNode(a,true)&&!(a.nodeType===3&&a.length===0)){e.push(a)
}}if(e.length===1&&e[0].nodeType===1){d=e[0]}else{d=h}while(d&&d.nodeType!==1){d=d.parentNode
}}this.propertyWillChange("selection");this.propertyWillChange("selectionElement");
this.set("selection",g.toString());this.set("selectionElement",d);this.propertyDidChange("selection");
this.propertyDidChange("selectionElement")},queryCursorPos:function(){var a=this.$inputWindow().get(0),f=this.$inputDocument().get(0),g;
if(a.getSelection){var d=a.getSelection(),c=d.anchorNode,e=d.anchorOffset;if(c.nodeType===1){c=c.childNodes[e];
e=0}g=c?(this._anchorNodeOffset(c)+e):null}else{if(f.selection){var b=f.selection.createRange();
b.moveStart("sentence",-1000000);g=b.text.length}}this.setIfChanged("cursorPos",g)
},_anchorNodeOffset:function(b){if(b===this.$inputBody().get(0)){return 0}var d=this._anchorNodeOffset(b.parentNode),c=b.parentNode.childNodes,e;
for(var a=0;a<c.length;a++){e=c[a];if(e===b){return d}else{d+=this._nodeLength(e)
}}throw"couldn't find node"},_nodeLength:function(c){if(c.nodeType===1){var b=0,d,a;
if(c.childNodes.length===0){return 1}else{for(a=0;a<c.childNodes.length;a++){d=c.childNodes[a];
b+=this._nodeLength(d)}}return b}else{if(c.nodeType===3){return c.length}else{return 0
}}},_standardizeColor:function(f){var k;if(!f||f.match(/[0-9a-f]{6}/i)){return f}var d=f.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(d){var i=d[2].split(/\s*,\s*/),e=i.length,q=d[1];if((q=="rgb"&&e==3)||(q=="rgba"&&e==4)){var b=i[0];
if(b.charAt(b.length-1)=="%"){var j=[];for(k=0;k<i.length;k++){j.push(parseFloat(i[k])*2.56)
}if(e==4){j[3]=i[3]}return this._colorFromArray(j)}return this._colorFromArray(i)
}if((q=="hsl"&&e==3)||(q=="hsla"&&e==4)){var n=((parseFloat(i[0])%360)+360)%360/360,g=parseFloat(i[1])/100,h=parseFloat(i[2])/100,o=h<=0.5?h*(g+1):h+g-h*g,p=2*h-o,j=[this._hue2rgb(p,o,n+1/3)*256,this._hue2rgb(p,o,n)*256,this._hue2rgb(p,o,n-1/3)*256,1];
if(e==4){j[3]=i[3]}return this._colorFromArray(j)}}return null},_colorFromArray:function(d){var c=[],b;
if(d[3]===0||d[3]==="0"){return null}for(b=0;b<3&&b<d.length;b++){var e=parseInt(d[b],10).toString(16);
c.push(e.length<2?"0"+e:e)}return"#"+c.join("")},_hue2rgb:function(b,a,c){if(c<0){++c
}if(c>1){--c}var d=6*c;if(d<1){return b+(a-b)*d}if(2*c<1){return a}if(3*c<2){return b+(a-b)*(2/3-c)*6
}return b},fontSizeNames:function(){var a="xxx-small xx-small x-small small medium large x-large xx-large".w();
if(SC.browser.safari){a.shift();a.push("-webkit-xxx-large")}return a}.property().cacheable(),fontSizePixels:"9 10 13 16 18 24 32 48".w(),_standardizeFontSize:function(f){var c,d;
if(d=f.match(/^(\d+)px$/)){var b=this.get("fontSizePixels"),e=parseInt(d[1],10),a;
c=0;for(a=0;a<b.length;a++){if(e>b[a]){c=a+1}else{break}}return c}else{c=this.get("fontSizeNames").indexOf(f);
if(c>=0){return c}}return parseInt(f,10)},getStyle:function(h,c,d){var m=this.$inputWindow().get(0),n,b=h.style;
function j(i){if(!SC.browser.safari){return false}var a=m.getComputedStyle(i,null);
return !a||a.getPropertyValue("color")==""}if(c=="opacity"&&SC.browser.msie){n=SC.$.attr(b,"opacity");
return n==""?"1":n}if(SC.browser.opera&&c=="display"){var o=b.outline;b.outline="0 solid black";
b.outline=o}if(c.match(/float/i)){c=styleFloat}if(!d&&b&&b[c]){n=b[c]}else{if(m.getComputedStyle){if(c.match(/float/i)){c="float"
}c=c.replace(/([A-Z])/g,"-$1").toLowerCase();var p=m.getComputedStyle(h,null);if(p&&!j(h)){n=p.getPropertyValue(c)
}else{var g=[],q=[],r=h,k=0;for(;r&&j(r);r=r.parentNode){q.unshift(r)}for(;k<q.length;
k++){if(j(q[k])){g[k]=q[k].style.display;q[k].style.display="block"}}n=c=="display"&&g[q.length-1]!=null?"none":(p&&p.getPropertyValue(c))||"";
for(k=0;k<g.length;k++){if(g[k]!=null){q[k].style.display=g[k]}}}if(c=="opacity"&&n==""){n="1"
}}else{if(h.currentStyle){var f=c.replace(/\-(\w)/g,function(a,i){return i.toUpperCase()
});n=h.currentStyle[c]||h.currentStyle[f];if(!(/^\d+(px)?$/i).test(n)&&(/^\d/).test(n)){var e=b.left,l=h.runtimeStyle.left;
h.runtimeStyle.left=h.currentStyle.left;b.left=n||0;n=b.pixelLeft+"px";b.left=e;h.runtimeStyle.left=l
}}}}return n},getSelectionStyle:function(a,c){var b=this.get("selectionElement");
return b?this.getStyle(b,a,c):null},defaultColor:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputBody().get(0);return this._standardizeColor(this.getStyle(a,"color"))
}.property("editorIsReady").cacheable(),defaultBackgroundColor:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputBody().get(0);return this._standardizeColor(this.getStyle(a,"background-color"))
}.property("editorIsReady").cacheable(),defaultFontSize:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputBody().get(0);return this._standardizeFontSize(this.getStyle(a,"font-size"))
}.property("editorIsReady").cacheable(),_basicSelectionModifier:function(c,b,d){if(!this.get("editorIsReady")){return false
}if(d!==undefined){this.propertyWillChange(c);var a=this.iframeExecCommand(b,false,d);
this.propertyDidChange(c);if(a){this.changedSelection()}}return this.iframeQueryState(b)
},selectionColor:function(b,c){if(!this.get("editorIsReady")){return null}if(c!==undefined){this.propertyWillChange("selectionColor");
var a=this.iframeExecCommand("forecolor",false,c);this.propertyDidChange("selectionColor");
if(a){this.changedSelection()}}return this._standardizeColor(this.getSelectionStyle("color"))
}.property("selectionElement").cacheable(),selectionBackgroundColor:function(c,d){if(!this.get("editorIsReady")){return null
}var b=SC.browser.mozilla?"hilitecolor":"backcolor";if(d!==undefined){this.propertyWillChange("selectionBackgroundColor");
var a=this.iframeExecCommand(b,false,d);this.propertyDidChange("selectionBackgroundColor");
if(a){this.changedSelection()}}return this._standardizeColor(this.getSelectionStyle("background-color"))
}.property("selectionElement").cacheable(),selectionFontSize:function(b,c){if(!this.get("editorIsReady")){return null
}if(c!==undefined){this.propertyWillChange("selectionFontSize");var a=this.iframeExecCommand("fontsize",false,c);
this.propertyDidChange("selectionFontSize");if(a){this.changedSelection()}}return this._standardizeFontSize(this.getSelectionStyle("font-size"))
}.property("selectionElement").cacheable(),selectionIsBold:function(a,b){return this._basicSelectionModifier("selectionIsBold","bold",b)
}.property("selection").cacheable(),selectionIsUnderlined:function(a,b){return this._basicSelectionModifier("selectionIsUnderlined","underline",b)
}.property("selection").cacheable(),selectionIsItalicized:function(a,b){return this._basicSelectionModifier("selectionIsItalicized","italic",b)
}.property("selection").cacheable(),selectionIsStrikethrough:function(a,b){return this._basicSelectionModifier("selectionIsStrikethrough","strikethrough",b)
}.property("selection").cacheable(),selectionIsLeftAligned:function(a,b){return this._basicSelectionModifier("selectionIsLeftAligned","justifyleft",b)
}.property("selection").cacheable(),selectionIsJustified:function(a,b){return this._basicSelectionModifier("selectionIsJustified","justifyfull",b)
}.property("selection").cacheable(),selectionIsCentered:function(a,b){return this._basicSelectionModifier("selectionIsCentered","justifycenter",b)
}.property("selection").cacheable(),selectionIsRightAligned:function(a,b){return this._basicSelectionModifier("selectionIsRightAligned","justifyright",b)
}.property("selection").cacheable(),selectionIsDefaultColor:function(b,d){var c,a;
if(d===YES){this.set("selectionColor","inherit");this.set("selectionBackgroundColor","transparent")
}c=this.get("selectionColor");a=this.get("selectionBackgroundColor");return(RichText.blank(c)||c===this.get("defaultColor"))&&(RichText.blank(a)||a===this.get("defaultBackgroundColor"))
}.property("selectionColor","selectionBackgroundColor").cacheable(),selectionIsHighlighted:function(a,c){var b;
if(c!==undefined){c=(c)?"#ffff00":null;this.set("selectionColor",c)}b=this.get("selectionColor");
return !RichText.blank(b)&&b!==this.get("defaultColor")}.property("selectionColor").cacheable(),selectionIsBackgroundHighlighted:function(b,c){var a;
if(c!==undefined){c=(c)?"#ffff00":null;this.set("selectionBackgroundColor",c)}a=this.get("selectionBackgroundColor");
return !RichText.blank(a)&&a!==this.get("defaultBackgroundColor")}.property("selectionBackgroundColor").cacheable(),selectionIsDefaultSize:function(a,d){var b,c=this.get("defaultFontSize");
if(d===YES){this.set("selectionFontSize",c)}b=this.get("selectionFontSize");return RichText.blank(b)||b===c
}.property("selectionFontSize").cacheable(),selectionIsSizeIncreased:function(){var a=this.get("selectionFontSize");
return !RichText.blank(a)&&a>this.get("defaultFontSize")}.property("selectionFontSize").cacheable(),selectionIsSizeDecreased:function(){var a=this.get("selectionFontSize");
return !RichText.blank(a)&&a<this.get("defaultFontSize")}.property("selectionFontSize").cacheable(),selectionIsSuperscript:function(a,b){return this._basicSelectionModifier("selectionIsSuperscript","superscript",b)
}.property("selection").cacheable(),selectionIsSubscript:function(a,b){return this._basicSelectionModifier("selectionIsSubscript","subscript",b)
}.property("selection").cacheable(),selectionIsOrderedList:function(a,b){return this._basicSelectionModifier("selectionIsOrderedList","insertorderedlist",b)
}.property("selection").cacheable(),selectionIsUnorderedList:function(a,b){return this._basicSelectionModifier("selectionIsUnorderedList","insertunorderedlist",b)
}.property("selection").cacheable(),undoAllowed:function(){return this.iframeQueryEnabled("undo")
}.property("selection").cacheable(),redoAllowed:function(){return this.iframeQueryEnabled("redo")
}.property("selection").cacheable(),selectionIncreaseSize:function(){var a=this.get("selectionFontSize");
this.set("selectionFontSize",a+1)},selectionDecreaseSize:function(){var a=this.get("selectionFontSize");
this.set("selectionFontSize",a-1)},selectionIndent:function(){this.iframeExecCommand("indent",false,YES);
this.changedSelection()},selectionOutdent:function(){this.iframeExecCommand("outdent",false,YES);
this.changedSelection()},selectionRemoveFormatting:function(){this.iframeExecCommand("removeformat",false,YES);
this.changedSelection()},undoChange:function(){this.iframeExecCommand("undo",false,YES);
this.changedSelection()},redoChange:function(){this.iframeExecCommand("redo",false,YES);
this.changedSelection()},iframeExecCommand:function(){var a=this.$inputDocument().get(0);
return a.execCommand.apply(a,arguments)},iframeQueryState:function(){var a=this.$inputDocument().get(0);
return a.queryCommandState.apply(a,arguments)},iframeQueryEnabled:function(){var a=this.$inputDocument().get(0);
return a.queryCommandEnabled.apply(a,arguments)}});RichText.EditorView.mixin({loadedStylesheets:{},pendingStylesheets:[],stylesheetObservers:{},stylesheetIsLoaded:function(a){return !!this.loadedStylesheets[a]
},stylesheetIsLoading:function(a){return this.pendingStylesheets.indexOf(a)!==-1},loadStylesheet:function(a,b,c){if(b&&c){this.addStylesheetObserver(a,b,c)
}if(!this.stylesheetIsLoaded(a)&&!this.stylesheetIsLoading(a)){this.pendingStylesheets.push(a);
return SC.Request.getUrl(a).notify(this,this._stylesheetDidLoad,{url:a}).send()}},addStylesheetObserver:function(a,b,d){var c=this.stylesheetObservers;
if(!c[a]){c[a]=[]}c[a].push({target:b,method:d});return YES},_stylesheetDidLoad:function(e,g){var c=e.get("response"),d=g.url,f,b,a;
this.loadedStylesheets[d]=c;this.pendingStylesheets.removeObject(d);this._notifyLoad(d)
},_notifyLoad:function(b){var c,a;c=this.stylesheetObservers[b];if(c){for(idx=0;idx<c.length;
idx++){a=c[idx];a.target[a.method](b)}}}});SC.TextFieldView=SC.TextFieldView.extend({didLoseKeyResponderTo:function(a){if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}}});RichText.ToolbarButtonView=SC.ButtonView.extend({buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,titleMinWidth:0});
sc_require("views/toolbar_button");RichText.ToolbarView=SC.View.extend({classNames:"rich-text-toolbar-view",childViews:("strikethroughButton boldButton underlineButton italicsButton leftAlignButton justifyButton centerButton rightAlignButton defaultColorButton hightlightButton highlightBackgroundButton increaseSizeButton decreaseSizeButton resetSizeButton superscriptButton subscriptButton indentButton outdentButton orderedListButton unorderedListButton removeFormattingButton undoButton redoButton").w(),editor:null,layout:{top:0,left:0,right:0,bottom:SC.LAYOUT_AUTO},strikethroughButton:RichText.ToolbarButtonView.extend({title:"S",valueBinding:".parentView.editor.selectionIsStrikethrough"}),boldButton:RichText.ToolbarButtonView.extend({title:"B",valueBinding:".parentView.editor.selectionIsBold"}),underlineButton:RichText.ToolbarButtonView.extend({title:"U",valueBinding:".parentView.editor.selectionIsUnderlined"}),italicsButton:RichText.ToolbarButtonView.extend({title:"I",valueBinding:".parentView.editor.selectionIsItalicized"}),leftAlignButton:RichText.ToolbarButtonView.extend({title:"Left",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsLeftAligned"}),justifyButton:RichText.ToolbarButtonView.extend({title:"Justified",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsJustified"}),centerButton:RichText.ToolbarButtonView.extend({title:"Center",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsCentered"}),rightAlignButton:RichText.ToolbarButtonView.extend({title:"Right",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsRightAligned"}),defaultColorButton:RichText.ToolbarButtonView.extend({title:"Default Color",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsDefaultColor"}),hightlightButton:RichText.ToolbarButtonView.extend({title:"Highlight",valueBinding:".parentView.editor.selectionIsHighlighted"}),highlightBackgroundButton:RichText.ToolbarButtonView.extend({title:"Highlight BG",valueBinding:".parentView.editor.selectionIsBackgroundHighlighted"}),highlightBackgroundButton:RichText.ToolbarButtonView.extend({title:"Highlight BG",valueBinding:".parentView.editor.selectionIsBackgroundHighlighted"}),increaseSizeButton:RichText.ToolbarButtonView.extend({title:"+",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"selectionIncreaseSize",valueBinding:".parentView.editor.selectionIsSizeIncreased"}),decreaseSizeButton:RichText.ToolbarButtonView.extend({title:"-",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"selectionDecreaseSize",valueBinding:".parentView.editor.selectionIsSizeDecreased"}),resetSizeButton:RichText.ToolbarButtonView.extend({title:"+-",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:".parentView.editor.selectionIsDefaultSize"}),superscriptButton:RichText.ToolbarButtonView.extend({title:"Super",valueBinding:".parentView.editor.selectionIsSuperscript"}),subscriptButton:RichText.ToolbarButtonView.extend({title:"Sub",valueBinding:".parentView.editor.selectionIsSubscript"}),indentButton:RichText.ToolbarButtonView.extend({title:"Indent",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"selectionIndent"}),outdentButton:RichText.ToolbarButtonView.extend({title:"Outdent",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"selectionOutdent"}),orderedListButton:RichText.ToolbarButtonView.extend({title:"OL",valueBinding:".parentView.editor.selectionIsOrderedList"}),unorderedListButton:RichText.ToolbarButtonView.extend({title:"UL",valueBinding:".parentView.editor.selectionIsUnorderedList"}),removeFormattingButton:RichText.ToolbarButtonView.extend({title:"Remove",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"selectionRemoveFormatting"}),undoButton:RichText.ToolbarButtonView.extend({title:"Undo",isEnabledBinding:".parentView.editor.undoAllowed",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"undoChange"}),redoButton:RichText.ToolbarButtonView.extend({title:"Redo",isEnabledBinding:".parentView.editor.redoAllowed",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:".parentView.editor",action:"redoChange"})});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("rich_text")
};