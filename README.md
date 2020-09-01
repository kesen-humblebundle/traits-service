# Chris-app-traits

> This service renders a carousel of cards, each displaying a particular trait shared by the
> current product being viewed. Above the displayed trait are 4 thumbnail images that take the user to
> the represented product's product page when clicked on.

## Related Projects

- https://github.com/KichiUeda/Chris-app-service-overview
- https://github.com/KichiUeda/Rane-app-description-service
- https://github.com/KichiUeda/Micko_App_images_service
- https://github.com/KichiUeda/price_and_promotion
- https://KichiUeda/other_popular_games
- https://KichiUeda/Chris-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> must have mysql installed, v 5.7 used
> start mysql server
> from project root, run in command line -
> mysql -u root < database-sql/Schema.sql
> npm run seedDB
> npm run build
> npm start
> Navigate to

- https://127.0.0.1:3005

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

> Node 14.2 used for this project

- Node 6.13.0
- etc

## Development

> points of note include:
> using styled-components
> retrieving product id from browser - window.location.pathname
> creating carousel of cards with 4 images each with label
> images correspond to product id, when clicked, service changes to display content for the id/image clicked on
> devising a method to retrieve 30+ images from images service for any given product id
> generating 100 sets of random data and connections between them to be displayed in service using faker.js, seeding into MySql
> links below show sample response data:

- https://gist.github.com/Chris-Hesterman/4e51dda9c6a74451e3dfff59dbcdd977
- https://gist.github.com/Chris-Hesterman/a774bc9b8c91752189970608a33d25d4

> connecting to another services API to help expand on and sort random product data
> Making sure enough traits correspond to any product id and that each trait card has 4 thumnails to display
> deploying to AWS ec2 instance

- https://docs.google.com/document/d/13szAGho6CJYVl-xcwYetM6qGHoC2zH8Ik-sWd9i2-80/edit#

### Installing Dependencies

From within the root directory:

npm install
