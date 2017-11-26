'use strict';

((app) => {
	app.component('home', {
		templateUrl: 'js/components/home/home.html',
		controller: ['usersService', 'contentsService', '$window', function (usersService, contentsService, $window) {
			angular.extend(this, {
				$onInit() {
					usersService.getCurrent().then((user) => {
						this.currentUser = user
						this.content = []
						this.currentUser.content.forEach((el, idx) => {
							contentsService.getById(el).then((res) => {
								this.content[idx] = res.data
							})
						})
					})
					this.newSerie = (user) => {
						const random = Math.floor(Math.random() * 1000)
						const newContent = {
							userId: user._id,
							title: `New Serie ${ random }`,
							_id: `new-serie-${ random }`,
							active: false,
							img: '',
							works: [{
								title: 'title',
								description: {
									en: '',
									fr: ''
								},
								img: 'img',
								works: [{
									category: {
										en: '',
										fr: ''
									},
									img: 'img',
									text: {
										en: '',
										fr: ''
									}
								}]
							}]
						}
						contentsService.add(newContent).then(() => {
							$window.location.reload()
						})
					}
				}
			})
		}]
	})
})(angular.module('app.home', []))
