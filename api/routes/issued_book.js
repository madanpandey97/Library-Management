const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Issued = require("../models/issued");
const Book = require("../models/book");



// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Issued.find()
    .select({user: req.userData.userId,book: ''})
    .populate( 'book')
    .exec()
    .then(docs => {
      
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          console.log(doc)
          return {
            _id: doc._id,
            book: doc.book,
            issueDate: doc.issueDate,
            returnDate: doc.returnDate,
            quantity: doc.quantity,

            title: doc.book.title,
            user: req.userData.userId,

            request: {
              type: "GET",
              url: "http://localhost:3000/books/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


router.post("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({
          message: "book not found"
        });
      }
      const issued = new Issued({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        book: req.params.bookId,
        user: req.userData.userId,
      });
      return issued.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Book Issued",
        createdOrder: result.toJSON(),
        request: {
          type: "GET",
          returnBookUrl: "http://localhost:3000/issue/" + result._id
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


router.delete("/:returnId", (req, res, next) => {
  Issued.remove({ _id: req.params.returnId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Book Returned",
        request: {
          type: "POST",
          url: "http://localhost:3000/books",
          body: { BookId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;