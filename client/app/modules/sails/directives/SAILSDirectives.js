console.log("Loading the SAILSDirectives.");

'use strict';
define([ "angular" ], function(angular) {
	var SAILSDirectives = angular.module('SAILS.directives', []).directive(
			'moduleVersion', [ 'version', function(version) {
				return function(scope, elm, attrs) {
					elm.text(version);
				};
			} ]);
	return SAILSDirectives;
});