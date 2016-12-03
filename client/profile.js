//Session auto updates the html, sets all to false so you cannot edit the prifile
Session.set("caneditusername",false);
Session.set("caneditfirstname",false);
Session.set("caneditlastname",false);
Session.set('caneditphonenumber',false);
Template.profile.rendered= function() {
	//creates a profile if the user does not have one
	Meteor.call("profileinsert",Meteor.userId());
}
Template.profile.events({
	//allows the user to edit username
	'click #editusername':function(){
		
		Session.set("caneditusername",true);
		
	},
	//makes the user to unable edit username and saves it to the server
	'click #doneusername':function(){
		//pulls current profile
		var toinsert = Profile.find({userId:Meteor.userId()}).fetch()[0]
		//changes the username to whatever you changed it to
		toinsert.username= $("#newusername").val()
		//puts the new profile onto the server
		Profile.update({_id:toinsert._id},toinsert)
		//makes the user unable to edit
		Session.set("caneditusername",false)
	},
	//allows the user to edit the first name
	'click #editfirstname':function(){
		Session.set("caneditfirstname",true);
		
	},
	//makes the user to unable edit first name and saves it to the server
	'click #donefirstname':function(){
		//pulls current profile
		var toinsert = Profile.find({userId:Meteor.userId()}).fetch()[0]
		//changes the first name to whatever you changed it to
		toinsert.firstname= $("#newfirstname").val()
		//changes the full name to whatever you changed it to
		toinsert.fullname = (toinsert.firstname +" "+ toinsert.lastname);
		//puts the new profile onto the server
		Profile.update({_id:toinsert._id},toinsert)
		//makes the user unable to edit
		Session.set("caneditfirstname",false)

		
	},
	//allows the user to edit the first name
	'click #editlastname':function(){
		
		Session.set("caneditlastname",true);
		
	},
	//makes the user to unable edit last name and saves it to the server
	'click #donelastname':function(){
		//pulls current profile
		var toinsert = Profile.find({userId:Meteor.userId()}).fetch()[0]
		//changes the last name to whatever you changed it to
		toinsert.lastname= $("#newlastname").val()
		//changes the full name to whatever you changed it to
		toinsert.fullname = (toinsert.firstname +" "+ toinsert.lastname);
		//puts the new profile onto the server
		Profile.update({_id:toinsert._id},toinsert)
		//makes the user unable to edit
		Session.set("caneditlastname",false)
	},
	'click #editphonenumber':function(){
		Session.set("caneditphonenumber",true);
	},
	'click #donephonenumber':function(){
		var toinsert = Profile.find({userId:Meteor.userId()}).fetch()[0]
		//changes the last name to whatever you changed it to
		if($("#newphonenumber").val()/1==parseInt($("#newphonenumber").val())&&$("#newphonenumber").val().length>9 ) {
		if ($("#newphonenumber").val() != toinsert.phonenumber) {
		toinsert.phoneverified = false;
	}
		toinsert.phonenumber= $("#newphonenumber").val()
		//changes the full name to whatever you changed it to
		//puts the new profile onto the server
		Profile.update({_id:toinsert._id},toinsert)
		//makes the user unable to edit
		Session.set("caneditphonenumber",false)
		}
		else{
			alert("invalid phone number")
		}
	},
	'click #verifyphonenumber':function(){
		alert('request sent')
		if (Verify.find({userId:Meteor.userId(),type:"phone"}).fetch().length==0) {
			Verify.insert({userId:Meteor.userId(),type:"phone"})
		Meteor.call('sendText',Profile.find({userId:Meteor.userId()}).fetch()[0].phonenumber,"Hello "+Profile.find({userId:Meteor.userId()}).fetch()[0].fullname+" your phone verification link is http://turing.cs-i.brandeis.edu:6100/verify/phone/"+Verify.find({userId:Meteor.userId(),type:"phone"}).fetch()[0]._id)
	}},
	'click #verifyemail':function(){
		alert('request sent')
		if (Verify.find({userId:Meteor.userId(),type:"email"}).fetch().length==0) {
			Verify.insert({userId:Meteor.userId(),type:"email"})
		Meteor.call('sendEmail',Profile.find({userId:Meteor.userId()}).fetch()[0].email,"Hello "+Profile.find({userId:Meteor.userId()}).fetch()[0].fullname+" your email verification link is http://turing.cs-i.brandeis.edu:6100/verify/email/"+Verify.find({userId:Meteor.userId(),type:"email"}).fetch()[0]._id,"email verification")
	}
	}


})
Template.profile.helpers({
	email:function(){
		//sends user email to the html
		return Profile.find({userId:Meteor.userId()}).fetch()[0].email
	},
	username:function(){
		//sends user username to the html
		return Profile.find({userId:Meteor.userId()}).fetch()[0].username
	},
	caneditusername:function(){
		//tells the html if you can edit the username
		return Session.get("caneditusername");
	},
	caneditfirstname:function(){
		//tells the html if you can edit the firstname
		return Session.get("caneditfirstname");
	},
	caneditlastname:function(){
		//tells the html if you can edit the lastname
		return Session.get("caneditlastname");
	},
	caneditphonenumber:function(){
		return Session.get("caneditphonenumber");
	},
	firstname:function(){
		//sends user firstname to the html
		return Profile.find({userId:Meteor.userId()}).fetch()[0].firstname
	},
	lastname:function(){
		//sends user lastname to the html
		return Profile.find({userId:Meteor.userId()}).fetch()[0].lastname
	},
	//creates the friend code
	userId:function(){
		//gets the userId
		var userId = Meteor.userId()
		//splits the userId by each letter
		userId = userId.split("")
		//sets the 6th letter to `
		userId[5]='`'
		//rejoins ir into a string
		userId= userId.join("")
		//splits it at ` to gain the first 5 terms
		return userId.split("`")[0];
	},
	phonenumber:function(){
		return Profile.find({userId:Meteor.userId()}).fetch()[0].phonenumber
	},
	phoneverified:function(){
		return Profile.find({userId:Meteor.userId()}).fetch()[0].phoneverified
	},
	emailverified:function(){
		var toreturn = Profile.find({userId:Meteor.userId()}).fetch()[0].emailverified;
		console.log(toreturn)
		return toreturn
	}

})
