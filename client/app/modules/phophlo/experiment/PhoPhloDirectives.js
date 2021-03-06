console.log("Loading the PhoPhloDirectives.");

'use strict';
define(
    [ "angular" ],
    function(angular) {
      var PhoPhloDirectives = angular
          .module('PhoPhlo.directives', [])
          .directive(
              'stimuli2',
              function($compile) {
                return function(scope, element, attrs) {
                  var i = 0;
                  var j = 1;
                  var startTime;
                  var finishTime;
                  var responseTime;
                  scope
                      .$watch(
                          'stimuli',
                          function() {
                            if (scope.stimuli != undefined) {
                              element
                                  .html("<div class='span4'><img id='"
                                      + scope.topImage
                                      + "' src='image_stimuli/"
                                      + scope.topImage
                                      + "' coordinates-click><br /><img id='"
                                      + scope.bottomImage
                                      + "' src='image_stimuli/"
                                      + scope.bottomImage
                                      + "' coordinates-click></div><div class='span6 pagination-centered'><img id='"
                                      + scope.practiceImage
                                      + "' src='image_stimuli/"
                                      + scope.practiceImage
                                      + "' coordinates-click></img><br><button class='btn btn-success'><h1>START</h2></button></div><audio src='audio_stimuli/"
                                      + scope.instructions
                                      + "' autoplay></audio>");
                              $compile(element.contents())(scope);
                              element
                                  .click(function() {
                                    if (i > 0 && i <= scope.audio.length) {
                                      scope.results[i - 1].audio = scope.audio[i - 1];
                                    }

                                    // Get response time
                                    if (i == 0) {
                                      startTime = new Date().getTime();
                                    }
                                    finishTime = new Date().getTime();
                                    responseTime = finishTime - startTime;
                                    startTime = finishTime;
                                    if (i > 0 && i <= scope.audio.length) {
                                      scope.results[i - 1].responseTime = responseTime;
                                    }

                                    // Log out results
                                    if (i > 0) {
                                      console.log("scope.results: "
                                          + JSON.stringify(scope.results));
                                    }
                                    if (i < scope.practiceNumber) {
                                      element
                                          .html("<div class='span4'><img id='"
                                              + scope.topImage
                                              + "' src='image_stimuli/"
                                              + scope.topImage
                                              + "' coordinates-click><br /><img id='"
                                              + scope.bottomImage
                                              + "' src='image_stimuli/"
                                              + scope.bottomImage
                                              + "' coordinates-click></div><div class='span6 pagination-centered'><img id='"
                                              + scope.practiceImage
                                              + "' src='image_stimuli/"
                                              + scope.practiceImage
                                              + "' coordinates-click></img></div><audio src='audio_stimuli/"
                                              + scope.audio[i]
                                              + "' autoplay></audio>");
                                      $compile(element.contents())(scope);
                                      i++;
                                    } else if (i < scope.audio.length) {
                                      if (i == scope.practiceNumber) {
                                        window.alert("Ready to start?");
                                      }
                                      if (j < 10) {
                                        j = "0" + j;
                                      }
                                      ;
                                      element
                                          .html("<div class='span4'><img id='"
                                              + scope.topImage
                                              + "' src='image_stimuli/"
                                              + scope.topImage
                                              + "' coordinates-click><br /><img id='"
                                              + scope.bottomImage
                                              + "' src='image_stimuli/"
                                              + scope.bottomImage
                                              + "' coordinates-click></div><div class='span6'><img id='"
                                              + scope.reinforcement
                                              + "' src='image_stimuli/r"
                                              + j
                                              + "_"
                                              + scope.reinforcement
                                              + "' coordinates-click></img></div><audio src='audio_stimuli/"
                                              + scope.audio[i]
                                              + "' autoplay></audio>");
                                      $compile(element.contents())(scope);
                                      i++;
                                      j++;
                                    } else if (i == scope.audio.length) {
                                      element
                                          .html("<div class='span4'><img id='"
                                              + scope.topImage
                                              + "' src='image_stimuli/"
                                              + scope.topImage
                                              + "'><br /><img id='"
                                              + scope.bottomImage
                                              + "' src='image_stimuli/"
                                              + scope.bottomImage
                                              + "'></div><div class='span6 pagination-centered'><img id='"
                                              + scope.congratulations
                                              + "' src='image_stimuli/"
                                              + scope.congratulations
                                              + "'></img><br /><button type='button' class='btn-large btn-success' ng-click='congratulationsScreen()'>Continue</button></div>");
                                      $compile(element.contents())(scope);
                                      i++;
                                    }
                                  });

                            }
                          });
                };
              }).directive("coordinatesClick", function(mouse) {

            // Connect the Angular context to the DOM events.
            var linkFunction = function(scope, element, attrs) {
              // Get the expression we want to evaluate on the
              // scope when the document is clicked.
              var scopeExpression = attrs.coordinatesClick;

              // Bind to the element click event.
              element.on("click", function(event) {

                // Set the click coordinates in the mouse
                // service.
                mouse.setLocation(event.pageX, event.pageY);
                var imageX = event.pageX - element[0].offsetLeft;
                var imageY = event.pageY - element[0].offsetTop;

                // Push experiment data to results array
                var i;
                if (scope.results.length == 0) {
                  i = 0;
                } else {
                  i = scope.results.length;
                }
                if (i < scope.audio.length) {
                  scope.results.push({});
                  scope.results[i].imageClicked = element[0].id;
                  scope.results[i].pageX = event.pageX;
                  scope.results[i].pageY = event.pageY;
                  scope.results[i].imageX = imageX;
                  scope.results[i].imageY = imageY;
                  i++;
                }

                // Apply the scope expression so the
                // handler is invoked and the digest()
                // method is invoked implicitly.
                scope.$apply(scopeExpression);
              });

            };

            // Return the linking function.
            return (linkFunction);
          });

      return PhoPhloDirectives;
    });