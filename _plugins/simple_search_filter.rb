module Jekyll
  class Search < Liquid::Tag
    def render(context)
      site = context.registers[:site]
      posts = site.collections['posts'].docs
      pages = site.pages
      result = []

      query = context['page']['search']

      posts.each do |post|
        matches = post.content.downcase.scan(/#{query.downcase}/)
       
