'use strict';

((app) => {
	app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$qProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $qProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!')
		$urlRouterProvider.otherwise('/')
		$qProvider.errorOnUnhandledRejections(false)
		$stateProvider.state('app', {
			url: '',
			'abstract': true,
			template: ` <header></header>
                        <ui-view class="main-content container"></ui-view>
                        <footer></footer>`,
			controller: ['usersService', '$state', function (usersService, $state) {
				usersService.getCurrent().then(() => {}).catch(() => $state.go('app.prelogin'))
			}]
		})
		.state('app.home', {
			url: '/',
			template: '<home></home>'
		})
		.state('app.content', {
			url: '/content/:id',
			template: '<content></content>',
			controller: ['usersService', '$stateParams', '$state', function (usersService, $stateParams, $state) {
				usersService.getCurrent().then((currentUser) => {
					const series = []
					currentUser.content.map((el) => series.push(el._id || el))
					if (series.indexOf($stateParams.id) < 0) $state.go('app.home')
				})
			}]
		})
		.state('app.account', {
			url: '/account',
			template: '<account></account>'
		})
		.state('app.prelogin', {
			url: '/prelogin',
			template: '<prelogin></prelogin>'
		})
		.state('app.login', {
			url: '/login',
			template: '<login></login>'
		})
		.state('app.register', {
			url: '/register',
			template: '<register></register>'
		})
		.state('callback', {
			url: '/auth/callback/:token',
			template: '',
			controller: ['usersService', '$stateParams', '$state', function (usersService, $stateParams, $state) {
				if ($stateParams.token) {
					usersService.setToken($stateParams.token).then(() => {
						$state.go('app.home')
					})
				} else {
					$state.go('app.login')
				}
			}]
		})
	}])
})(angular.module('app.config', []))
