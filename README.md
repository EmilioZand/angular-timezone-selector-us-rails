# Timezone selector for Angular JS

A simple AngularJS directive to create timezone select. It uses [chosen](harvesthq.github.io/chosen/) to create auto-complete timezone select.

This is a modified version that only uses timezones for the US and adds timezones from tz rails.

The user is able to choose their timezone by either typing the name of their country, or the name of the timezone directly.

## Usage

Install using bower

```
bower install angular-timezone-selector-us-rails
```

Make your Angular module depend on module `angular-timezone-selector`.

```javascript
angular.module('timezoneSelectExample', ['angular-timezone-selector']);
```

Then use directive `timezone-selector`.

```html
<timezone-selector ng-model="timezone">
```

# Attributions
Forked from [angular-timezone-selector](https://github.com/mishguruorg/angular-timezone-selector) from [mishguruorg](https://github.com/mishguruorg)

Inspired by [angular-timezone-select](https://github.com/alexcheng1982/angular-timezone-select) from [alexcheng1982](https://github.com/alexcheng1982).

Styled using the examples from [bootstrap-chosen](https://github.com/alxlit/bootstrap-chosen) by [alxlit](https://github.com/alxlit)
