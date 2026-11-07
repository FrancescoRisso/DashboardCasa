# My home dashboard

A dashboard to show all the useful current data in my house.

This is the code branch, it contains the larger, more readable version. In order to deploy the compact version, visit the [build branch](https://github.com/FrancescoRisso/DashboardCasa/tree/build).

Please create a `SQLsettings.json` file in the server folder containing the credentials for the database. A sample one is already present (`SQLsettings-sample.json`)

## Repo structure

At every time, there are between 2 and 4 branches active in the repo:

- `code`: containing the stable source code
- `build`: containing the deployable, built React code
- `dev`: equivalent of `code`, but for unstable, testing versions
- `dev-build`: created temporarily from `dev`, then deleted after the Docker images are created

### Development guidelines

Please follow these steps:

- create a new `dev` branch
- develop the new feature
- test it using the `test` tag of the Docker Hub containers (automatically generated when you push on `dev`)
- once you are happy, merge `dev` into `code`, and delete `dev`
- update 

