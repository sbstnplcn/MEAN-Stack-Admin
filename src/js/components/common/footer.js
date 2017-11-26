'use strict';

((app) => {
	app.component('footer', {
		template: `	<section id="footer">
						<div class="page-footer teal">
							<div class="container">
								<p class="text-muted">Made by <a href="//www.github.com/sbstnplcn" target="_blank">@sbstnplcn</a></p>
							</div>
						</div>
					</section>`,
		controller: [function () {
			angular.extend(this, {
				$onInit() {


				}
			})
		}]
	})
})(angular.module('app.common', []))
