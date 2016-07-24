# Minnehack.io

## Overview

This is a [Jekyll](https://jekyllrb.com/) site hosted on [GitHub Pages](https://pages.github.com/) which is a fork of the [Bootstrap](http://getbootstrap.com/) based [Agency theme](https://github.com/y7kim/agency-jekyll-theme).

Jekyll is a static website generator. It takes a conveniently organized code base and compiles it into a static website that is easy to host. GitHub Pages is a website hosting service provided by GitHub.  

GitHub Pages supports Jekyll natively, so all you need to do for the site to go live is push a commit to the `gh-pages` branch of the repo.  GitHub automatically builds it and serves it for you.  ***One catch here is that GitHub may not build the site immediately.  You may need to wait some time before the changes you pushed go live***.

Thanks to Rick Kim for providing the original theme.

## How does one update this site?

The result of Jekyll's build process (and the set of code and assets that make up the actual website) is the `_site` directory.  That means we don't ever edit `_site` or its contents – *we edit the code base that Jekyll compiles into `_site`*.

### I want to edit the main page's contents
You're likely primarily interested in editing `_includes`, which contains all the primary component sections of the page (header, sponsors, registration, ..., footer, etc.).  Again this site uses the Bootstrap framework to structure the pages it's highly likely that taking  a look at Bootstrap's documentation and using an existing Bootstrap solution will help you out (this is what the `container`, `row`, `column` components are about).  This site also parses [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), just name the file with the `.md` extension.

### I want to remove a component from the main page
Edit the `_layouts/default.html` template by removing the name of the `_include` template you wish to eliminate.

### I want to add a component section from the main page
If the section does not exist already, create a new template in the `_includes` directory.  Then add the name of the template to the `_layouts/default.html` template. 

### I want to add an entirely new page to the site
Assuming you want the new page to be located at `minnehack.io/<new-page-name>`, (1) start by creating a new layout template in the `_layouts` directory.  (2) Then create a new html template in the root directory, name the layout with the name of the layout template you just created.  (2) Lastly, go back to the layout template you created in step 1, and include the html template you just produced in step 2.   

### I want to change the CSS styling
Modifying existing styling: look for `_includes/css/agency.css`.
Adding entirely new styling: Consider organizing your thoughts around the matter (creating a new class or id) and adding rules to `style.css`. For something that is one-of-a-kind/peculiar/unique/specific you can add inline styling the appropriate template. This is generally considered bad practice however and will deteriorate the codebase if abused.

### I want to add an image
Add it to the `img` directory and link to it in the appropriate template







