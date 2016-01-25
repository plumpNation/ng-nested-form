(function (angular) {
    'use strict';

    angular.module('nestedFormTest', [])
        .run(function () {
            console.log('`nestedFormTest` module running');
        })
        .controller('MainCtrl', MainController)
        .directive('rangeComponent', function RangeComponentDirective() {
            return {
                restrict: 'AE',

                scope: {
                    ngModel: '='
                },

                controllerAs: 'fcvm',
                bindToController: true,

                template: [
                    '<div ng-form="fcvm.nestedForm" class="nested-form">',
                        '<label for="lo">Lo: {{fcvm.ngModel.lo}}</label>',
                        '<input id="lo" type="range" min="0" max="10" name="lo"',
                            'ng-model="fcvm.ngModel.lo" >',

                        '<label for="hi">Hi: {{fcvm.ngModel.hi}}</label>',
                        '<input id="hi" type="range" min="0" max="10" name="hi"',
                            'ng-model="fcvm.ngModel.hi" >',
                    '</div>'
                ].join(' '),

                controller: RangeComponentController
            };
        });

    function RangeComponentController($scope, $timeout) {
        var self = this,

            LO_IS_MORE = 'loIsMore',

            validateRange = function (val) {
                if (!val) {
                    return;
                }

                // this is valid
                if (self.ngModel.lo >= self.ngModel.hi) {
                    console.warn('Setting invalidity of form component');
                    self.nestedForm.$setValidity(LO_IS_MORE, false);
                    return;

                } else {
                    console.log('Setting validity of form component');
                    self.nestedForm.$setValidity(LO_IS_MORE, true);
                }
            };

        $timeout(function () {
            console.info(self.nestedForm.$name, 'available in form-component scope');
        });

        $scope.$watch('fcvm.ngModel.lo', validateRange);
        $scope.$watch('fcvm.ngModel.hi', validateRange);
    }

    function MainController($scope, $timeout) {
        var self = this;

        console.info('controller running');

        self.requiredText = 'Delete this to see required';

        self.range1 = {
            'lo': 0,
            'hi': 5
        };

        self.range2 = {
            'lo': 0,
            'hi': 5
        };

        self.range3 = {
            'lo': 0,
            'hi': 5
        };

        self.range4 = {
            'lo': 0,
            'hi': 5
        };

        self.range5 = {
            'lo': 0,
            'hi': 5
        };

        self.onSubmit = function () {
            if (self.rootForm.$valid) {
                console.log('Submitting form');
                return;
            }

            alert('No way man! Clear up your mess first!');
        };

        $timeout(function () {
            // form only available after digest is run
            console.info(self.rootForm.$name, 'available on main scope');
        });

        $scope.$watch(function () {
            return self.rootForm.$valid;

        }, function (isNowValid) {
            if (isNowValid) {
                console.log(self.rootForm.$name, 'has become valid');
                return;
            }

            console.warn(
                self.rootForm.$name,
                'has become invalid with message',
                self.rootForm.$error
            );
        });
    }
}(window.angular));
