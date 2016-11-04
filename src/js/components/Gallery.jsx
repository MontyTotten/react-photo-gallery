var React = require('react');

var galleryStore = require('../stores/galleryStore');
var Image = require('./Image.jsx')

var Gallery = React.createClass({

	getInitialState: function () {
		return {
			galleryItems: galleryStore.getItems(), // retieving "this.state"
			newItemValue: ''
		};
	},

	componentWillMount: function () {
  	 	var _this = this;
    	galleryStore.on('update', function () {
    		_this.setState({
    			galleryItems: galleryStore.getItems()
    		});
    	});
    },

	render: function () {
		var galleryItems = this.state.galleryItems;
		var imageComponents = galleryItems.map(function (galleryItem) {
			return <Image 
				key={galleryItem.id} 
				id={galleryItem.id} 
				url={galleryItem.url} 
				likes={galleryItem.likes} />;
		});
		return (
			<main>
				<input 
					ref="newItemInput"
					type="text" 
					value={this.state.newItemValue} 
					onChange={this.handleNewItemChange}/>
				<button onClick={this.handleNewItemClick}>Add Photo</button>
				<ul>{imageComponents}</ul>
			</main>
		);
	},

	handleNewItemChange: function () {
		var newItemInput = this.refs.newItemInput
        this.setState({
            newItemValue: newItemInput.value
        });
    },

    handleNewItemClick: function () {
        galleryStore.add(this.state.newItemValue);
        this.setState({
            newItemValue: ''
        });
    },

});

module.exports = Gallery;