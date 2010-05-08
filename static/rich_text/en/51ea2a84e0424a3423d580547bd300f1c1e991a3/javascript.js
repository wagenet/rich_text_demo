SC.stringsFor("English",{});RichText=SC.Object.create({NAMESPACE:"RichText",VERSION:"0.3.3",blank:function(a){return SC.none(a)||a===""
}});RichText.FormattedText=SC.Object.extend({value:"",cleanedText:function(){return RichText.HtmlSanitizer.formatHTMLOutput(this.get("value"))
}.property("value").cacheable(),toString:function(){return this.get("cleanedText")
},toJSON:function(){return this.get("cleanedText")}});SC.RecordAttribute.registerTransform(RichText.FormattedText,{to:function(b,a){if(SC.none(b)||SC.instanceOf(b,RichText.FormattedText)){return b
}else{return RichText.FormattedText.create({value:b})}},from:function(b,a){return b
}});RichText.HtmlSanitizer={fontSizeNames:function(){var a="xxx-small xx-small x-small small medium large x-large xx-large".w();
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
}c.html("<em>"+c.html()+"</em>");k=true}else{if(b.style.textDecoration.match("underline")){c.css({textDecoration:b.style.textDecoration.replace("underline","").trim()});
if(b.style.length===0){c.removeAttr("style")}c.html("<u>"+c.html()+"</u>");k=true
}else{if(b.style.textDecoration.match("line-through")){c.css({textDecoration:b.style.textDecoration.replace("line-through","").trim()});
if(b.style.length===0){c.removeAttr("style")}c.html("<del>"+c.html()+"</del>");k=true
}else{if(m=this._fontNameToPixels(b.style.fontSize)){c.css("font-size",m);k=true}else{if(b.attributes.length===0){c.replaceWith(c.html());
k=true}}}}}}}}}while(k)}if(SC.browser.safari||SC.browser.msie){do{d=f.find("blockquote");
d.each(function(){c=SC.$(this);c.replaceWith("<div style='margin-left: 40px'>"+c.html()+"</div>")
})}while(d.length>0)}f.find("br").replaceWith("<br />");var h=["BR","IMG"];f.find("*").filter(function(){return SC.$(this).html()===""&&h.indexOf(this.nodeName)===-1&&this.id!=="bookmark"
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
return a},standardizeColor:function(f){var k;if(!f||f.match(/[0-9a-f]{6}/i)){return f
}var d=f.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);if(d){var i=d[2].split(/\s*,\s*/),e=i.length,q=d[1];
if((q=="rgb"&&e==3)||(q=="rgba"&&e==4)){var b=i[0];if(b.charAt(b.length-1)=="%"){var j=[];
for(k=0;k<i.length;k++){j.push(parseFloat(i[k])*2.56)}if(e==4){j[3]=i[3]}return this._colorFromArray(j)
}return this._colorFromArray(i)}if((q=="hsl"&&e==3)||(q=="hsla"&&e==4)){var n=((parseFloat(i[0])%360)+360)%360/360,g=parseFloat(i[1])/100,h=parseFloat(i[2])/100,o=h<=0.5?h*(g+1):h+g-h*g,p=2*h-o,j=[this._hue2rgb(p,o,n+1/3)*256,this._hue2rgb(p,o,n)*256,this._hue2rgb(p,o,n-1/3)*256,1];
if(e==4){j[3]=i[3]}return this._colorFromArray(j)}}return null},_colorFromArray:function(d){var c=[],b;
if(d[3]===0||d[3]==="0"){return null}for(b=0;b<3&&b<d.length;b++){var e=parseInt(d[b],10).toString(16);
c.push(e.length<2?"0"+e:e)}return"#"+c.join("")},_hue2rgb:function(b,a,c){if(c<0){++c
}if(c>1){--c}var d=6*c;if(d<1){return b+(a-b)*d}if(2*c<1){return a}if(3*c<2){return b+(a-b)*(2/3-c)*6
}return b},standardizeFontSize:function(f){var c,d;if(d=f.match(/^(\d+)px$/)){var b=this.fontSizePixels,e=parseInt(d[1],10),a;
c=0;for(a=0;a<b.length;a++){if(e>b[a]){c=a+1}else{break}}return c}else{c=this.fontSizeNames().indexOf(f);
if(c>=0){return c}}return parseInt(f,10)},_fontSizeToPixels:function(c){var a=this.fontSizePixels,b=parseInt(c,10);
if(b>=a.length){b=a.length-1}return a[b]+"px"},_fontNameToPixels:function(c){var d=this.fontSizeNames(),a=this.fontSizePixels,b;
b=d.indexOf(c);if(b>=0){return a[b]+"px"}else{return null}}};SC.IFrameRootResponder=SC.RootResponder.extend({iframe:null,target:null,setup:function(){var d=this.get("iframe"),c=d.contentWindow,e=c.document;
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
if(this.activeRCs.length===0){start()}}});MockEvent=function(){};MockEvent.prototype.allowDefault=function(){};
function createSelection(b,f,d){if(!(SC.browser.mozilla||SC.browser.safari||SC.browser.msie)){warn("Testing selection is not yet supported in this browser");
return}var h=b.$inputWindow().get(0),g=h.document,a=g.body,e,c;if(!f){f=a}if(!d){d={startOffset:0}
}if(SC.browser.mozilla||SC.browser.safari){if(!d.endOffset){d.endOffset=d.startOffset+1
}e=h.getSelection();c=g.createRange();c.setStart(f,d.startOffset);c.setEnd(f,d.endOffset);
e.addRange(c)}else{if(SC.browser.msie){while(f.nodeType!=1){f=f.parentNode}h.focus();
c=a.createTextRange();c.moveToElementText(f);c.moveStart("character",d.startOffset);
if(d.endOffset){c.collapse();c.moveEnd("character",d.endOffset-d.startOffset)}c.select()
}}b.mouseUp(new MockEvent)}SC.InlineTextFieldView=SC.InlineTextFieldView.extend({willRemoveFromParent:function(){if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}},willLoseFirstResponder:function(a){if(a!==this){return}this._previousFirstResponder=null;
if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}return this.blurEditor()}});RichText.RichTextSelection=SC.Object.extend({editor:null,text:function(){return this.getPath("editor.selectionText")
}.property(),element:function(){return this.getPath("editor.selectionElement")}.property(),concatenatedProperties:["updateProperties"],updateProperties:("isBold isUnderlined isItalicized isStrikethrough isLeftAligned isJustified isCentered isRightAligned color backgroundColor fontSize isSubscript isSubscript isOrderedList isUnorderedList").w(),length:function(){var a=this.get("text");
return a?a.length:0}.property("text").cacheable(),color:function(b,d){var c=this.get("editor");
if(!c||!c.get("editorIsReady")){return null}if(d!==undefined){this.propertyWillChange("color");
var a=c.iframeExecCommand("forecolor",false,d);this.propertyDidChange("color");if(a){c.changedSelection()
}}return RichText.HtmlSanitizer.standardizeColor(this.getStyle("color"))}.property().cacheable(),backgroundColor:function(c,e){var d=this.get("editor");
if(!d||!d.get("editorIsReady")){return null}var b=SC.browser.mozilla?"hilitecolor":"backcolor";
if(e!==undefined){this.propertyWillChange("backgroundColor");var a=d.iframeExecCommand(b,false,e);
this.propertyDidChange("backgroundColor");if(a){d.changedSelection()}}return RichText.HtmlSanitizer.standardizeColor(this.getStyle("background-color"))
}.property().cacheable(),fontSize:function(b,e){var c=this.get("editor");if(!c||!c.get("editorIsReady")){return null
}if(e!==undefined){this.propertyWillChange("fontSize");var a=c.iframeExecCommand("fontsize",false,e);
this.propertyDidChange("fontSize");if(a){c.changedSelection()}}var d=this.getStyle("font-size");
return d&&RichText.HtmlSanitizer.standardizeFontSize(d)}.property().cacheable(),isBold:function(a,b){return this._basicSelectionModifier("isBold","bold",b)
}.property().cacheable(),isUnderlined:function(a,b){return this._basicSelectionModifier("isUnderlined","underline",b)
}.property().cacheable(),isItalicized:function(a,b){return this._basicSelectionModifier("isItalicized","italic",b)
}.property().cacheable(),isStrikethrough:function(a,b){return this._basicSelectionModifier("isStrikethrough","strikethrough",b)
}.property().cacheable(),isLeftAligned:function(b,c){var a=this._basicSelectionModifier("isLeftAligned","justifyleft",c);
return SC.browser.safari?(this.getStyle("text-align")=="left"):a}.property().cacheable(),isJustified:function(b,c){var a=this._basicSelectionModifier("isJustified","justifyfull",c);
return SC.browser.safari?(this.getStyle("text-align")=="justify"):a}.property().cacheable(),isCentered:function(b,c){var a=this._basicSelectionModifier("isCentered","justifycenter",c);
return SC.browser.safari?(this.getStyle("text-align")=="center"):a}.property().cacheable(),isRightAligned:function(b,c){var a=this._basicSelectionModifier("isRightAligned","justifyright",c);
return SC.browser.safari?(this.getStyle("text-align")=="right"):a}.property().cacheable(),isDefaultColor:function(c,d){var b,a;
if(d===YES){this.set("color","inherit");this.set("backgroundColor","transparent")
}b=this.get("color");a=this.get("backgroundColor");return(RichText.blank(b)||b===this.getPath("editor.defaultColor"))&&(RichText.blank(a)||a===this.getPath("editor.defaultBackgroundColor"))
}.property("color","backgroundColor").cacheable(),isHighlighted:function(b,c){var a;
if(c!==undefined){c=(c)?"#ffff00":null;this.set("color",c)}a=this.get("color");return !RichText.blank(a)&&a!==this.getPath("editor.defaultColor")
}.property("color").cacheable(),isBackgroundHighlighted:function(b,c){var a;if(c!==undefined){c=(c)?"#ffff00":null;
this.set("backgroundColor",c)}a=this.get("backgroundColor");return !RichText.blank(a)&&a!==this.getPath("editor.defaultBackgroundColor")
}.property("backgroundColor").cacheable(),isDefaultSize:function(a,d){var c,b=this.getPath("editor.defaultFontSize");
if(d===YES){this.set("fontSize",b)}c=this.get("fontSize");return RichText.blank(c)||c===b
}.property("fontSize").cacheable(),isSizeIncreased:function(){var a=this.get("fontSize");
return !RichText.blank(a)&&a>this.getPath("editor.defaultFontSize")}.property("fontSize").cacheable(),isSizeDecreased:function(){var a=this.get("fontSize");
return !RichText.blank(a)&&a<this.getPath("editor.defaultFontSize")}.property("fontSize").cacheable(),isSuperscript:function(a,b){return this._basicSelectionModifier("isSuperscript","superscript",b)
}.property().cacheable(),isSubscript:function(a,b){return this._basicSelectionModifier("isSubscript","subscript",b)
}.property().cacheable(),isOrderedList:function(a,b){return this._basicSelectionModifier("isOrderedList","insertorderedlist",b)
}.property().cacheable(),isUnorderedList:function(a,b){return this._basicSelectionModifier("isUnorderedList","insertunorderedlist",b)
}.property().cacheable(),increaseSize:function(){var a=this.get("fontSize");this.set("fontSize",a+1)
},decreaseSize:function(){var a=this.get("fontSize");this.set("fontSize",a-1)},indent:function(){var a=this.get("editor");
if(!a){return}a.iframeExecCommand("indent",false,YES);a.changedSelection()},outdent:function(){var a=this.get("editor");
if(!a){return}a.iframeExecCommand("outdent",false,YES);a.changedSelection()},removeFormatting:function(){var a=this.get("editor");
if(!a){return}a.iframeExecCommand("removeformat",false,YES);a.changedSelection()},toString:function(){return this.get("text")
},update:function(){var b=this.get("updateProperties");var a;for(a=0;a<b.length;a++){this.notifyPropertyChange(b[a])
}}.observes("*editor.element","*editor.text"),getStyle:function(a,d){var b=this.get("editor"),c=this.get("element");
return b&&c?b.getStyle(c,a,d):null},_basicSelectionModifier:function(d,c,e){var b=this.get("editor");
if(!b||!b.get("editorIsReady")){return false}if(e!==undefined){this.propertyWillChange(d);
var a=b.iframeExecCommand(c,false,e);this.propertyDidChange(d);if(a){b.changedSelection()
}}return b.iframeQueryState(c)}});sc_require("system/rich_text_selection");RichText.EditorView=SC.FieldView.extend({value:null,iframeRootResponder:null,classNames:["rich-text-editor-view","sc-text-field-view","text-area"],editorIsReady:NO,exampleSelection:RichText.RichTextSelection,selection:null,selectionText:"",selectionElement:null,cursorPos:null,stylesheets:[],loadStylesheetsInline:NO,displayProperties:"fieldValue isEditing".w(),_fieldUpdateSkipCount:0,$input:function(){return this.$("iframe")
},$inputWindow:function(){return this.$input().map(function(){return this.contentWindow
})},$inputDocument:function(){return this.$inputWindow().map(function(){return this.document
})},$inputBody:function(){return this.$inputDocument().map(function(){return this.body
})},skipFieldUpdate:function(){this._fieldUpdateSkipCount++},didSkipFieldUpdate:function(){if(this._fieldUpdateSkipCount==0){return
}this._fieldUpdateSkipCount--},shouldSkipFieldUpdate:function(){return this._fieldUpdateSkipCount>0
},valueDidChange:function(){var a=this.get("value");if(typeof(a)==="string"){a=RichText.FormattedText.create({value:a})
}if(this._value!==a){this._value=a;if(this.shouldSkipFieldUpdate()){this.didSkipFieldUpdate()
}else{this.setFieldValue(this.get("fieldValue"))}}}.observes("value"),fieldValue:function(){var a=arguments.callee.base.apply(this,arguments);
return a?RichText.HtmlSanitizer.formatHTMLInput(a.toString()):""}.property("value","validator").cacheable(),setFieldValue:function(a){this.propertyWillChange("fieldValue");
if(this.get("editorIsReady")){this.$inputBody().html(a.toString())}this.propertyDidChange("fieldValue");
return this},getFieldValue:function(){return this.get("editorIsReady")?this.$inputBody().html():null
},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
if(!this._value||this._value.get("value")!==b){b=RichText.FormattedText.create({value:b});
this.skipFieldUpdate();this.set("value",b)}},_field_valueDidChange:function(){},render:function(b,c){arguments.callee.base.apply(this,arguments);
var a=SC.guidFor(this);if(c){b.push('<span class="border"></span>');b.push('<iframe name="%@"></iframe></span>'.fmt(a))
}},didCreateLayer:function(){SC.Event.add(this.$input(),"load",this,this._field_checkIFrameDidLoad)
},_field_checkIFrameDidLoad:function(){var a=this.$input().get(0);if(a.contentWindow&&a.contentWindow.document){this.iframeDidLoad()
}else{this.invokeLater("_field_checkIFrameDidLoad",500)}},iframeDidLoad:function(){if(!this.get("editorIsReady")){if(this.get("loadStylesheetsInline")){this._loadStylesheets()
}else{this._setupEditor()}}},_loadStylesheets:function(){var b=this.get("stylesheets"),a;
this._pendingStylesheets=b.length;for(idx=0;idx<b.length;idx++){a=b[idx];if(RichText.EditorView.loadedStylesheets[a]){this._stylesheetDidLoad(a)
}else{RichText.EditorView.loadStylesheet(a,this,"_stylesheetDidLoad")}}},_stylesheetDidLoad:function(a){this._pendingStylesheets-=1;
if(this._pendingStylesheets<=0){this._setupEditor()}},_writeDocument:function(b){if(!b){b=""
}var a=this.$inputDocument().get(0);a.open("text/html","replace");a.write("<html><head>%@</head><body></body></html>".fmt(b));
if(!SC.browser.msie){a.close()}},_setupEditor:function(){if(this.get("editorIsReady")){return
}var a=this.$inputDocument(),g=a.get(0),h=(SC.browser.msie)?this.$input():a,j=this.get("stylesheets"),f,b="",c,i;
if(!g){throw"No inputDocumentInstance!"}try{g.designMode="on"}catch(d){a.focus(function(){g.designMode()
})}if(this.get("loadStylesheetsInline")){b+="<style type='text/css'>\n";for(i=0;i<j.length;
i++){f=j[i];b+="/* BEGIN %@ */\n\n".fmt(f);b+=RichText.EditorView.loadedStylesheets[f];
b+="/* END %@ */\n\n".fmt(f)}b+="</style>\n"}else{for(i=0;i<j.length;i++){b+='<link rel="stylesheet" href="%@" type="text/css" charset="utf-8">\n'.fmt(j[i])
}}this._writeDocument(b);this.set("editorIsReady",YES);this.setFieldValue(this.get("fieldValue"));
c=SC.IFrameRootResponder.create({iframe:this.$input().get(0),target:this});c.setup();
this.set("iframeRootResponder",c);SC.Event.add(a,"paste",this,this.pasteCaught);SC.Event.add(h,"focus",this,this._field_fieldDidFocus);
SC.Event.add(a,"blur",this,this._field_fieldDidBlur)},willDestroyLayer:function(){var c=this.$inputDocument(),a=(SC.browser.msie)?this.$input():c,b=this.get("iframeRootResponder");
b.teardown();this.set("iframeRootResponder",null);SC.Event.remove(c,"blur",this,this._field_fieldDidBlur);
SC.Event.remove(a,"focus",this,this._field_fieldDidFocus);SC.Event.remove(c,"paste",this,this.pasteCaught);
SC.Event.remove(this.$input(),"load",this,this._field_checkIFrameDidLoad)},keyDown:function(a){if(a.metaKey){switch(SC.PRINTABLE_KEYS[a.which]){case"b":this.set("selectionIsBold",!this.get("selectionIsBold"));
return YES;case"u":this.set("selectionIsUnderlined",!this.get("selectionIsUnderlined"));
return YES;case"i":this.set("selectionIsItalicized",!this.get("selectionIsItalicized"));
return YES;case"z":a.shiftKey?this.redoChange():this.undoChange();return YES;case"y":this.redoChange();
return YES}}else{if(a.which===SC.Event.KEY_TAB){a.shiftKey?this.selectionOutdent():this.selectionIndent();
return YES}}a.allowDefault()},keyUp:function(a){this.querySelection();this.queryCursorPos();
this._field_fieldValueDidChange(a)},mouseUp:function(a){this.querySelection();this.queryCursorPos();
a.allowDefault()},pasteCaught:function(a){this.querySelection();this.queryCursorPos();
this._field_fieldValueDidChange(a)},_loseBlur:function(){if(this._isFocused){this._isFocused=NO;
SC.RootResponder.responder.set("richTextEditorHasFocus",NO)}},_field_fieldDidFocus:function(){this.becomeFirstResponder()
},_field_fieldDidBlur:function(){this._loseBlur()},willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){SC.RootResponder.responder.set("richTextEditorHasFocus",YES);
this.$inputWindow().get(0).focus()}}},willLoseKeyResponderTo:function(a){this._loseBlur()
},changedSelection:function(){this.querySelection();this._field_fieldValueDidChange()
},querySelection:function(){var c,e="",d=null;if(SC.browser.msie){c=this.$inputDocument().get(0).selection.createRange();
e=c.text;if(SC.none(selection)){selection=""}d=c.parentElement()}else{c=this.$inputWindow().get(0).getSelection();
if(c.rangeCount>0){var b=c.getRangeAt(0),h=b.commonAncestorContainer,i=h.childNodes,f=[],a,g;
for(g=0;g<i.length;g++){a=i[g];if(a){if(c.containsNode(a,true)&&!(a.nodeType===3&&a.length===0)){f.push(a)
}}}if(f.length===1&&f[0].nodeType===1){d=f[0]}else{d=h}while(d&&d.nodeType!==1){d=d.parentNode
}e=c.toString()}}this.propertyWillChange("selectionText");this.propertyWillChange("selectionElement");
this.set("selectionText",e);this.set("selectionElement",d);this.get("selection").update();
this.propertyDidChange("selectionText");this.propertyDidChange("selectionElement")
},queryCursorPos:function(){var a=this.$inputWindow().get(0),f=this.$inputDocument().get(0),g;
if(a.getSelection){var d=a.getSelection(),c=d.anchorNode,e=d.anchorOffset;if(c&&c.nodeType===1){c=c.childNodes[e];
e=0}g=c?(this._anchorNodeOffset(c)+e):null}else{if(f.selection){var b=f.selection.createRange();
b.moveStart("sentence",-1000000);g=b.text.length}}this.setIfChanged("cursorPos",g)
},_anchorNodeOffset:function(b){if(b===this.$inputBody().get(0)){return 0}var d=this._anchorNodeOffset(b.parentNode),c=b.parentNode.childNodes,e;
for(var a=0;a<c.length;a++){e=c[a];if(e===b){return d}else{d+=this._nodeLength(e)
}}throw"couldn't find node"},_nodeLength:function(c){if(c.nodeType===1){var b=0,d,a;
if(c.childNodes.length===0){return 1}else{for(a=0;a<c.childNodes.length;a++){d=c.childNodes[a];
b+=this._nodeLength(d)}}return b}else{if(c.nodeType===3){return c.length}else{return 0
}}},getStyle:function(h,c,d){var m=this.$inputWindow().get(0),n,b=h.style;function j(i){if(!SC.browser.safari){return false
}var a=m.getComputedStyle(i,null);return !a||a.getPropertyValue("color")==""}if(c=="opacity"&&SC.browser.msie){n=SC.$.attr(b,"opacity");
return n==""?"1":n}if(SC.browser.opera&&c=="display"){var o=b.outline;b.outline="0 solid black";
b.outline=o}if(c.match(/float/i)){c=styleFloat}if(!d&&b&&b[c]){n=b[c]}else{if(m.getComputedStyle){if(c.match(/float/i)){c="float"
}c=c.replace(/([A-Z])/g,"-$1").toLowerCase();var p=m.getComputedStyle(h,null);if(p&&!j(h)){n=p.getPropertyValue(c)
}else{var g=[],q=[],r=h,k=0;for(;r&&j(r);r=r.parentNode){q.unshift(r)}for(;k<q.length;
k++){if(j(q[k])){g[k]=q[k].style.display;q[k].style.display="block"}}n=c=="display"&&g[q.length-1]!=null?"none":(p&&p.getPropertyValue(c))||"";
for(k=0;k<g.length;k++){if(g[k]!=null){q[k].style.display=g[k]}}}if(c=="opacity"&&n==""){n="1"
}}else{if(h.currentStyle){var f=c.replace(/\-(\w)/g,function(a,i){return i.toUpperCase()
});n=h.currentStyle[c]||h.currentStyle[f];if(!(/^\d+(px)?$/i).test(n)&&(/^\d/).test(n)){var e=b.left,l=h.runtimeStyle.left;
h.runtimeStyle.left=h.currentStyle.left;b.left=n||0;n=b.pixelLeft+"px";b.left=e;h.runtimeStyle.left=l
}}}}return n},defaultColor:function(){if(!this.get("editorIsReady")){return null}var a=this.$inputBody().get(0);
return RichText.HtmlSanitizer.standardizeColor(this.getStyle(a,"color"))}.property("editorIsReady").cacheable(),defaultBackgroundColor:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputBody().get(0);return RichText.HtmlSanitizer.standardizeColor(this.getStyle(a,"background-color"))
}.property("editorIsReady").cacheable(),defaultFontSize:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputBody().get(0);return RichText.HtmlSanitizer.standardizeFontSize(this.getStyle(a,"font-size"))
}.property("editorIsReady").cacheable(),undoAllowed:function(){return this.iframeQueryEnabled("undo")
}.property("selectionText").cacheable(),redoAllowed:function(){return this.iframeQueryEnabled("redo")
}.property("selectionText").cacheable(),undoChange:function(){this.iframeExecCommand("undo",false,YES);
this.changedSelection()},redoChange:function(){this.iframeExecCommand("redo",false,YES);
this.changedSelection()},iframeExecCommand:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputDocument().get(0);return a.execCommand.apply(a,arguments)},iframeQueryState:function(){if(!this.get("editorIsReady")){return null
}var a=this.$inputDocument().get(0);return a.queryCommandState.apply(a,arguments)
},iframeQueryEnabled:function(){if(!this.get("editorIsReady")){return null}var a=this.$inputDocument().get(0);
return a.queryCommandEnabled.apply(a,arguments)},init:function(){arguments.callee.base.apply(this,arguments);
this.set("selection",this.get("exampleSelection").create({editor:this}))}});RichText.EditorView.mixin({loadedStylesheets:{},pendingStylesheets:[],stylesheetObservers:{},stylesheetIsLoaded:function(a){return !!this.loadedStylesheets[a]
},stylesheetIsLoading:function(a){return this.pendingStylesheets.indexOf(a)!==-1},loadStylesheet:function(a,b,c){if(b&&c){this.addStylesheetObserver(a,b,c)
}if(!this.stylesheetIsLoaded(a)&&!this.stylesheetIsLoading(a)){this.pendingStylesheets.push(a);
return SC.Request.getUrl(a).notify(this,this._stylesheetDidLoad,{url:a}).send()}},addStylesheetObserver:function(a,b,d){var c=this.stylesheetObservers;
if(!c[a]){c[a]=[]}c[a].push({target:b,method:d});return YES},_stylesheetDidLoad:function(e,g){var c=e.get("response"),d=g.url,f,b,a;
this.loadedStylesheets[d]=c;this.pendingStylesheets.removeObject(d);this._notifyLoad(d)
},_notifyLoad:function(b){var c,a;c=this.stylesheetObservers[b];if(c){for(idx=0;idx<c.length;
idx++){a=c[idx];a.target[a.method](b)}}}});SC.TextFieldView=SC.TextFieldView.extend({didLoseKeyResponderTo:function(a){if(!SC.RootResponder.responder.get("richTextEditorHasFocus")){this.$input()[0].blur()
}}});RichText.ToolbarButtonView=SC.ButtonView.extend({buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,titleMinWidth:0});
sc_require("views/toolbar_button");RichText.ToolbarView=SC.View.extend({classNames:"rich-text-toolbar-view",childViews:("strikethroughButton boldButton underlineButton italicsButton leftAlignButton justifyButton centerButton rightAlignButton defaultColorButton hightlightButton highlightBackgroundButton increaseSizeButton decreaseSizeButton resetSizeButton superscriptButton subscriptButton indentButton outdentButton orderedListButton unorderedListButton removeFormattingButton undoButton redoButton").w(),editor:null,layout:{top:0,left:0,right:0,bottom:SC.LAYOUT_AUTO},strikethroughButton:RichText.ToolbarButtonView.extend({title:"S",valueBinding:"*parentView.editor.selection.isStrikethrough"}),boldButton:RichText.ToolbarButtonView.extend({title:"B",valueBinding:"*parentView.editor.selection.isBold"}),underlineButton:RichText.ToolbarButtonView.extend({title:"U",valueBinding:"*parentView.editor.selection.isUnderlined"}),italicsButton:RichText.ToolbarButtonView.extend({title:"I",valueBinding:"*parentView.editor.selection.isItalicized"}),leftAlignButton:RichText.ToolbarButtonView.extend({title:"Left",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isLeftAligned"}),justifyButton:RichText.ToolbarButtonView.extend({title:"Justified",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isJustified"}),centerButton:RichText.ToolbarButtonView.extend({title:"Center",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isCentered"}),rightAlignButton:RichText.ToolbarButtonView.extend({title:"Right",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isRightAligned"}),defaultColorButton:RichText.ToolbarButtonView.extend({title:"Default Color",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isDefaultColor"}),hightlightButton:RichText.ToolbarButtonView.extend({title:"Highlight",valueBinding:"*parentView.editor.selection.isHighlighted"}),highlightBackgroundButton:RichText.ToolbarButtonView.extend({title:"Highlight BG",valueBinding:"*parentView.editor.selection.isBackgroundHighlighted"}),highlightBackgroundButton:RichText.ToolbarButtonView.extend({title:"Highlight BG",valueBinding:"*parentView.editor.selection.isBackgroundHighlighted"}),increaseSizeButton:RichText.ToolbarButtonView.extend({title:"+",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor.selection",action:"increaseSize",valueBinding:"*parentView.editor.selection.isSizeIncreased"}),decreaseSizeButton:RichText.ToolbarButtonView.extend({title:"-",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor.selection",action:"decreaseSize",valueBinding:"*parentView.editor.selection.isSizeDecreased"}),resetSizeButton:RichText.ToolbarButtonView.extend({title:"+-",buttonBehavior:SC.TOGGLE_ON_BEHAVIOR,valueBinding:"*parentView.editor.selection.isDefaultSize"}),superscriptButton:RichText.ToolbarButtonView.extend({title:"Super",valueBinding:"*parentView.editor.selection.isSuperscript"}),subscriptButton:RichText.ToolbarButtonView.extend({title:"Sub",valueBinding:"*parentView.editor.selection.isSubscript"}),indentButton:RichText.ToolbarButtonView.extend({title:"Indent",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor.selection",action:"indent"}),outdentButton:RichText.ToolbarButtonView.extend({title:"Outdent",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor.selection",action:"outdent"}),orderedListButton:RichText.ToolbarButtonView.extend({title:"OL",valueBinding:"*parentView.editor.selection.isOrderedList"}),unorderedListButton:RichText.ToolbarButtonView.extend({title:"UL",valueBinding:"*parentView.editor.selection.isUnorderedList"}),removeFormattingButton:RichText.ToolbarButtonView.extend({title:"Remove",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor.selection",action:"removeFormatting"}),undoButton:RichText.ToolbarButtonView.extend({title:"Undo",isEnabledBinding:"*parentView.editor.undoAllowed",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor",action:"undoChange"}),redoButton:RichText.ToolbarButtonView.extend({title:"Redo",isEnabledBinding:"*parentView.editor.redoAllowed",buttonBehavior:SC.PUSH_BEHAVIOR,targetBinding:"*parentView.editor",action:"redoChange"})});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("rich_text")
};