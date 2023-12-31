const router = require('express').Router();
const Book = require('../models/model');

//Route Add/save book
//http://localhost:5000/book/add
router.route('/add').post(async (req, res) => {
    const { title, author, description } = req.body;    
    const newBook = new Book({
        title,
        author,
        description
    });

    console.log(newBook);
    //save new book
    newBook
        .save()
        .then(() => res.json('Book added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

//Get single book by id
//http://localhost:5000/book/64dd221b114deec667f139d6
router.route('/:id').get((req, res) => {
    console.log('id ' + req.params.id);
    Book.findById(req.params.id)
        .then((book) => res.json(book))
        .catch((err) => res.status(400).json('Error: ' + err)); 
});

//updating by id
//http://localhost:5000/book/update/64dd221b114deec667f139d6
router.route('/update/:id').post(async (req, res) => {
    console.log('Update triggered for ' + req.params.id);
    await Book.findById(req.params.id)
        .then((bookforedit) => {
            bookforedit.title = req.body.title;
            bookforedit.author = req.body.author;
            bookforedit.description = req.body.description;
            
            bookforedit
            .save()
            .then(() => res.json('Book updated!'))
            .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

//deleting by id
//http://localhost:5000/book/delete/64dd221b114deec667f139d6
router.route('/delete/:id').delete(async (req, res) => {
    console.log('delete execution');
    await Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//Get all book
//http://localhost:5000/book/
router.route('/').get((req, res) => {
    Book.find()
        .then((activities) => res.json(activities))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
