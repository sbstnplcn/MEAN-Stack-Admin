'use strict';

((app) => {
	app.component('register', {
		templateUrl: 'js/components/login/register.html',
		controller: ['usersService', '$state', function (usersService, $state) {
			angular.extend(this, {
				$onInit() {

					// add User
					this.add = () => {
						usersService
						.add(this.newUser)
						.then(() => $state.go('app.login', {reload: true}))
						.catch((err) => err)
					}
				}
			})
		}]
	})
})(angular.module('app.register', []))
