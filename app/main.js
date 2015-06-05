require('./assets/scss/app.scss');
var React = require('react')

var Main = require('./components/Main')

React.render(<Main/>, document.getElementById('main'));

console.log('Application is loaded!');
console.log('hello as')