import slimScroll from 'jquery-slimscroll';

/**
 * INSPINIA - Responsive Admin Theme
 *
 */
/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
  'ngInject';
  return {
    link: function(scope, element) {
      var listener = function(event, toState, toParams, fromState, fromParams) {
        // Default title - load on Dashboard 1
        var title = 'INSPINIA | Responsive Admin Theme';
        // Create your own title pattern
        if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
        $timeout(function() {
          element.text(title);
        });
      };
      $rootScope.$on('$stateChangeStart', listener);
    }
  }
}
/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, element) {
      // Call the metsiMenu plugin and plug it to sidebar navigation
      $timeout(function() {
        element.metisMenu();
      });
    }
  };
}
/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'views/common/ibox_tools.html',
    controller: function($scope, $element) {
      'ngInject';
      // Function for collapse ibox
      $scope.showhide = function() {
          var ibox = $element.closest('div.ibox');
          var icon = $element.find('i:first');
          var content = ibox.find('div.ibox-content');
          content.slideToggle(200);
          // Toggle icon from up to down
          icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
          ibox.toggleClass('').toggleClass('border-bottom');
          $timeout(function() {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
          }, 50);
        },
        // Function for close ibox
        $scope.closebox = function() {
          var ibox = $element.closest('div.ibox');
          ibox.remove();
        }
    }
  };
}
/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'views/common/ibox_tools_full_screen.html',
    controller: function($scope, $element) {
      'ngInject';
      // Function for collapse ibox
      $scope.showhide = function() {
        var ibox = $element.closest('div.ibox');
        var icon = $element.find('i:first');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        $timeout(function() {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      };
      // Function for close ibox
      $scope.closebox = function() {
        var ibox = $element.closest('div.ibox');
        ibox.remove();
      };
      // Function for full screen
      $scope.fullscreen = function() {
        var ibox = $element.closest('div.ibox');
        var button = $element.find('i.fa-expand');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function() {
          $(window).trigger('resize');
        }, 100);
      }
    }
  };
}
/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    template: '<a class="navbar-minimalize minimalize-custom-style" href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
    controller: function($scope, $element) {
      'ngInject';
      $scope.minimalize = function() {
        $("body").toggleClass("mini-navbar");
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
          // Hide menu in order to smoothly turn on when maximize menu
          $('#side-menu').hide();
          // For smoothly turn on menu
          setTimeout(function() {
            $('#side-menu').fadeIn(400);
          }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
          $('#side-menu').hide();
          setTimeout(function() {
            $('#side-menu').fadeIn(400);
          }, 100);
        } else {
          // Remove all inline style from jquery fadeIn function to reset menu state
          $('#side-menu').removeAttr('style');
        }
      }
    }
  };
}
/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, element, $attrs, ngModel) {
      return $timeout(function() {
        var value;
        value = $attrs['value'];
        $scope.$watch($attrs['ngModel'], function(newValue) {
          $(element).iCheck('update');
        });
        $scope.$watch($attrs['ngDisabled'], function(newValue) {
          $(element).iCheck('update');
        })
        return $(element).iCheck({
          checkboxClass: 'icheckbox_square-green',
          radioClass: 'iradio_square-green'
        }).on('ifChanged', function(event) {
          if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
            $scope.$apply(function() {
              return ngModel.$setViewValue(event.target.checked);
            });
          }
          if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
            return $scope.$apply(function() {
              return ngModel.$setViewValue(value);
            });
          }
        });
      });
    }
  };
}

/**
 * set scroll
 */
function scrollThis($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, element) {
      setTimeout(function() {
        // if ($(element).attr('no-footer') == 'true') {
        //   element.height($(window).height() - element.offset().top - 70);
        // } else {
        //   element.height($(window).height() - element.offset().top - 95);
        // }
        let height = '';
        height = $(window).height() - element.offset().top - 48;
        if ($(element).attr('no-footer') == 'true') {
          height = $(window).height() - element.offset().top - 3;
        }
        var maxHeight = $(element).attr('max-height');
        // For some browsers, `maxHeight` is undefined; for others,
        // `maxHeight` is false.  Check for both.
        if (typeof maxHeight !== "undefined" && maxHeight !== false) {
          height = $(element).attr('max-height');
        }

        let anchor_position = 'top';
        let tmp_elem = $('#tmp_anchor_id') ? $('#tmp_anchor_id').attr('anchor') : 'top';
        if (tmp_elem != undefined && tmp_elem != 'top') {
          anchor_position = $('#' + tmp_elem);
        }

        element.slimScroll({
          height: height + 'px',
          start: anchor_position
        });
        // .bind('slimscrolling', function(e, pos){
        //   $(element).attr('anchor', pos);
        // });


        // element.css("overflow", "hidden");
        // // element.css("padding-right", "15px");
        // element.hover(function() {
        //   element.css("overflow-y", "scroll");
        //   // element.css("padding-right", "0px");
        // }, function() {
        //   element.css("overflow-y", "hidden");
        //   // element.css("padding-right", "15px");
        // });
      }, 50);
    }
  };
}


function sideMenu() {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.click(() => {
        element.find('.collapser').removeClass('active');
        element.find('.collapse').collapse('hide');
      });
    }
  }
}


function starRating() {
  return {
    restrict: 'EA',
    template:
      '<ul class="star-rating" ng-class="{readonly: readonly}">' +
      '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
      '    <i class="fa fa-star"></i>' + // or &#9733
      '  </li>' +
      '</ul>',
    scope: {
      ratingValue: '=ngModel',
      max: '=?', // optional (default is 5)
      onRatingSelect: '&?',
      readonly: '=?'
    },
    link: function(scope, element, attributes) {
      if (scope.max == undefined) {
        scope.max = 5;
      }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly === false){
          scope.ratingValue = index + 1;
          scope.onRatingSelect({
            rating: index + 1
          });
        }
      };
      scope.$watch('ratingValue', function(oldValue, newValue) {
        newValue = newValue || 0;
        if (newValue || newValue === 0) {
          updateStars();
        }
      });
    }
  };
}


export {
  pageTitle,
  sideNavigation,
  iboxTools,
  iboxToolsFullScreen,
  minimalizaSidebar,
  icheck,
  scrollThis,
  sideMenu,
  starRating
}
