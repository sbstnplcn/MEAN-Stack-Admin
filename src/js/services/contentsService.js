'use strict';

((app) => {
	app.service('contentsService', ['$http', function ($http) {
		return {
			get() {
				return $http.get('/api/contents')
			},
			getById(id) {
				return $http.get(`/api/contents/${ id }`)
			},
			add(newContent) {
				return $http.post('/api/contents', newContent)
			},
			edit(selectedContent) {
				return $http.put(`/api/contents/${ selectedContent._id }`, selectedContent)
			},
			delete(selectedContent) {
				return $http.delete(`/api/contents/${ selectedContent._id }`)
			},
			upload(image) {
				return new Promise((resolve, reject) => {
					const url = '/api/upload'
					const xhr = new XMLHttpRequest()
					const fd = new FormData()
					xhr.open('POST', url, true)
					// xhr.setRequestHeader('Authorization', this.$cookies.get('token'))
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								resolve(JSON.parse(xhr.response))
							} else reject()
						}
					}
					fd.append('image', image)
					return xhr.send(fd)
				})
			}
		}
	}])
})(angular.module('app.services', []))
