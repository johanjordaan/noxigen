module.exports =  {
  description : 'A debug target.',
  parameters : {
    base : 'The location relative to the base to emit the results to.'
  },
  main_templates : [
    { template:'main.ejs' , destination:'<%= parameters.base %>/main.txt' }
  ],
  module_templates : [
    { template:'module.ejs' , destination:'<%= parameters.base %>/modules/<%= module_name %>.txt' }
  ],
  class_templates : [
    { template:'class.ejs' , destination:'<%= parameters.base %>/classes/<%= class_name %>.txt' }
  ]
}