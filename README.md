# Asa Memorial
A Voluntary Freelance Project - a memorial website that tells the story of Asa Gil-Ad, a fallen police officer, that passed away in 2021 after a hard battle with Cancer.   
<br />
<p align="center">
   <span>Website Link: <a href="https://asagilad.com">https://asagilad.com</a></span><br>
   <img src="https://github.com/user-attachments/assets/b1cc5be3-7629-4467-b201-d4ae9788a2c3" alt="memorial-website-page" width="70%"/>
</p>

### The Project's Structure:
#### 1. Frontend
  The frontend is built with `React`, `TypeScript` and `SCSS`,   
  using libraries including `axios`, `lightgallery`, `react-facebook`, `@cloudinary/react`, `email-validator` and `react-slideshow-image`.   
       
  * `axios`   
    Handles communication with the backend, including requests to retrieve memories from the database, fetch albums from Cloudinary, and upload new memories.
    
  * `lightgallery`   
    Organizes album images into a grid, allowing users to view them in a slideshow when clicked.

   * `react-facebook`   
     Displays Facebook posts, including images, likes, caption, and link to the post.

> The frontend is deployed on Vercel at: <a href="https://asagilad.com">`https://asagilad.com`</a>

<br />   

#### 2. Backend
  The backend is built with `Express.js`, and `TypeScript`,   
  using frameworks including `cloudinary`, `jsonwebtoken`, `nodemailer`, `pg (PostgreSQL)` and `multer`.   
  
  * `cloudinary`   
    Hosts dynamic image albums that can be managed directly via the Cloudinary interface. GitHub Actions automate daily media updates.
    
  * `nodemailer`   
    Sends confirmation emails to admins, notifying them of newly uploaded memories. Admins can review, approve, or deny these requests.
    
  * `jsonwebtoken`   
    Secures email confirmations for memory approvals. Admins receive a secret key in the email link, allowing only them to authenticate approvals or denials.
    
  * `pg (PostgreSQL)`   
    Stores pending memory approvals and approved memories in separate tables; denied requests are automatically removed from the pending table.
    
  * `multer`   
    Handles image uploads for memory submissions, enabling users to attach photos to memories.

  The backend and PostgreSQL database are deployed on Render.   
  Using a defined API, the frontend communicates with the backend, which in turn communicates with the PostgreSQL database within a local network on Render, ensuring fast and reliable queries.

> The Backend is hosted at: https://asa-memorial.onrender.com

