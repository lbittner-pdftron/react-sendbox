// require('./assets/scss/app.scss');
var React = require('react')
require('../stylesheets/app.scss');
import Root from './redux/containers/Root';
// var Main = require('./components/Main')

window.debug =  require('debug')
window._ =  require('lodash')
React.render(<Root />, document.getElementById('main'));

console.log('Application is loaded!');
console.log('hello as')


