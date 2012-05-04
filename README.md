noxigen 
=============

PLEASE CHECK BACK SOON THIS SITE IS UNDER CONSTRUCTION. 


Installing
----------
    npm install noxigen  
    npd install -d  

Usage
-----
1. Define the domain classes in a js file using the provided types:  
    IntField  
    TextField  
    ArrayField  
2. Run generate on the above js file. The genartor will output the following:  
    A simple form for inputting the above text. With simple validation.  
    A set of javascript file for the frontend.  
    A set of javascript files for the backend.  
    A set of javascript interfaces to store the form in couchdb.  
3. Generation is controlled by the config file.  

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
      module_groups : {
        module_group_names : ['g1'],
        g1 : {
          modules_names : ['m1'],
          m1 : {
            class_names : ['c1'],
            c1 : {
            }
          }
        }
      }
      modules : {
        modules_names : ['m1'],
        m1 : {
          class_names : ['c1'],
          c1 : {
          }
        }
      },
      classes : {
        class_names : ['c1'],
        c1 : {
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