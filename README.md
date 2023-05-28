# Greddiit 

## Implemented Features:

**  **
### Login and Registration
1. A registration page and login portal for the users.
2. Logout option.
3. Authentication & Authorization of the details of the user.Using JWT Web Token

**  **

<b> Note: Assumed that email is unique. and Login is also through email. </b>

** ** 
```Upon login the user is redirected to main page. Links to  various other pages are provided in the navbar.```    

**  **
### Profile Page
1. Contains basic details of the User with an Option to edit the details (Update profile)
2. A list of followers and followings displayed (Followers and Following)
3. User is able to delete the followers or followings by clicking on the delete icon beside the name of the follower. 
(and user is also able to unfollow)

** ** 

### My Sub Greddiits Page
1. Button to create a new Sub Gred# Greddiit 

## Implemented Features:

**  **
### Login and Registration
1. A registration page and login portal for the users.
2. Logout option.
3. Authentication & Authorization of the details of the user.Using JWT Web Token

**  **

<b> Note: Assumed that email is unique. and Login is also through email. </b>

** ** 
```Upon login the user is redirected to main page. Links to  various other pages are provided in the navbar.```    

**  **
### Profile Page
1. Contains basic details of the User with an Option to edit the details (Update profile)
2. A list of followers and followings displayed (Followers and Following)
3. User is able to delete the followers or followings by clicking on the delete icon beside the name of the follower. 
(and user is also able to unfollow)

** ** 

### My Sub Greddiits Page
1. Button to create a new Sub Greddiit.
2. A newly created Sub Greddiit has 1 follower by default, the creator itself.
3. The page consists of list of all the existing Sub Greddiits (of which the user is moderator).
4. Each subgreddit card contains all the details related to the subgreddit.
5. Delete button provided to delete the subgreddit and all the related posts, reports, etc.
(Deletes all the data present in the subgreddit)
6. Also contains an Open Button which when clicked Opens the Web Page for that SubGreddiit.
(Presents various options as described in the PDF)

** ** 
```Upon clicking the open button the user is navigated to a blank page with keyboard shortcuts written and links in the navbar given to proceed further```    

** ** 
```The Navbar contains link to four pages:```
```1. Users ```
```2. Joining Request Page ```
```3. Stats ```
```4. Reported Page ```
** ** 

### Users Page
1. shows list of users which are blocked and which are not blocked

** ** 

### Joining Requests Page
1. Shows the list of Joining Requests of all the Users who have requested to Join the Sub Greddiit in Context. 
2. Button to accept the user
3. Button to reject the user

** ** 
### Reported Page
1. Contains all the reports that have been
made so far on the Sub Greddiit with all the related details
2. Option to block the user 
- implemented the button with 5 sec timer
- if blocked the name of the person who posted is now replaced with the name of “Blocked User” 
- The moderator of Sub Grediit will still see the original name when viewing the list of Reports
3. Option to delete the post
-deletes the post in the subgreddit
4. Option to Ignore the post
- Ignore will fade out other buttons
** ** 

### Sub Greddiits Page
1. The page consists of list of all the existing Sub Greddiits.
2. The page consists Search Bar, where one can search for a Sub Greddiit based upon its Name
3. Implemented a filter based on the tags of the Sub Greddiit.
4. Implemented Sort based on
- Name
- Followers
5. First the page showed Joined Sub Greddiits with each being a clickable item. 
6. For these Joined Sub Greddiits their is a Leave Button, clicking on which will immediately kick the user out of it.
- Once a user leaves a Sub Greddiit you cannot send a join request to that Sub Greddiit again.
- In case the user who have left a Sub Greddiit before and is trying to join it again then an alert is poped up displaying the relevant message
- If the current user is the moderator of that Sub Greddiits, the button is disabled. 
 
** ** 
```On clicking a sub Greddiit, the user is redirected to a page where on the left side their is an Image, Name, Description associated with the clicked Sub Greddiit. ```
** ** 
### Specific Sub Greddiit Page
1. Create Post Button to create posts
2. Contains all the posts that have been posted until now.(All the Posts are text based)
3. Posts contain the following features
- Buttons for Upvoting and Downvoting
- Commenting feature
- save button to save the post for later reference
- follow button, wherein a user can follow the user who posted that specific post.
4. While creating a post, if the post contains some specific words (The Banned Words which were added when the Sub Greddiit was being created), then an alert is popped with the message that the post contains banned keywords
** ** 

### Saved Post Page
1. all the Posts that have been saved by the logged in User
2. button to remove the post from saved ones
** ** 

### Notes:
1. Input Validation is being done.On frontend, if input is invalid the button is disabled.
2. Tags and Banned keywords are to be inputted as comma seperated (without space)
3. When specific page related to subgreddit is opened url is changed with its id

** ** 
### Running the file
- frontend : npm start (`Runs on port 3000`)
- backend : node server.js (`Runs on port 4000`)
- For making docker image : `docker-compose up` in parent directory

** ** # Gredddit-MERNAPP
