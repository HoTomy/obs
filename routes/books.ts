import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/books";
import { validateBook } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";
import { Book } from "../models/book";


const books = [
  { title: 'Book1', description: 'This is book 1', editor: 'Editor1', publishedDate: '2021-01-01', availability: true, editedDate: '2021-01-01' },
  { title: 'Book2', description: 'This is book 2', editor: 'Editor2', publishedDate: '2021-02-01', availability: false, editedDate: '2021-02-01' },
  { title: 'Book3', description: 'This is book 3', editor: 'Editor3', publishedDate: '2021-03-01', availability: false, editedDate: '2021-03-01' },
  { title: 'Book4', description: 'This is book 4', editor: 'Editor4', publishedDate: '2021-04-01', availability: false, editedDate: '2021-04-01' },
  { title: 'Book5', description: 'This is book 5', editor: 'Editor5', publishedDate: '2021-05-01', availability: false, editedDate: '2021-05-01' },
];

const router = new Router({ prefix: '/api/v1/books' });



// Get all books
const getAllBooks = async (ctx: RouterContext) => {
  try {
    const availableBooks = books.filter((book) => book.availability);
    const bookTitles = availableBooks.map((book) => book.title);
    ctx.body = bookTitles;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to retrieve book titles" };
  }
};

// Get detailed information about a book
const getBookDetails = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;

  try {
    const book = books.find((book) => book.id === id);
    if (book) {
      ctx.body = book;
    } else {
      ctx.status = 404;
      ctx.body = { error: "Book not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to retrieve book details" };
  }
};

// List a book on the website
const listBookOnWebsite = async (ctx: RouterContext) => {
  const bookData: Book = ctx.request.body;

  try {
    // Add the book to the list of available books
    books.push(bookData);
    ctx.status = 201;
    ctx.body = bookData;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to list book on the website" };
  }
};

router.get('/titles', getAllBooks);
router.get('/:id([0-9]{1,})', getBookDetails);
router.post('/list', basicAuth, bodyParser(), validateBook, listBookOnWebsite);

const getAll = async (ctx: RouterContext) => {
  const books = await model.getAll();
  ctx.body = books;
};

const createBook = async (ctx: RouterContext) => {
  const bookData: Book = ctx.request.body;

  try {
    const result = await model.add(bookData);
    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Insert data failed" };
  }
};

const getById = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;

  try {
    const book = await model.getById(id);
    if (book) {
      ctx.body = book;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Error retrieving book" };
  }
};

const updateBook = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;
  const bookData: Book = ctx.request.body;

  try {
    const updatedBook = await model.update(id, bookData);
    if (updatedBook) {
      ctx.body = updatedBook;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Error updating book" };
  }
};

const deleteBook = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;

  try {
    const deletedBook = await model.remove(id);
    if (deletedBook) {
      ctx.body = deletedBook;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Error deleting book" };
  }
};

router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateBook, createBook);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateBook, updateBook);
router.delete('/:id([0-9]{1,})', basicAuth, deleteBook);

// Middleware for handling 404 errors
router.all('*', (ctx: RouterContext) => {
  ctx.status = 404;
  ctx.body = { error: "Resource not found" };
});

export { router };
