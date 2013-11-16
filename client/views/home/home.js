Template.home.events({
	'click #btn-user-data' : function(e){
		Meteor.call('getComments', function(err, data) {
			var comments = {};
			//console.log(data.data[25].id);
			for(var i = 0; i < data.data.length; i++){
				var fromName = data.data[i].from.name;
				var commentTags = data.data[i]["message_tags"].length;

				if(fromName in comments){
					
					//console.log("key exists! " + fromName + " found value " + commentTags );
					comments[fromName].tags = comments[fromName].tags + commentTags;
					
				} else {
					comments[fromName] = {tags : commentTags};
					//console.log("key not found so creating a new one " + fromName + " equal to " + commentTags );

				}
				//$('#data').text(JSON.stringify(data, undefined, 4));	
				$('#result').text(JSON.stringify(comments));
			}
			// $('#result').text(JSON.stringify(data, undefined, 4));	
		});
	}
});

