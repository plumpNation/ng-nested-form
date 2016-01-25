(function (angular) {
    'use strict';

    angular.module('nestedFormTest', [])
        .run(function () {
            console.log('formTest module running');
        })
        .controller('MainCtrl', MainController)
        .directive('formComponent', function () {
            return {
                restrict: 'AE',
                require: '^ngModel',

                scope: {
                    ngModel: '='
                },

                controllerAs: 'fcvm',
                bindToController: true,

                template: '<div ng-form="fcvm.nestedForm">' +
                    '<input name="lo" ng-model="fcvm.ngModel.lo" >' +
                    '<input name="hi" ng-model="fcvm.ngModel.hi" >' +
                '</div>',

                controller: function ($timeout) {
                    var self = this;

                    $timeout(function () {
                        console.info(self.nestedForm.$name, 'available in form-component scope');
                    });
                }
            };
        });

    function MainController($scope, $timeout) {
        var self = this;

        console.log('controller running');

        self.range = {'lo': 0, 'hi': 2};

        $timeout(function () {
            // form only available after digest is run
            console.info(self.rootForm.$name, 'available on main scope');
        });

        $scope.$watch(function () {
            return self.rootForm.$valid;

        }, function (isNowValid) {
            console.info(self.rootForm.$name, 'has become', isNowValid ? 'valid' : 'invalid');
        });
    }
}(window.angular));
