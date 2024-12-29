# Yearplan

A project for generating a year planner, with public holidays (England and Wales) and custom events marked on the calendar.

The calendar is intended to be printed on a single A1 sheet in landscape mode. 

The project was originally created very quickly for 2025: the year where content planning and *actually* posting became important. As such, the code isn't going to be professional grade, and will be left open to improvements for the next year.

This project was initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3, and jump-started with the help of ChatGPT.

## TODOs
- Address events that span more than one month.
- With events spanning multiple days: do you want to display the event name more than once?
- Update the appearance of the events list in the events editor component.
- Update the appearance of the events editor: perhaps a floating, collapsible panel?
- Investigate why the navbar is not sticky.
- Ability to update existing events.
- Use icons where necessary.
- Review the colours used for custom events, public holidays and weekends.
- The list of events on the calendar should wrap onto multiple columns, if necessary.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
