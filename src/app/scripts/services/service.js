

(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name fs.fsModal
    */


    angular.module('fs-angular-dock',[])
    .service('fsDock', function ($compile, $controller, $rootScope, $q, $injector, $sce, $templateRequest) {

        var service = {
            show: show,
            hide: hide
        };

        return service;

        function show(options) {

        	var promises = {};
        	options.anchor = options.anchor || 'left';
        	if(options.resolve) {
        		angular.forEach(options.resolve,function(value,name) {
        			promises[name] = $injector.invoke(value);
        		});
        	}

        	$q.all(promises)
        	.then(function(inject) {

	        	var container = angular.element(document.querySelector('.fs-dock-container'));
	        	container.remove();

	        	container = angular.element('<div>')
	        					.addClass('fs-dock-container')
	        					.attr('ng-style','{{dock.style}}');

	        	angular.element(document.body).append(container);

	        	$q(function(resolve) {

	        		if(options.template) {
	        			return resolve(options.template);
	        		}

    				$templateRequest($sce.getTrustedResourceUrl(options.templateUrl))
    				.then(resolve);

		        }).then(function(template) {

		       		var template = [
		                    '<div aria-label="Dock" class="fs-dock {{ dock.options.class }}">',
		                    '  <div class="fs-dock-header" ng-show="dock.options.title" layout="row" layout-align="start center"><div flex>' + options.title + '</div><a href ng-click="hide()"><md-icon>clear</md-icon></a></div>',
		                    '  <div class="fs-dock-content">' + template + '</div>',
		                    '</div>'
		                    ].join('');

		            container.append(template);

		            var scope = $rootScope.$new();
		            scope.hide = hide;

		            var controller = $controller(options.controller,angular.extend({ $scope: scope },inject));
		            scope.dock = controller;
		            scope.dock.options = options;
		            scope.dock.style = {};
		            scope.dock.style[options.anchor] = '0';

		            $compile(container)(scope);
		        });
	        });
        }

        function hide() {
        	angular.element(document.querySelector('.fs-dock-container')).remove();
        }
    });
})();
