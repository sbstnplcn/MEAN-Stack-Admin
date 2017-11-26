'use strict';

((app) => {
	app.component('content', {
		templateUrl: 'js/components/content/content.html',
		controller: ['contentsService', '$stateParams', '$state', 'toaster', '$window', function (contentsService, $stateParams, $state, toaster, $window) {
			angular.extend(this, {
				$onInit() {
					contentsService.getById($stateParams.id).then((res) => {
						this.currentContent = res.data
					})

					this.loader = false
					this.i18n = 'fr'

					// // editMode // //
					//
					const previous = {}

					// edit
					// Main
					this.editMode = false

					this.edit = (content) => {
						if (this.editMode) {
							if (content.title.toLowerCase().split(' ').join('-') !== content._id) {
								if (confirm('Sure to change title ? you will be redirect to home')) {
									contentsService.edit(content).then(() => {
										$window.location.reload()
									})
								}
							} else {
								contentsService.edit(content).then(() => {
									$state.reload()
								})
							}
							this.i18n = 'fr'
							this.editMode = false
							toaster.success('Collection Saved !')
						} else {
							previous[content] = angular.copy(content)
							this.editMode = true
							toaster.info('Edit Mode ON !')
						}
					}

					// cancel
					this.cancel = (content) => {
						content = previous[content]
						this.currentContent = content
						this.i18n = 'fr'
						this.editMode = false
						toaster.info('Edit Canceled')
					}

					// delete
					this.delete = (content) => {
						if (confirm('Sure to delete your content ?')) {
							contentsService.delete(content)
							$state.go('app.home')
							$window.location.reload()
							toaster.info('Collection Deleted')
						}
					}

					// work
					this.addWork = (works) => {
						works.works.push({
							category: {
								en: '',
								fr: ''
							},
							img: '',
							description: {
								en: '',
								fr: ''
							}
						})
						toaster.success('Content Added')
					}

					this.deleteWork = (works, idx) => {
						if (confirm('Sure to delete your content ?')) {
							works.works.splice(idx, 1)
							toaster.info('Content Deleted')
						}
					}

					// works
					this.addWorks = (works) => {
						works.push({
							title: '',
							description: {
								en: '',
								fr: ''
							},
							img: '',
							works: [{
								img: '',
								category: {
									en: '',
									fr: ''
								},
								description: {
									en: '',
									fr: ''
								}
							}]
						})
					}

					this.deleteWorks = (works, idx) => {
						if (confirm('Sure to delete your content ?')) {
							works.splice(idx, 1)
							toaster.info('Content Deleted')
						}
					}

					// upload image
					this.uploadSpotlightImage = (img, works, idx) => {
						this.loader = true
						contentsService.upload(img).then((res) => {
							works.img = res.secure_url
							this.newSpotlightImg[idx] = res.secure_url
							this.loader = false
							toaster.pop('success', 'Spotlight Image Uploaded')
						}).catch(() => toaster.error('Fail Upload Spotlight Image'))
					}

					this.uploadWorkImage = (img, work, pidx, idx) => {
						this.loader = true
						contentsService.upload(img).then((res) => {
							work.img = res.secure_url
							this.newWorkImg[pidx][idx] = res.secure_url
							this.loader = false
							toaster.pop('success', 'Work Image Uploaded')
						}).catch(() => toaster.error('Fail Upload Work Image'))
					}

					this.changePosition = (array, content, idx, change) => {
						const newIdx = idx + change
						array.splice(idx, 1)
						array.splice(newIdx, 0, content)
					}
				}
			})
		}]
	})
})(angular.module('app.content', []))
