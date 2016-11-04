var EventEmitter = require('eventemitter3');

// Create a new EventEmitter object.
// EventEmitters can registe callback functions to run whenever they trigger an event
// e.g
// 		store.om('update', function () {
// 			console.log('Test')
//  	});
// 		store.trigger('update');

// galleryStore is going to be our source for gallery items.
//
// Each gallery item will be represented by an object. e.g:
//
//	{ url: 'http://....', likes: 0 }

// We need a way to add gallery items.
// We need a way to remove gallery items.
// We need a way to like galley items.

// We need a way to get the current state of the store (get the current list of gallery items)

// We also need a way to update any views that are listening for changes in our data
// 		(EventEmitter to emit the "update" event).

var galleryStore = Object.create(EventEmitter.prototype);
EventEmitter.call(galleryStore);

var galleryItems = [
	{ id: 1, url: 'https://www.ford.com/campaignlibs/content/dam/ford_com/en_us/gtreveal/Recut_120215/Overlay_1250PX/GT_Ford_Chicane_P02_19983_v06_final151112.jpg', likes: 0 }
];

// // Add a photo item to our data. 
galleryStore.add = function (url) {
	galleryItems.push({ 
		id: Math.random(),
		url: url, 
		likes: 0,
	});
	galleryStore.emit('update');
};

galleryStore.remove = function (id) {
	var galleryItem;
	for (var i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].id === id) {
			galleryItem = galleryItems[i]
		} 
	}
	var index = galleryItems.indexOf(galleryItem)
	galleryItems.splice(index, 1)

	this.emit('update');
};

galleryStore.like = function (id) {
	var galleryItem;
	for (var i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].id === id) {
			galleryItem = galleryItems[i]
		} 
	}
	galleryItem.likes += 1
     

	this.emit('update');
};


galleryStore.getItems = function () {
	// var todoItem = todoItems.find( function (item) {
	// 	return item.id === id;
	// });
	// todoItem.completed = !todoItem.completed;
	return galleryItems;
};




window.galleryStore = galleryStore;

module.exports = galleryStore;