# Asa Memorial
A Voluntary Freelance Project - a memorial website that tells the story of Asa Gil-Ad, a fallen police officer, that passed away in 2021 after a hard battle with Cancer.   
   
Link to the deployed website: <a href="https://asagilad.vercel.app">`https://asagilad.vercel.app`</a>

### The Project's Structure:
#### 1. Frontend
  The frontend uses `React`, `TypeScript` and `SCSS`, with libraries including axios, lightgallery, react-facebook, @cloudinary/react, email-validator, react-slideshow-image and more...

#### 2. Backend
  The backend of the website was written in Express.js, and TypeScript.  
  Some of the frameworks used are cloudinary, jsonwebtoken, nodemailer, pg (PostgreSQL), multer and more...
  * `cloudinary` is used to as a media host, where dynamic image albums are hosted at. Each album can be edited through the Cloudinary's interface. The website's media is updated periodically once a day with a GitHub Actions automation.
  * `nodemailer` is used to send confimation emails to specified admins' emails. These confirmation emails contain info of users' newly uploaded memories. The admins then have the option to validate the details, check that the info has no harmful or offensive messages, and approve/deny the request.
  * `jsonwebtoken` is used to authenticate the email confirmations for new memories uploaded by users. By this method, only the admins which received the confirmation email will obtain a secret key that withh then be used to authenticate their approval/deny of the memory request.
  * `pg (PostgreSQL)` is the Database of choice. In the database, all pending for approval memories will be hosted in a table, alongside the already approved memories table. Denied memories will be deleted from the pending memories table automatically.
  * `multer` is used to upload images to new memories requests.

![asa-memorial](https://github.com/user-attachments/assets/b1cc5be3-7629-4467-b201-d4ae9788a2c3)
