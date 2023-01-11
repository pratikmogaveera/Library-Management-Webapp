# Welcome to Library Management Webapp!

This is a simple webapp created using **MongoDB, Express, React, Node (M.E.R.N) Stack** for managing a library.

# Files

This project has 2 folders:
1. **client:** This folder contains the code for the front-end of the webapp which is created using **React.js**, **JavaScript**, **TailwindCSS**.
2. **server:** This folder contains the code for the back-end of the webapp which is created using **Node.js**, **Express**, **Mongoose**.

# Screenshots
## Front-end

![Landing Page](https://imgur.com/o0YOhC7.png)

![Login Page](https://imgur.com/w8AvY2Z.png)

![Signup Page](https://imgur.com/H7XkIHu.png)

![Home Page (Admin)](https://imgur.com/ibY7kJl.png)

![Home Page (Editor)](https://imgur.com/LPOGdGO.png)

![Home Page User](https://imgur.com/i3uPyUL.png)

![Add Book Page](https://imgur.com/E99B7hK.png)

![Edit Book Page](https://imgur.com/7xvzshF.png)

## Back-end
![MongoDb Books](https://imgur.com/byDZFIg.png)

![MongoDb Users](https://imgur.com/eanoP5P.png)


# Details
## Models:
### Book
	-id - String,
	-title - String,
	-author - String,
	-bookType - String,
	-publishedYear - Number,
	-tags - [String],
	-isIssued - Boolean


### User
	-fullname - String,
	-username - String,
	-password - String (Hashed),
	-roles - { role: number },
	-refreshToken - String
	
## API: 
	|-Books - '/books'
		|-[GET] - '/' - Get list of all books.
		|-[GET] - '/issued' - Get list of all issued books.
		|-[GET] - '/available' - Get list of all avaiable / non-issued books.
		|-[GET] - '/id/:id' - Get details about specific book.
		|-[POST] - '/add' - Add Book to database.
		|-[PUT] - '/update/:id' - Update details of a book in database.
		|-[DELETE] - '/remove/:id' - Delete book from database.
---------
	|-Users - '/users'
		|-[GET] - '/' - Get data of all users
		|-[POST] - '/register' - Add new user to database.
		|-[POST] - '/login' - Authenticate and login user.
		|-[GET] - '/logout' - Logout user.
		|-[GET] - '/refresh' - Provide new access-token.
			   
