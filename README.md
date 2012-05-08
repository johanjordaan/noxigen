noxigen 
=============
PLEASE CHECK BACK SOON THIS SITE IS UNDER CONSTRUCTION. 

The Tello board for this project can be found [here](https://trello.com/board/noxigen/4fa4c58c189db5797b1b3fe6)


Installing
----------
    npm install noxigen -g  

Usage
-----
1. Create a new project:
    noxigen startproject <project_name>
2. Change directory to the new project. Its file structure looks like this.
    <project_name>
      -noxigen
        settings.js
        - classes
3. Modify the settings.js to your liking. The most important decsison here will be which set of generation templates to use.
4. Create classes for your domain objects (preferably in the classes directory) using the provided types:     
    IntField  
    TextField  
    ArrayField  
5. Generate the code:
    noxigen generate 
    
Structure of the settings.js file
---------------------------------
    { modules : {}
      templates : []
    }
  
Pipeline
-------------
    module[1..n].js      settings.js
         |                      |
         |                      |
         +-----------+----------+
                     |                    template_configuration.js
                     |                              |
         meta model construction                    |
                     |                              |
                     |                              |
                templating <------------------------+
                     |
                     |
                  results
                     

Meta-Model
------------
    { 
      modules : {
        modules_names : ['m1'],
        m1 : {
          __name__ : 'm1',
          class_names : ['c1'],
          c1 : {
            __name__ : 'c1',
          }
        }
      },
      classes : {
        class_names : ['c1'],
        c1 : {
          __name__ : 'c1',
        }
      }
    }


MIT License
===========
Copyright (c) 2012 whoatemydomain <admin@whoatemydomain.co.za>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.