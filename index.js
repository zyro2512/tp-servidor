const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

// Middleware para registrar mensajes en la consola según configuración 'tiny'
app.use(morgan('tiny'));

// Middleware para analizar solicitudes JSON
app.use(express.json());

let books = [
  { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
  { id: 2, title: 'Los ojos del perro siberiano', author: 'Antonio Santa Ana' },
  { id: 3, title: 'Quimica general', author: 'Raymond Chang' },
  { id: 4, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
  { id: 5, title: 'El nombre de la rosa', author: 'Umberto Eco' },
  { id: 6, title: 'El señor de los anillos', author: 'J.R.R. Tolkien' },
  { id: 7, title: '1984', author: 'George Orwell' },
  { id: 8, title: 'Orgullo y prejuicio', author: 'Jane Austen' },
  { id: 9, title: 'Crónica de una muerte anunciada', author: 'Gabriel García Márquez' },
  { id: 10, title: 'La sombra del viento', author: 'Carlos Ruiz Zafón' },
];

let authors = [
  { id: 1, name: 'J.K. Rowling', nationality: 'British' },
  { id: 2, name: 'Antonio Santa Ana', nationality: 'Argentinian' },
  { id: 3, name: 'Raymond Chang', nationality: 'American' },
  { id: 4, name: 'Gabriel García Márquez', nationality: 'Colombian' },
  { id: 5, name: 'Umberto Eco', nationality: 'Italian' },
  { id: 6, name: 'J.R.R. Tolkien', nationality: 'British' },
  { id: 7, name: 'George Orwell', nationality: 'British' },
  { id: 8, name: 'Jane Austen', nationality: 'British' },
  { id: 9, name: 'Gabriel García Márquez', nationality: 'Colombian' },
  { id: 10, name: 'Carlos Ruiz Zafón', nationality: 'Spanish' },
];

let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@gmail.com' },
  { id: 2, name: 'María Rodríguez', email: 'maria@gmail.com' },
  { id: 3, name: 'Luis González', email: 'luis@gmail.com' },
  { id: 4, name: 'Ana Martínez', email: 'ana@gmail.com' },
  { id: 5, name: 'Carlos Sánchez', email: 'carlos@gmail.com' },
  { id: 3, name: 'Luis González', email: 'luis@gmail.com' },
  { id: 4, name: 'Ana Martínez', email: 'ana@gmail.com' },
  { id: 5, name: 'Carlos Sánchez', email: 'carlos@gmail.com' },
  { id: 6, name: 'Laura Fernández', email: 'laura@gmail.com' },
  { id: 7, name: 'Diego Rodríguez', email: 'diego@gmail.com' },
];

let loans = [
  { user: 'Juan Pérez', book: 'Harry Potter', loanDate: '2024-07-01', returnDate: '2024-07-15' },
  { user: 'María Rodríguez', book: 'Los ojos del perro siberiano', loanDate: '2024-06-20', returnDate: '2024-07-10' },
  { user: 'Luis González', book: 'Cien años de soledad', loanDate: '2024-07-05', returnDate: '2024-07-20' },
  { user: 'Ana Martínez', book: 'El nombre de la rosa', loanDate: '2024-06-28', returnDate: '2024-07-12' },
  { user: 'Carlos Sánchez', book: 'Quimica general', loanDate: '2024-07-10', returnDate: '2024-07-25' },
  { user: 'Luis González', book: '1984', loanDate: '2024-07-12', returnDate: '2024-07-27' },
  { user: 'Ana Martínez', book: 'Orgullo y prejuicio', loanDate: '2024-07-18', returnDate: '2024-08-02' },
  { user: 'Carlos Sánchez', book: 'Crónica de una muerte anunciada', loanDate: '2024-07-22', returnDate: '2024-08-06' },
  { user: 'Laura Fernández', book: 'La sombra del viento', loanDate: '2024-07-25', returnDate: '2024-08-09' },
  { user: 'Diego Rodríguez', book: 'El señor de los anillos', loanDate: '2024-07-28', returnDate: '2024-08-12' },
];


// Rutas de ejemplo para libros
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(book => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).end();
  }
});

app.post('/api/books', (req, res) => {
  const book = req.body;

  if (!book.title || !book.author) {
    return res.status(400).json({ error: 'Title or author missing' });
  }

  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex !== -1) {
    if (title) books[bookIndex].title = title;
    if (author) books[bookIndex].author = author;
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(book => book.id !== id);
  res.status(204).end();
});

// Rutas de ejemplo para autores
app.get('/api/authors', (req, res) => {
  res.json(authors);
});

app.get('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  const author = authors.find(author => author.id === id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).end();
  }
});

app.post('/api/authors', (req, res) => {
  const author = req.body;

  if (!author.name) {
    return res.status(400).json({ error: 'Name missing' });
  }

  author.id = authors.length + 1;
  authors.push(author);
  res.status(201).json(author);
});

app.put('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const authorIndex = authors.findIndex(author => author.id === id);

  if (authorIndex !== -1) {
    if (name) authors[authorIndex].name = name;
    res.json(authors[authorIndex]);
  } else {
    res.status(404).json({ error: 'Author not found' });
  }
});

app.delete('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  authors = authors.filter(author => author.id !== id);
  res.status(204).end();
});

// Rutas de ejemplo para usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

app.post('/api/users', (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res.status(400).json({ error: 'Name missing' });
  }

  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    if (name) users[userIndex].name = name;
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

// Rutas de ejemplo para préstamos
app.get('/api/loans', (req, res) => {
  res.json(loans);
});

app.get('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  const loan = loans.find(loan => loan.id === id);
  if (loan) {
    res.json(loan);
  } else {
    res.status(404).end();
  }
});

app.post('/api/loans', (req, res) => {
  const loan = req.body;

  if (!loan.bookId || !loan.userId || !loan.loanDate) {
    return res.status(400).json({ error: 'Book ID, User ID, or loan date missing' });
  }

  loan.id = loans.length + 1;
  loans.push(loan);
  res.status(201).json(loan);
});

app.put('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  const { bookId, userId, loanDate } = req.body;

  const loanIndex = loans.findIndex(loan => loan.id === id);

  if (loanIndex !== -1) {
    if (bookId) loans[loanIndex].bookId = bookId;
    if (userId) loans[loanIndex].userId = userId;
    if (loanDate) loans[loanIndex].loanDate = loanDate;
    res.json(loans[loanIndex]);
  } else {
    res.status(404).json({ error: 'Loan not found' });
  }
});

app.delete('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  loans = loans.filter(loan => loan.id !== id);
  res.status(204).end();
});

// Middleware para manejar rutas desconocidas
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
