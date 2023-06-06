# Trading Web App

# Instruction
* Open the "trading-app" directory in code editor.
* Create MySQL Database named as "pksuccesstrading".
* Upload "pksuccesstrading.sql" from database folder to that database.
* Open the terminal in the code editor and type `npm install` hit enter, then type `nodemon app.js` again hit enter, it goes to port of `localhost:3000`

# Description
The trading app project is aimed at creating a platform that facilitates seamless trading activities for users. The application is built using the Express framework, Ejs templating engine, and MySQL database.
The app provides three types of users: client, sub-admin, and admin, each with specific roles and functionalities.

* Client:
The client user can register an account on the platform, allowing them to participate in trading activities. They can deposit funds into their account, initiate withdrawals, and refer others to the platform for a referral bonus. The client user interface provides an intuitive experience for managing these actions and keeping track of their trading activities.
* Sub-admin:
The sub-admin user has additional responsibilities and privileges. They can access features such as viewing registered banks, managing deposit requests, managing withdrawal requests, managing referral requests, viewing the list of clients, and viewing client feedback. The sub-admin user interface provides tools to efficiently handle and process these requests, ensuring smooth operations.
* Admin:
The admin user holds the highest level of authority in the trading app. They have comprehensive control over the platform's functionalities. The admin user can manage registered banks, oversee deposit activities, handle withdrawal requests, manage referrals, manage clients' accounts, and review client feedback. The admin user interface offers a centralized dashboard with advanced tools and analytics to monitor and manage these aspects effectively.

The project leverages the Express framework to develop a robust and scalable back-end, ensuring optimal performance and security. The Ejs templating engine enables the creation of dynamic and interactive user interfaces, providing a seamless experience for all users. The MySQL database is utilized to store and manage user data, transaction details, and system configurations securely.
Overall, the trading app aims to provide a user-friendly and secure platform for traders to engage in trading activities. The different user roles and functionalities empower clients, sub-admins, and admins to perform their respective tasks efficiently, ultimately enhancing the trading experience for all stakeholders involved.
