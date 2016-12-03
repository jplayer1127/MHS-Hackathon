Router.configure({
	layoutTemplate: 'layout'

});
Router.route('/', {name:'homepage'});
Router.route('/logout', {name:"logout"});
Router.route('/home',{name:'home'});
Router.route('/profile',{name:'profile'});
