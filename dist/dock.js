
(function () {
    'use strict';

    angular.module('fs-angular-dock',[])
    .directive('fsDock', function($location) {
        return {
            templateUrl: 'views/directives/template.html',
            restrict: 'E',
            transclude: true,
            scope: {
               selected: "@fsSelected"
            },
            link: function($scope, element, attrs) {

            }
        };
    });
})();
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name fs.fsModal
    */


    angular.module('fs-angular-dock',[])
    .service('fsDock', function ($compile, $controller, $rootScope, $q, $injector) {

        var service = {
            show: show,
            hide: hide
        };

        return service;

        function show(options) {

        	var promises = {};
        	if(options.resolve) {
        		angular.forEach(options.resolve,function(value,name) {
        			promises[name] = $injector.invoke(value);
        		});
        	}

        	$q.all(promises)
        	.then(function(inject) {

	        	var container = angular.element(document.querySelector('.fs-dock-container'));

	        	if(!container.length) {
	        		container = angular.element('<div>').addClass('fs-dock-container');
	        		angular.element(document.body).append(container);
	        	}

	        	container.empty();

	       		var template = [
	                    '<div aria-label="Dock" class="fs-dock {{ dock.options.class }}">',
	                    '  <div class="fs-dock-header" ng-show="dock.options.title">{{dock.options.title}}</div>',
	                    '  <div class="fs-dock-content">' + options.template + '</div>',
	                    '</div>'
	                    ].join('');

	            container.append(template);

	            var scope = $rootScope.$new();
	            scope.hide = hide;

	            var controller = $controller(options.controller,angular.extend({ $scope: scope },inject));
	            scope.dock = controller;
	            scope.dock.options = options;

	            $compile(container.contents())(scope);
	        });
        }

        function hide() {
        	angular.element(document.querySelector('.fs-dock-container')).remove();
        }
    });
})();
angular.module('fs-angular-dock').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/template.html',
    "fs-angular template"
  );

}]);
