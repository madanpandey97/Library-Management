
# Library-Management-Api
The repository is about to develop a server-side Rest Api for the Library Management System to handling all the user along with Issue and Return of book. This api is built on the top of Node-Express Framwork with MongoDb as Database.


<p align="center">
  
  <a href="https://ibb.co/cGKycS"><img src="https://preview.ibb.co/cP2vP7/Screenshot_from_2018_04_21_04_23_47.png" alt="Screenshot_from_2018_04_21_04_23_47" border="0"></a>
</p>
<p align="center">
  
<a href="https://ibb.co/cscUj7"><img src="https://preview.ibb.co/cjuWxS/Screenshot_from_2018_04_21_04_24_46.png" alt="Screenshot_from_2018_04_21_04_24_46" border="0"></a>
  </p>
# References

[https://nodejs.org/en/]<br>
[https://expressjs.com/]<br>
[https://github.com/auth0/node-jsonwebtoken] <br>
[http://mongoosejs.com/docs/guide.html]<br>
[https://github.com/shaneGirish/bcrypt-nodejs]<br>



# Guide To install 
Clone this repository into your file [ https://github.com/madanpandey97/Library-Management.git ]
 or simply download zip file from Github. Make sure you have version greater than 6.

run 
 npm install
 npm start
 
 
 # Url Detail
 Please install postman for better view of Api and for browser view please into JsonViewer.
 
 for library side<br>
 ```diff
 localhost:3000/books (as a post request for adding book)<br>
 localhost:3000/books (as a get request for getting all book detail)<br>
 localhost:3000/books/bookId (as a get request for getting detial for a book)<br>
 localhost:3000/books/bookId (as a patch request for updating book detail)<br>
 localhost:3000/books/bookId( as a delete request for deleting book)<br>
 ```
 On user side
 ```diff
localhost:3000/auth/signup (as a post request for signing up)<br>
lcoalhost:3000/auth/login( as a post request for loging in ) <br>
```
On Issue and Return Of Book
```diff
localhost:3000/issue/<bookId> ( as a post request for issue book)<br>
localhost:3000/issue/        (as a get request for getting all the book in user account)<br>
localhost:3000/issue/<bookId> (as a delete request for returning book )  <br>
 ```
 # Schema Model Detail
 
 ##### View of Book Schema 
```
const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    summery: { type:String , required: true },
    auther: { type: String, required: true},
    category:{type: String, rquired: true}
    
});

```
##### View of IssueSchema

```const issueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, default: 1 },
    issueDate: { type: Date, default: Date.now(), required: true},
    returnDate: {type: Date, default: new Date(Date.now() + 30*24*60*60*1000)},
});

```
##### View of User Schema 

```
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});
```
```




