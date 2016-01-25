angular.module('formTest', [])
    .run(function () {
        console.log('running formTest module');
    })
    .directive('formComponent', function () {
        return {
            restrict: 'AE',
            template: '<div ng-form="testForm"><input name="balls"></div>',

            controller: function ($scope) {
                debugger;
            }
        }
    });
