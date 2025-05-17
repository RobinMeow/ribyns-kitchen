# Ribyn's Kitchen

Welcome to Ribyn's Kitchen, a place where users can share and explore recipes within a specific community (e.g., family and friends).

## Project

- [Angular](client/README.md) - Frontend
- [Web API](./Application/README.md) Server
- [Seed MongoDB](seed-mongo-db/README.md) - seeding script for local development.

## Requirements

- The app should recalculate quantities based on the desired _number of dishes_ selected by the user.
- A _Recipe_ is considered unique based on the combination of _Author_ and _RecipeName_ (composite key).
- _Ingredients_ should be reusable to avoid different spellings for the same _ingredient_. When adding an _Ingredient_ to a _Recipe_, the user should be able to select existing _ingredients_. If there is no existing one, it will create a new _ingredient_ automatically. (In a later version it might be desired, to have a way of merging ingredients. If there were duplicates created with different spellings.)
- _Recipes_ should be _categorizable_ or _taggable_ for better _search_- and _filtering_.
- A _Recipe_ can contain _multiple descriptions **and** notes_, which should be displayed accordingly. The ability to reorder the display of _descriptions_, _notes_ and _ingredients_ through drag and drop may be desirable.
- The frontend only needs to support the German language; internationalization is not required. (Multiple languages would cause trouble anyways because our culinary skills are multicultural.)
- Access to the app should be restricted to a specific group of people using a provided "key".
- Each user should have the ability to _exclude recipes_ from _search results_ based on the _recipe's author_. This setting should not be visible to other users.
- Consider implementing a _Like/Dislike system_ for recipes. Only positive likes should be public, while dislikes remain for private use.

> Note/ToDo: There are additional requirements documented in Confluence => Which are now avilable in the pdf located in the root of this repository.

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobinMeow/ribyns-kitchen/blob/master/LICENSE)

This project is licensed under the terms of the [MIT license](LICENSE).

## Contact

Feel free to reach out to me by sending an email to [robinmeow97@gmail.com](mailto:robinmeow97@gmail.com).

If you appreciate my efforts and would like to support me, you can show your appreciation by [buying me a coffee](https://ko-fi.com/ribyn)! ☕️

> Just as Jesus broke bread with his disciples, may you find fellowship and connection in sharing meals, and may your culinary endeavors be a reflection of love and unity.

## Fun

Fun to watch what has been done in the project: [gource](https://gource.io/)

> `gource -1600x900 --seconds-per-day 3 --auto-skip-seconds 1 --file-idle-time 0 --max-file-lag 0.5 --title "Ribyn's Kitchen"`
