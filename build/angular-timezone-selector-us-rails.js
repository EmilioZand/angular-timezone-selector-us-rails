/*global angular, _, moment, $*/

/**
 * angular-timezone-selector
 *
 * A simple directive that allows a user to pick their timezone
 *
 * Author:  Ashok Fernandez <ashok@mish.guru>
 * Date:    12/06/2015
 * License: MIT
 */

angular.module('angular-timezone-selector', [])
  .constant('_', _)
  .constant('moment', moment)
  .factory('timezones', ['_', 'moment', function (_, moment) {
    var timezoneMap = {}
    _.forEach(moment.tz.names(), function (zoneName) {
      timezoneMap[zoneName] = {
        id: zoneName,
        name: zoneName.replace(/_/g, ' '),
        offset: 'UTC' + moment().tz(zoneName).format('Z')
      }
    })
    return timezoneMap
  }])

  // Timezone name to country codemap
  .factory('zoneToCC', ['_', function (_) {
    // Note: zones is populated with the data from 'data/zone.csv' when this file is built
    var zones = [{"id":"1","cca2":"US","name":"Pacific Time (US & Canada)"},{"id":"2","cca2":"US","name":"Mountain Time (US & Canada)"},{"id":"3","cca2":"US","name":"Central Time (US & Canada)"},{"id":"4","cca2":"US","name":"Eastern Time (US & Canada)"},{"id":"5","cca2":"US","name":"Arizona"},{"id":"6","cca2":"US","name":"Indiana (East)"},{"id":"7","cca2":"US","name":"Hawaii"},{"id":"8","cca2":"US","name":"Alaska"},{"id":"9","cca2":"US","name":"America/New_York"},{"id":"10","cca2":"US","name":"America/Detroit"},{"id":"11","cca2":"US","name":"America/Kentucky/Louisville"},{"id":"12","cca2":"US","name":"America/Kentucky/Monticello"},{"id":"13","cca2":"US","name":"America/Indiana/Indianapolis"},{"id":"14","cca2":"US","name":"America/Indiana/Vincennes"},{"id":"15","cca2":"US","name":"America/Indiana/Winamac"},{"id":"16","cca2":"US","name":"America/Indiana/Marengo"},{"id":"17","cca2":"US","name":"America/Indiana/Petersburg"},{"id":"18","cca2":"US","name":"America/Indiana/Vevay"},{"id":"19","cca2":"US","name":"America/Chicago"},{"id":"20","cca2":"US","name":"America/Indiana/Tell_City"},{"id":"21","cca2":"US","name":"America/Indiana/Knox"},{"id":"22","cca2":"US","name":"America/Menominee"},{"id":"23","cca2":"US","name":"America/North_Dakota/Center"},{"id":"24","cca2":"US","name":"America/North_Dakota/New_Salem"},{"id":"25","cca2":"US","name":"America/North_Dakota/Beulah"},{"id":"26","cca2":"US","name":"America/Denver"},{"id":"27","cca2":"US","name":"America/Boise"},{"id":"28","cca2":"US","name":"America/Phoenix"},{"id":"29","cca2":"US","name":"America/Los_Angeles"},{"id":"30","cca2":"US","name":"America/Anchorage"},{"id":"31","cca2":"US","name":"America/Juneau"},{"id":"32","cca2":"US","name":"America/Sitka"},{"id":"33","cca2":"US","name":"America/Yakutat"},{"id":"34","cca2":"US","name":"America/Nome"},{"id":"35","cca2":"US","name":"America/Adak"},{"id":"36","cca2":"US","name":"America/Metlakatla"},{"id":"37","cca2":"US","name":"Pacific/Honolulu"}]
    var zoneMap = {}
    _.forEach(zones, function (zone) {
      zoneMap[zone.name] = zone.cca2
    })
    return zoneMap

  }])

  // Country code to country name map
  .factory('CCToCountryName', ['_', function (_) {
    // Note: codes is populated with the data from 'data/cca2_to_country_name.csv' when this file is built
    var codes = [{"cca2":"US","name":"United States"}]
    var codeMap = {}
    _.forEach(codes, function (code) {
      codeMap[code.cca2] = code.name
    })
    return codeMap
  }])

  .directive('timezoneSelector', ['_', 'timezones', 'zoneToCC', 'CCToCountryName', function (_, timezones, zoneToCC, CCToCountryName) {
    return {
      restrict: 'E',
      replace: true,
      template: '<select style="min-width:300px;"></select>',
      scope: {
        ngModel: '='
      },
      link: function ($scope, elem, attrs) {
        var data = []

        // Group the timezones by their country code
        var timezonesGroupedByCC = {}
        _.forEach(timezones, function (timezone) {
          if (_.has(zoneToCC, timezone.id)) {
            var CC = zoneToCC[timezone.id]
            timezonesGroupedByCC[CC] = !timezonesGroupedByCC[CC] ? [] : timezonesGroupedByCC[CC]
            timezonesGroupedByCC[CC].push(timezone)
          }
        })

        // Add the grouped countries to the data array with their country name as the group option
        _.forEach(timezonesGroupedByCC, function (zonesByCountry, CC) {
          var zonesForCountry = {
            text: CCToCountryName[CC] + ': ',
            children: zonesByCountry
          }

          data.push(zonesForCountry)
        })

        // Sort by country name
        data = _.sortBy(data, 'text')

        // Construct a select box with the timezones grouped by country
        _.forEach(data, function (group) {
          var $optgroup = $('<optgroup label="' + group.text + '">')
          group.children.forEach(function (option) {
            $optgroup.append('<option value="' + option.id + '">' +
              option.name + '</option>')
          })
          elem.append($optgroup)
        })

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
