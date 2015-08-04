/*global angular, _,  $*/

/**
 * angular-timezone-selector
 *
 * A simple directive that allows a user to pick their timezone from the US
 *
 * Author:  Ashok Fernandez <ashok@mish.guru>, Emilio Zand<mail@emiliozand.com>
 * Date:    08/03/2015
 * License: MIT
 */

angular.module('angular-timezone-selector', [])
  .constant('_', _)

  // Timezone name to country codemap
  .factory('timezones', ['_', function (_) {
    // Note: zones is populated with the data from 'data/zone.csv' when this file is built
    var zones = []
    return zones
  }])

  .directive('timezoneSelector', ['_', 'timezones', function (_, timezones) {
    return {
      restrict: 'E',
      replace: true,
      template: '<select style="min-width:300px;"></select>',
      scope: {
        ngModel: '='
      },
      link: function ($scope, elem, attrs) {

        // Construct a select box with the timezones grouped by country
        var $optgroup = $('<optgroup label="United States">')
        timezones.forEach(function (option) {
          $optgroup.append('<option value="' + option.id + '">' +
            option.name + '</option>')
        })
        elem.append($optgroup)

        // Initialise the chosen box
        elem.chosen({
          width: '300px',
          include_group_label_in_selected: true,
          search_contains: true,
          no_results_text: 'No results, try searching for the name of your country or nearest major city.',
          placeholder_text_single: 'Choose a timezone'
        })

        // Update the box if ngModel changes
        $scope.$watch('ngModel', function () {
          elem.val($scope.ngModel)
          elem.trigger('chosen:updated')
        })
      }
    }
  }])
