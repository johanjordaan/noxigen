module.exports =  {
  description : 'A debug target.',
  main_templates : [
    { template:'main.ejs' , destination:'main.txt' }
  ],
  module_templates : [
    { template:'module.ejs' , destination:'<%= module_name %>.txt' }
  ],
  class_templates : [
    { template:'class.ejs' , destination:'<%= class_name %>.txt' }
  ]
}