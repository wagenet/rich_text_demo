# ===========================================================================
# Project:   RichTextDemo
# Copyright: ©2009 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :rich_text]

mode :production do
  config :all, :url_prefix => 'rich_text_demo/static'
end