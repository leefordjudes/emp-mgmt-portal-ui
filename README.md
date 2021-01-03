# Project Creation Steps

ng new emp-mgmt-portal-ui --minimal=true --inlineStyle=false --inlineTemplate=false --routing=true --skipTests=true --style=css --strict=false

npm i bootstrap jquery @popperjs/core bootstrap-icons moment lodash

ng g c department
ng g c department/show-dep
ng g c department/add-edit-dep

ng g c employee
ng g c employee/show-emp
ng g c employee/add-edit-emp

ng g s shared/shared

update following line in angular.json

  "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/bootstrap-icons/font/bootstrap-icons.css",
    "src/styles.css"
  ],
  "scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/@popperjs/core/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],
  "allowedCommonJsDependencies": [
    "lodash"
  ]

# EmpMgmtPortalUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
