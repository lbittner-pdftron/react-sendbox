/* jshint ignore:start */
// jscs:disable
/** @jsx React.DOM */
var React = require('react');

var DebugElement = React.createClass({
    render: function () {
        var submitted;

        if (this.props.messages !== null ) {
            submitted = <div className="alert alert-success">
                <p>{this.props.label}:</p>
                <pre><code>{JSON.stringify(this.props.messages, null, ' ')}</code></pre>
            </div>;
        }
        return <div>{submitted}</div>;
    }
});

module.exports = DebugElement
