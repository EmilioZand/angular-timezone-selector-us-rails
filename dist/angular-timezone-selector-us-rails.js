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
    var zones = [{"id":"1","cca2":"US","name":"Pacific Time (US & Canada)"},{"id":"2","cca2":"US","name":"Mountain Time (US & Canada)"},{"id":"3","cca2":"US","name":"Central Time (US & Canada)"},{"id":"4","cca2":"US","name":"Eastern Time (US & Canada)"},{"id":"5","cca2":"US","name":"Arizona"},{"id":"6","cca2":"US","name":"Indiana (East)"},{"id":"7","cca2":"US","name":"Hawaii"},{"id":"8","cca2":"US","name":"Alaska"},{"id":"9","cca2":"US","name":"America/New_York"},{"id":"10","cca2":"US","name":"America/Detroit"},{"id":"11","cca2":"US","name":"America/Kentucky/Louisville"},{"id":"12","cca2":"US","name":"America/Kentucky/Monticello"},{"id":"13","cca2":"US","name":"America/Indiana/Indianapolis"},{"id":"14","cca2":"US","name":"America/Indiana/Vincennes"},{"id":"15","cca2":"US","name":"America/Indiana/Winamac"},{"id":"16","cca2":"US","name":"America/Indiana/Marengo"},{"id":"17","cca2":"US","name":"America/Indiana/Petersburg"},{"id":"18","cca2":"US","name":"America/Indiana/Vevay"},{"id":"19","cca2":"US","name":"America/Chicago"},{"id":"20","cca2":"US","name":"America/Indiana/Tell_City"},{"id":"21","cca2":"US","name":"America/Indiana/Knox"},{"id":"22","cca2":"US","name":"America/Menominee"},{"id":"23","cca2":"US","name":"America/North_Dakota/Center"},{"id":"24","cca2":"US","name":"America/North_Dakota/New_Salem"},{"id":"25","cca2":"US","name":"America/North_Dakota/Beulah"},{"id":"26","cca2":"US","name":"America/Denver"},{"id":"27","cca2":"US","name":"America/Boise"},{"id":"28","cca2":"US","name":"America/Phoenix"},{"id":"29","cca2":"US","name":"America/Los_Angeles"},{"id":"30","cca2":"US","name":"America/Anchorage"},{"id":"31","cca2":"US","name":"America/Juneau"},{"id":"32","cca2":"US","name":"America/Sitka"},{"id":"33","cca2":"US","name":"America/Yakutat"},{"id":"34","cca2":"US","name":"America/Nome"},{"id":"35","cca2":"US","name":"America/Adak"},{"id":"36","cca2":"US","name":"America/Metlakatla"},{"id":"37","cca2":"US","name":"Pacific/Honolulu"}]
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
