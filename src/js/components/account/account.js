'use strict';

((app) => {
	app.component('account', {
		templateUrl: 'js/components/account/account.html',
		controller: ['usersService', '$stateParams', '$state', 'toaster', 'contentsService',
			function (usersService, $stateParams, $state, toaster, contentsService) {
				angular.extend(this, {
					$onInit() {

						this.loader = false
						this.i18n = 'fr'

						usersService.getCurrent().then((user) => {
							this.user = user
						})

						// // editMode // //
						//
						const previous = {}

						// edit
						this.editMode = false

						this.edit = (user) => {
							if (this.editMode) {
								user.password = user.newPassword
								usersService.edit(user).then(() => {
									this.i18n = 'fr'
									this.editMode = false
									toaster.success('Saved')

								})
							} else {
								this.i18n = 'fr'
								previous[user] = angular.copy(user)
								this.editMode = true
								toaster.info('Edit Mode ON')
							}
						}

						// cancel
						this.cancel = (user) => {
							this.i18n = 'fr'
							user = previous[user]
							this.user = user
							this.editMode = false
							toaster.info('Edit Mode Canceled')
						}

						// delete
						this.delete = (user) => {
							if (confirm('Sure to delete your account ? (not recommended)')) {
								usersService.delete(user).then(() => {
									toaster.error('User Deleted')
									usersService.disconnect().then(() => {
										$state.go('app.prelogin').then(() => {
											$state.reload()
										})
									})
								})
							}
						}

						this.addRetail = (retail) => {
							if (retail.places) retail.places.push({})
							else {
								retail.places = []
								retail.places.push({})
							}
						}

						this.uploadPlaceImage = (img, place, idx) => {
							this.loader = true
							contentsService.upload(img).then((res) => {
								place.img = res.secure_url
								this.newPlaceImg[idx] = res.secure_url
								this.loader = false
								toaster.pop('success', 'Retail Image Uploaded')
							}).catch(() => toaster.error('Fail Upload Retail Image'))
						}

						this.changePosition = (array, content, idx, change) => {
							const newIdx = idx + change
							array.splice(idx, 1)
							array.splice(newIdx, 0, content)
						}

						this.deletePlace = (places, idx) => {
							if (confirm('Sure to delete your content ?')) {
								places.splice(idx, 1)
								toaster.info('Content Deleted')
							}
						}

					}
				})
			}
		]
	})
})(angular.module('app.account', []))
