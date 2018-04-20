const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const checkAuth = require('../middleware/check_auth');


const Book = require("../models/book");
const Issued = require("../models/issued");

router.get("/", (req, res, next) => {
  Book.find()
    .select("title quantity _id summery")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        books: docs.map(doc => {
          return {
            title: doc.title,
            quantity: doc.quantity,
            summery: doc.summery,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/books/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", checkAuth,(req, res, next) => {
  const book= new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    quantity: req.body.quantity,
    summery: req.body.summery,
    auther: req.body.auther,
    category: req.body.category
  });
  book
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Book Added successfully",
        createdProduct: result.toJSON(),
            
            request: {
                type: 'GET',
                url: "http://localhost:3000/books/" + result._id
            }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .select('title quantity _id summery')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            books: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/books'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


// router.patch("/:bookId/issue",checkAuth, (req, res, next) => {
//   const id = req.params.bookId;
//   const updateOps = {};

//     updateOps[req.body.quantity] = req.body.quantity -1;

//   Book.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//           message: 'book issue',
//           request: {
//               type: 'GET',
//               url: 'http://localhost:3000/book/' + id
//           }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });


router.patch("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'book updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/book/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:bookId", checkAuth ,(req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'book deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/book',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;