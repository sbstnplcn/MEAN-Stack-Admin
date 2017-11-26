'use strict';

((app) => {
	app.component('header', {
		templateUrl: 'js/components/common/header.html',
		controller: ['usersService', '$state', function (usersService, $state) {
			angular.extend(this, {
				$onInit() {
					usersService
					.getCurrent()
					.then((user) => {
						this.currentUser = user
					})
				},
				disconnect() {
					usersService
					.disconnect()
					.then(() => {
						$state.go('app.prelogin', {}, {reload: true})
					})
				},
				syncData(id) {
					usersService.syncData(id).then(() => {
						alert('Sync !')
					})
				}
			})
		}]
	})
})(angular.module('app.common'))
