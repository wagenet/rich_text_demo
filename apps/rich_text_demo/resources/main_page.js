// ==========================================================================
// Project:   RichTextDemo - mainPage
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals RichTextDemo */

// This page describes the main user interface for your application.  
RichTextDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'labelView toolbarView editorView rawView cleanView'.w(),

    labelView: SC.LabelView.design({
      layout: { top: 0, left: 0, width: 200, height: 18 },
      textAlign: SC.ALIGN_CENTER,
      tagName: "h1", 
      value: "RichText Demo"
    }),

    toolbarView: RichText.ToolbarView.design({
      layout: { top: 30, left: 0, width: 200, height: 300 },
      editorBinding: '.parentView.editorView'
    }),

    editorView: RichText.EditorView.design({
      layout: { top: 30, left: 225, width: 300, height: 300 }
    }),

    rawView: SC.LabelView.design({
      layout: { top: 30, left: 550, width: 300, height: 140 },

      _setValue: function(){
        var iframeHtml = this.getPath('parentView.editorView').$inputBody().html();
        this.set('value', iframeHtml);
      }.observes('.parentView.editorView.value')

    }),

    cleanView: SC.LabelView.design({
      layout: { top: 190, left: 550, width: 300, height: 140 },

      _setValue: function(){
        var value = this.getPath('parentView.editorView.value');
        this.set('value', value);
      }.observes('.parentView.editorView.value')

    })
  })

});
