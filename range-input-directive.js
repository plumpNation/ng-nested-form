(function (angular) {
    'use strict';

    var tpl = [
        '<div ng-form="fcvm.nestedForm" class="nested-form">',
            '<label for="lo">Lo: {{fcvm.ngModel.lo}}</label>',
            '<input id="lo" type="range" min="0" max="10" name="lo"',
                'ng-model="fcvm.ngModel.lo" >',

            '<label for="hi">Hi: {{fcvm.ngModel.hi}}</label>',
            '<input id="hi" type="range" min="0" max="10" name="hi"',
                'ng-model="fcvm.ngModel.hi" >',
        '</div>'
    ].join(' ');

    angular.module('nestedFormTest.inputs.range', [])
        .directive('rangeInput', function RangeInputDirective() {
            return {
                restrict: 'AE',

                scope: {
                    ngModel: '='
                },

                controllerAs: 'fcvm',
                bindToController: true,

                template: tpl,

                controller: RangeComponentController
            };
        });

    function RangeComponentController($scope, $timeout) {
        var self = this,

            validateRange = function (val) {
                if (!val) {
                    return;
                }

                // this is valid
                if (self.ngModel.lo >= self.ngModel.hi) {
                    console.warn('Setting invalidity of form component');
                    self.nestedForm.$setValidity('loIsMore', false);
                    return;

                } else {
                    console.log('Setting validity of form component');
                    self.nestedForm.$setValidity('loIsMore', true);
                }
            };

        $timeout(function () {
            console.info(self.nestedForm.$name, 'available in form-component scope');
        });

        $scope.$watch('fcvm.ngModel.lo', validateRange);
        $scope.$watch('fcvm.ngModel.hi', validateRange);
    }
}(window.angular));
