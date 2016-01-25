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
                    '<input type="range" min="0" max="10" name="lo" ng-model="fcvm.ngModel.lo" >' +
                    '<p>{{fcvm.ngModel.lo}}</p>' +
                    '<input type="range" min="0" max="10" name="hi" ng-model="fcvm.ngModel.hi" >' +
                    '<p>{{fcvm.ngModel.hi}}</p>' +
                '</div>',

                controller: FormComponentController
            };
        });

    function FormComponentController($scope, $timeout) {
        var self = this,

            validateRange = function (val) {
                var isValid = true;;

                if (!val) {
                    return;
                }

                // this is valid
                isValid = self.ngModel.lo < self.ngModel.hi;

                self.nestedForm.$setValidity('LO_IS_MORE', self.ngModel.lo < self.ngModel.hi);
            };

        $timeout(function () {
            console.info(self.nestedForm.$name, 'available in form-component scope');
        });

        $scope.$watch('fcvm.ngModel.lo', validateRange);
        $scope.$watch('fcvm.ngModel.hi', validateRange);
    }

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
            if (isNowValid) {
                console.info(self.rootForm.$name, 'has become valid');
            }

            console.info(
                self.rootForm.$name,
                'has become invalid with message',
                self.rootForm.$error
            );
        });
    }
}(window.angular));
