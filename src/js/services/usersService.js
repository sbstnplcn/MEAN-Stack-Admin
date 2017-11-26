'use strict';

((app) => {
	app.service('usersService', ['$http', '$cookies', '$q', '$window', function ($http, $cookies, $q, $window) {
		return {
			get() {
				return $http.get('/api/users')
			},
			getById(id) {
				return $http.get(`/api/users/${ id }`)
			},
			getByIdAndPopulate(id) {
				return $http.get(`/api/users/populate/${ id }`)
			},
			add(newUser) {
				return $http.post('/api/users', newUser)
			},
			edit(user) {
				return $http.put(`/api/users/${ user._id }`, user)
			},
			delete(user) {
				return $http.delete(`/api/users/${ user._id }`)
			},
			resetPassword(user) {
				return $http.post('/api/resetPassword', user)
			},
			connect(data) {
				return $http.post('/api/connect', data).then((res) => {
					this.currentUser = res.data.user
					$cookies.put('token', res.data.token)
					return this.getCurrent()
				})
			},
			disconnect() {
				return new Promise((resolve) => {
					$cookies.remove('token')
					this.currentUser = null
					resolve()
				})
			},
			getCurrent() {
				const deferred = $q.defer()
				if (!$cookies.get('token')) {
					deferred.reject()
				} else if (!this.currentUser) {
					let payload = $cookies.get('token').split('.')[1]
					payload = $window.atob(payload)
					payload = JSON.parse(payload)
					if (Math.round(new Date().getTime() / 1000) > payload.exp) {
						return this.disconnect()
					}
					this.getById(payload._doc._id).then((res) => {
						this.currentUser = res.data
						deferred.resolve(this.currentUser)
					})
				} else {
					deferred.resolve(this.currentUser)
				}
				return deferred.promise
			},
			send(message) {
				return $http.post('/api/message/send/', message)
			},
			upload(image) {
				return new Promise((resolve, reject) => {
					const url = '/api/upload'
					const xhr = new XMLHttpRequest()
					const fd = new FormData()
					xhr.open('POST', url, true)
					//  xhr.setRequestHeader("Authorization", this.$cookies.get('token'));
					xhr.onreadystatechange = function (e) {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								resolve()
							} else {
								reject()
							}
						}
					}
					fd.append('image', image)
					xhr.send(fd)
				})
			},
			syncData(id) {
				return $http.get(`/api/syncData/${ id }`)
			}
		}
	}])
})(angular.module('app.services'))
