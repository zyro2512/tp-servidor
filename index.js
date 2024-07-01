const express = require('express')
const app = express()
const morgan = require("morgan")

let books = [
  { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
  { id: 2, title: 'Los ojos del perro siberiano', author: 'Antonio Santa Ana' },
  { id: 3, title: 'Quimica general', author: 'Raymond Chang' }
];

let authors = [
  { id: 1, name: 'J.K. Rowling', nationality: 'British' },
  { id: 2, name: 'Antonio Santa Ana', nationality: 'Argentinian' },
  { id: 3, name: 'Raymond Chang', nationality: 'American' }
];

let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, name: 'María Rodríguez', email: 'maria@example.com' }
];

let loans = [
  { user: 'Juan Pérez', book: 'Harry Potter', loanDate: '2024-07-01', returnDate: '2024-07-15' },
  { user: 'María Rodríguez', book: 'Los ojos del perro siberiano', loanDate: '2024-06-20', returnDate: '2024-07-10' }
];


app.get('/api/books', (request, response) => {
  response.json(books);
});

// Ruta para obtener un libro por su ID
app.get('/api/books/:id', (request, response) => {
  const id = Number(request.params.id);
  const foundBook = books.find(book => book.id === id);

  if (foundBook) {
    response.json(foundBook);
  } else {
    response.status(404).end();
  }
});

// Ruta para eliminar un libro por su ID
app.delete('/api/books/:id', (request, response) => {
  const id = Number(request.params.id);
  const remainingBooks = books.filter(book => book.id !== id);

  if (remainingBooks.length < books.length) {
    books = remainingBooks;
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});