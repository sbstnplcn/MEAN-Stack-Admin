'use strict';

((app) => {
	app.directive('fileUpload', [function () {
		return {
			restrict: 'E',
			template: '<input type="file" />',
			replace: true,
			transclude: true,
			require: 'ngModel',
			link: (scope, element, attr, ctrl) => {
				if (!attr.class && !attr.ngClass) {
					element.addClass('btn')
				}
				function listener() {
					scope.$apply(() => attr.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]))
				}
				element.bind('change', listener)
			}
		}
	}])
})(angular.module('app.services'))
