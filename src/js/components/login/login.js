'use strict';

((app) => {
	app.component('login', {
		templateUrl: 'js/components/login/login.html',
		controller: ['usersService', '$state', '$window', 'toaster', function (usersService, $state, $window, toaster) {
			angular.extend(this, {
				connect() {
					usersService.connect(this.user).then(() => {
						toaster.success('Connexion', 'Connected !')
						$state.go('app.home')
						$window.location.reload()
					}).catch(() => toaster.error('Error', 'Error Connexion !'))
				},
				forgot(user) {
					usersService.resetPassword(user).then(() => {
						alert('New Password Sent')
					})
				}
			})
		}]
	})
})(angular.module('app.login', []))
