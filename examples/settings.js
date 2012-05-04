var sample = require('./sample')

module.exports = {
  modules : {
    sample : sample
  },
  module_groups : {
    app : [
      sample
    ]
  }
}
