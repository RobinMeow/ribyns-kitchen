# UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## ToDo

- Set up an HTTP error handler and message service properly and implement some (back-end?) logging for errors.
- For more, [see requirements](../README.md#requirements)

## Notes

Actually, haven't done anything in the front end, except set up a simple text field with reactive forms (which is to be extended once I finish the actual Domain Model) and implement some necessary stuff to test and develop. The whole front-end still needs to be designed and created.

## Deployment

run `ng build --configuration=production`, then `firebase deploy`. Make sure you are logged in, in the correct firebase account `firebase login`, and have the correct firebase project selected. `ng deploy` will not work, because it is not set up (I need to delete all firebase stuff in the ui folder and rerun `firebase init` or so idk, tbh, last time ng deploy was automatically set up).

## Domain vs Infrastructure (Outdated I think, its feature-by-folder with domain structure. maybe a little vertical slice structure)

`/app` never is allowed to access the infrastructure layer. Only the Domain is allowed to make use of the infrastructure.
The incrastructure contains 3rd-party libraries, like i18n or open-api generated files.

The domain contains `feature-`'s (usually smart components which are routable, and hard to reuse).
As well as `ui`'s (usually dumb components, reuseable) and utils which usually contains pipes (relating to the domain) and such.

## Adding domain prefixes

in `.eslintrc` add the prefixes to the `@angular-eslint` properties.

## Testing jasmine and Cypress

Jasmine:

- run `ng test` to run all spec.ts files
- for intellisense, go to `tsconfig.json`, scroll to the bottom and follow the comments to enable jasmine types (this will disable cypress types, because the conflict each other)
- use --include filepath to run specified files

Cypress:

- run `yarn run cypress open` and follow the browser to test e2e or component

## scss angular problems

I would like to to tsconfig paths for sccs files, but they arent working for ng test. They do work for ng build.
This has been a problem since 2016 (or earlier) in angular, has is slowly fixing. Just dont wait fo rit.
=> This means you have to use releative paths for scss files, even tho using `@use '@myName' as *;` will work for ng build ..
