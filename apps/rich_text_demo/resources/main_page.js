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
    childViews: 'labelView toolbarView editorLabel editorView rawLabel rawView cleanLabel cleanView reloadedLabel reloadedView'.w(),

    labelView: SC.LabelView.design({
      layout: { top: 8, left: 0, width: 200, height: 25 },
      textAlign: SC.ALIGN_CENTER,
      controlSize: SC.LARGE_CONTROL_SIZE,
      value: "RichText Demo"
    }),

    toolbarView: RichText.ToolbarView.design({
      layout: { top: 40, left: 15, width: 200, height: 325 },
      editorBinding: '.parentView.editorView'
    }),

    editorLabel: SC.LabelView.design({
      layout: { top: 15, left: 240, width: 300, height: 18 },
      value: 'Editor'
    }),

    editorView: RichText.EditorView.design({
      layout: { top: 40, left: 240, width: 300, height: 325 }
    }),

    rawLabel: SC.LabelView.design({
      layout: { top: 15, left: 565, width: 300, height: 18 },
      value: 'Raw HTML'
    }),

    rawView: SC.TextFieldView.design({
      layout: { top: 40, left: 565, width: 300, height: 140 },
      isTextArea: YES,

      _setValue: function(){
        var iframeHtml = this.getPath('parentView.editorView').$inputBody().html();
        this.set('value', iframeHtml);
      }.observes('.parentView.editorView.value')

    }),

    cleanLabel: SC.LabelView.design({
      layout: { top: 200, left: 565, width: 300, height: 18 },
      value: 'Cleaned HTML'
    }),

    cleanView: SC.TextFieldView.design({
      layout: { top: 225, left: 565, width: 300, height: 140 },
      isTextArea: YES,

      _setValue: function(){
        var value = this.getPath('parentView.editorView.value');
        this.set('value', value);
      }.observes('.parentView.editorView.value')

    }),

    reloadedLabel: SC.LabelView.design({
      layout: { top: 15, left: 890, width: 300, height: 18 },
      value: 'Reloaded HTML'
    }),

    reloadedView: SC.TextFieldView.design({
      layout: { top: 40, left: 890, width: 300, height: 140 },
      isTextArea: YES,

      _setValue: function(){
        var value = this.getPath('parentView.editorView.value');
        this.set('value', RichText.HtmlSanitizer.formatHTMLInput(value));
      }.observes('.parentView.editorView.value')

    }),
  })

});
