var React = require('react');

var galleryStore = require('../stores/galleryStore');

var Image = React.createClass({



    render: function () {
    	return (
    		<li>
    			<img src={this.props.url} />
    			<button onClick ={this.handleLikeClick}>Likes: {this.props.likes}</button>
    			<button onClick ={this.handleDeleteClick}>Delete</button>
			</li>
		);
    },

    handleLikeClick: function () {
    	galleryStore.like(this.props.id);
    },

    handleDeleteClick: function () {
    	galleryStore.remove(this.props.id);
    	// find the object in our galleryItems array
    	// splice it out
    }

});


module.exports = Image;