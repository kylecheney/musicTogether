angular.module('musApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state
	('home', {
    url: '/',
    templateUrl: './app/component/views/home/home.html'
   })
  .state('about', {
    url: '/about',
    templateUrl: './app/component/views/about/about.html'
   })
	 .state('contact', {
    url: '/contact',
    templateUrl: './app/component/views/contact/contact.html'
	})
	.state('schedule', {
	 url: '/schedule',
	 templateUrl: './app/component/views/schedule/schedule.html'
 })
 .state('accountSetup', {
	 url: '/accountSetup',
 	templateUrl: './app/component/views/accountSetup/account-setup.html',
 	controller: 'accountSetupCtrl',
	resolve: {
		user: function(authService, $state) {

			authService.getCurrentUser().then(function(response) {
				console.log('this was hit 2');
				if(response.data.new_user === false) {
					$state.go('myaccount');
				}
				else if(response.data === ""){
					$state.go('home');
				}
			});
		}
	}
 })
 .state('myaccount', {
 url: '/myaccount',
 templateUrl: './app/component/views/myAccount/myaccount.html',
 controller: 'myAccountCtrl',
 resolve: {
	 user:function(authService, $state){
	 authService.getCurrentUser().then(function(response){
			 if(response.data.new_user === false){
			 $state.go('myaccount');
			 // return response;
		 }
		 else{
			 $state.go('accountSetup');
			 alert('please log in and compelete the registration process');
			 return response;
		 }
	 });
	 }
 }
 })
 .state('mykids', {
	url: '/myaccount/mykids',
	templateUrl: './app/component/views/myAccount/mykids/mykids.html',
	controller: 'myAccountCtrl'
	//need a resolve to get user and assign it to scope
 })
 .state('register', {
	url: '/myaccount/register',
	templateUrl: './app/component/views/myAccount/register/register.html',
	controller: 'myAccountCtrl'
	//need a resolve to get user and assign it to scope
 })
 .state('myschedule', {
	url: '/myaccount/myschedule',
	templateUrl: './app/component/views/myAccount/myschedule/myschedule.html',
	controller: 'myAccountCtrl'
	//need a resolve to get user and assign it to scope
 });


});