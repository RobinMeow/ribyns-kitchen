# Ribyn's Kitchen

Welcome to Ribyn's Kitchen, a place where users can share and explore recipes within a specific community (e.g., family and friends).

## Project

- [Angular](client/README.md) - Frontend
- [Web API](./Application/README.md) Server
- [Seed MongoDB](seed-mongo-db/README.md) - seeding script for local development.

## Requirements

- The app should recalculate quantities based on the desired *number of dishes* selected by the user.
- A *Recipe* is considered unique based on the combination of *Author* and *RecipeName* (composite key).
- *Ingredients* should be reusable to avoid different spellings for the same *ingredient*. When adding an *Ingredient* to a *Recipe*, the user should be able to select existing *ingredients*. If there is no existing one, it will create a new *ingredient* automatically. (In a later version it might be desired, to have a way of merging ingredients. If there were duplicates created with different spellings.)
- *Recipes* should be *categorizable* or *taggable* for better *search*- and *filtering*.
- A *Recipe* can contain *multiple descriptions **and** notes*, which should be displayed accordingly. The ability to reorder the display of *descriptions*, *notes* and *ingredients* through drag and drop may be desirable.
- The frontend only needs to support the German language; internationalization is not required. (Multiple languages would cause trouble anyways because our culinary skills are multicultural.)
- Access to the app should be restricted to a specific group of people using a provided "key".
- Each user should have the ability to *exclude recipes* from *search results* based on the *recipe's author*. This setting should not be visible to other users.
- Consider implementing a *Like/Dislike system* for recipes. Only positive likes should be public, while dislikes remain for private use.

> Note/ToDo: There are additional requirements documented in Confluence => Which are now avilable in the pdf located in the root of this repository.

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobinMeow/ribyns-kitchen/blob/master/LICENSE)

This project is licensed under the terms of the [MIT license](LICENSE).

## Contact

Feel free to reach out to me by sending an email to [robinmeow97@gmail.com](mailto:robinmeow97@gmail.com).

If you appreciate my efforts and would like to support me, you can show your appreciation by [buying me a coffee](https://ko-fi.com/ribyn)! ☕️

> Just as Jesus broke bread with his disciples, may you find fellowship and connection in sharing meals, and may your culinary endeavors be a reflection of love and unity.
