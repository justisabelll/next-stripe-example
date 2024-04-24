# next stripe example

this repo is an example of different stripe payment implementations in next js

it aims to offer a solid and easy example of how to integrate stripe payments in your next (app router) projects.

note that all of these examples are using the stripe checkout session api

## examples

in order to do any of the example implemenations you will need to have a stripe account and a stripe secret key. you can get one by signing up at [stripe](https://stripe.com/) and getting your secret key from the dashboard.

### 1. subcription

offer users a subscription plan to access your product or service. they pay a recurring fee at a set interval (monthly, yearly, etc.)

### 2. one-time payment (coming soon)

offer users a one-time payment to access your product or service. they pay a one-time fee and then they gain access to your product or service.

### 3. usage / credits system (coming soon)

offer users a usage/credits system to access your product or service. they pay a fee for a set amount of credits and then they can use those credits to access your product or service. or they are charged based on their usage.

# getting started:

the repo expects you to have a stripe account and at least be familiar with next js.

1. `npm install` to install dependencies
2. create a `.env.local` file in the root of the project and add your stripe secret key like so:
   1. `STRIPE_SECRET_KEY`: your stripe secret key, used for server-side requests. obtain it from your stripe dashboard's api keys section.
   2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: your stripe publishable key, used for client-side requests. also found in your stripe dashboard's api keys section
   3. `STRIPE_WEBHOOK_SECRET`: the secret used to secure your stripe webhook endpoints. generated in your stripe dashboard's webhooks settings when you set up a new endpoint.
      **Subscriptions Specifc**
   4. `NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID`: the price id for your basic subscription plan. found in the stripe dashboard under products, after creating a product and its pricing.
   5. `NEXT_PUBLIC_STRIPE_ESSENTIAL_PRICE_ID`: the price id for your essential subscription plan. similar to the basic price id, found under your product's pricing in the stripe dashboard.
   6. `NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID`: the price id for your growth subscription plan. also found in the stripe dashboard under your product's pricing details.
   7. run `./start-database.sh` & `db:push` to start the database and push the schema

# credits

this is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`
components are from [shadcn/ui](https://ui.shadcn.com/)
