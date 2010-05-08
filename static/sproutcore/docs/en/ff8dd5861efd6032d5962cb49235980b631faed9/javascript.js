(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/rich_text_demo/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet-packed.css","/rich_text_demo/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet.css"],scripts:["/rich_text_demo/static/sproutcore/standard_theme/en/52920dfdad7f0329367ed5692a2fc96881122edb/javascript-packed.js"]}
})();SC.stringsFor("English",{});Docs=SC.Object.create({NAMESPACE:"Docs",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
Docs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"labelView".w(),labelView:SC.LabelView.design({layout:{centerX:0,centerY:0,width:100,height:18},tagName:"h1",value:"Hello World"})})});
Docs.main=function main(){Docs.getPath("mainPage.mainPane").append()};function main(){Docs.main()
};