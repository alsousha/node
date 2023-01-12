'use strict';

// Ask for books (fetch)
// when books are in:
// then call buildLibrary (then of fetch)

// send a message to server to send books array

fetch('getBooks', {
  method: 'POST',
})
  .then(function (res) {
    console.log('result is here');
    return res.json();
  })
  .then(res => {
    console.log(res);
    buildLibrary(res);
  })
  .catch(err => console.log(err));

console.log('after fetch');

function buildLibrary(data) {
  const article = document.createElement('article');

  document.body.append(article);

  data.forEach(book => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
     <h2>${book.title}</h2>
     <p>Author: ${book.author}</p>
     <p>${book.description}</p>
     <img src=${book.cover} alt=${book.description}>
    `;
    article.append(figure);
  });
}

// buildLibrary(data)
