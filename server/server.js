Meteor.methods ({
	profileinsert:function (user) {
		if(Profile.find({userId:user}).fetch().length == 0) {
			email = Meteor.users.find({_id:Meteor.userId()}).fetch()[0].emails[0].address
			Profile.insert({userId:user, username:email.split("@")[0]})
		}
	}

	

	
	
})
