function Facebook(accessToken) {
	this.fb = Meteor.require('fbgraph');
	this.accessToken = accessToken;
	this.fb.setAccessToken(this.accessToken);
	this.options = {
		timeout: 3000,
		pool: {maxSockets: Infinity},
		headers: {connection: 'keep-alive'}
	}
	this.fb.setOptions(this.option);
}

Facebook.prototype.query = function(query, method) {
	var self = this;
	
	var method = (typeof method === 'undefined') ? 'get' : method;
	var data = Meteor.sync(function(done) {
		self.fb[method](query, function(err, res) {
			done(null, res);
		});
	});
	return data.result;
}

Facebook.prototype.getComments = function() {
	return this.query('/[object_ID]/comments');
}

Meteor.methods({
	getComments: function() {
		var fb = new Facebook(Meteor.user().services.facebook.accessToken);
		var data = fb.getComments();
		return data;
	}
});
