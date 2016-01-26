(function (angular) {
    'use strict';

    angular.module('nestedFormTest', ['nestedFormTest.inputs.range'])
        .run(function () {
            console.log('`nestedFormTest` module running');
        })
        .controller('MainCtrl', MainController);

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
                alert('Submitting form');
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
