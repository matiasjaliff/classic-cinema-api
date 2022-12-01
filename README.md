![Classic Cinema](./documents/Backend.png)

# Classic Cinema - Backend

**Classic Cinema** is a movie catalog with social network features.

The current repository is the **backend**. You can find the **frontend** project in [this repository](https://github.com/matiasjaliff/classic-cinema-client). Although the **backend** is finished, I am currently working in the **frontend**. So, I will share the updates and announce when it's deployed.

## The App

I developed this app inspired by [Letterboxd](https://letterboxd.com/), a social platform for sharing film opinions and reviews. You will be able to search movies and receive recommendations, mark those movies you liked and follow other users and see what they recommend.

This is an API that provides 2 services:

1. A gateway to the [The Movie DB](https://www.themoviedb.org/documentation/api) to fetch all the info about movies.
2. Users management. This includes the routes to follow other users and see the movies they like. A **Postgres** DB managed by **Amazon RDS** is used to storage all this information.

## Technologies

🖱 **Front-end:** React, Redux, Tailwind.

⚙️ **Back-end:** Node, Express, PostgreSQL, Sequelize, JWT.

🛠 **Other:** [Mockplus RP](https://rp.mockplus.com/) for UI prototyping and [Lucidchart](https://www.lucidchart.com/pages/es) for database ERD.

## To Do
- User management views.
- Responsive for all devices.
- PWA implementation.