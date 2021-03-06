let currentUser = {id: 1, username: "pouros"}

document.addEventListener("DOMContentLoaded", function() {
  // the only function needed in here because all other functions are linked through getBooks
  getBooks()
});

//fetch all books
const getBooks = () => {
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(json => showBooks(json))
}

//iterate over the array of books and send each to the next function: create an li element for each
const showBooks = booksArray => {
  booksArray.forEach(book => createBookLi(book))
}

// create book li and append to ul
const createBookLi = book => {
  let bookLi = document.createElement('li')
  bookLi.innerText = book.title
  bookLi.addEventListener('click', e => {
    e.preventDefault()
    bookDetails(book)
  })
  document.getElementById('list').appendChild(bookLi)
}


const bookDetails = book => {
  // get book details and display in #show-panel
  let showPanel = document.getElementById('show-panel')
  console.log(showPanel)

  //clear show panel before creating each new book show card
  while (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild)
  }

  // create book details dynamically
  let h1 = document.createElement('h1')
  h1.innerText = book.title

  let image = document.createElement('img')
  image.src = book.img_url
 
  let pDescription = document.createElement('p')
  pDescription.innerText = book.description

  let usersDiv = document.createElement('div')
  usersDiv.innerText ="USERS THAT LIKE THIS BOOK:"
  
  //iterate over all booklikers for said book and display them in a list on show page
  console.log(book)
  book.users.forEach(user => {
    userP = document.createElement('p')
    userP.innerText = user.username
    //userP.style.listStyleType = "none"
    usersDiv.appendChild(userP)
  })
  
  // event listener for read/like button
  let readButton = document.createElement('button')
  readButton.innerText = "Read Book"
  readButton.addEventListener("click", e => {
    e.preventDefault()
    likeBook(book, e)
  })
 
  //append all elmements to existing show section
  showPanel.appendChild(h1)
  showPanel.appendChild(image)
  showPanel.appendChild(pDescription)
  showPanel.appendChild(usersDiv)
  showPanel.appendChild(readButton)
  
}

// patch method, update array of likers with current liker
// .push() returns the count, need to refer to original array after adding one to the list
const likeBook = (book, e) => {
  console.log("existing array of likers:")
  console.log(usersWhoLiked = book.users)
  console.log("new array of likers:")
  console.log(usersWhoLikedPlusMe = usersWhoLiked.push(currentUser))

  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "users": usersWhoLiked
    })
    })
    .then(res => res.json())
    .then(json => bookDetails(book))
}


