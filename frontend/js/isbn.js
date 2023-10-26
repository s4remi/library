const userInput = document.getElementById("gotoresult");
const searchButton = document.getElementById("searchbyisbn-btn");

userInput.addEventListener("input", (event) => {
  const userInputValue = userInput.value.replace(/\D/g, "");
  userInput.value = userInputValue;
  if (userInputValue.length === 13) {
    searchButton.removeAttribute("disabled");
  } else {
    searchButton.setAttribute("disabled", true);
  }
});
// Function to handle the search button click
searchButton.addEventListener("click", async () => {
  if (userInput.value.length === 13) {
    const data_recorded = userInput.value;
    try {
      const response = await fetch("http://localhost:3000/searchByIsbn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isbn: isbn }),
      });
      console.log("in isbn.js  before check the response from db");
      if (response.ok) {
        const mongo_response = await response.json();
        console.log("you clicked and response is ok ", mongo_response.data[0]);
        loadBook(mongo_response.data[0]);
      } else {
        alert("Failed to fetch book information.");
      }
    } catch (error) {
      console.log(
        "something wrong with showing the book, please try again later"
      );
    }
  }
});

const loadBook = (mongo_response) => {
  document.title = mongo_response.title;
  document.getElementById("prompts").innerHTML = `<div>
  <h1 id="title">${mongo_response.title}</h1>
  <img src="${
    mongo_response.image
  }" alt="Book Cover" className="book-image" id="bookImage">
  </div><div class="details-container">
    <p><strong>Author:</strong> <span id="author">${
      mongo_response.author
    }</span></p>
    <p><strong>Rating:</strong> <span id="rating">${
      mongo_response.rating
    }</span></p>
    
    <p><strong>Language:</strong> <span id="language">${
      mongo_response.language
    }</span></p>
    <p><strong>Genres:</strong> <span id="genres">${JSON.parse(
      mongo_response.genres.replace(/'/g, '" ')
    )}</span></p>
    <p><strong>Pages:</strong> <span id="pages">${
      mongo_response.pages
    }</span></p>
    <p><strong>Publisher:</strong> <span id="publisher">${
      mongo_response.publisher
    }</span></p>
    <p><strong>Price:</strong> $<span id="price">${
      mongo_response.price
    }</span></p>
    <p><strong>Description:</strong> <span id="description">${
      mongo_response.description
    }</span></p>
    <p><strong>ISBN:</strong> <span id="description">${
      mongo_response.ISBN
    }</span></p></div>`;
};
