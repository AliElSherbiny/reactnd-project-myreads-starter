import React, { Fragment } from "react";
import "./App.css";
import BooksList from "./Components/BooksList";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as remotes from "./BooksAPI.js";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false,
      query: "",
      AllBooks: [],
      shownBooks:[]
    };
  }

  componentDidMount = async () => {
    // let AllBooks = [];

     /*AllBooks = await remotes.getAll()
     .then(async(AllBooks)=>(
       this.setState ({AllBooks:[...AllBooks]})
    ))

     remotes.getAll()
     .then((resp)=>(console.log(resp)))

    remotes
      .update(
        {
          title: "To Kill a Mockingbird",
          id: 6,
          author: "Harper Lee",
        },
        "wantToRead"
      )
      .then((res) => {
        remotes.getAll().then((resp) => console.log(resp));
      });*/
  };

  componentDidUpdate() {

    if(this.state.query)
    {
      remotes.search(this.state.query)
      .then((response)=>(this.setState({shownBooks:response})))
    }

  }

  changeHandler = (book, newList, oldList) => {
    if (newList !== "none" && newList !== oldList) {
      let booksarr = { ...this.state.books };
      booksarr[newList].push(book);

      let updatedarr = booksarr[oldList].filter((mybook) => {
        return mybook.title !== book.title;
      });

      booksarr[oldList] = [...updatedarr];

      this.setState({
        books: booksarr,
      });

      return booksarr;
    }
  };

  handleSearch = (e) => {
    this.setState({
      query: e.target.value,
    });


  };

  searchChangeHandler = (book, newList) => {
    if (newList !== "none") {
      /*Search if the book is in any of the lists */
      let booksarr = { ...this.state.books };

      let updatedarr1 = booksarr["currentlyReading"].filter((mybook) => {
        return mybook.title !== book.title;
      });

      let updatedarr2 = booksarr["read"].filter((mybook) => {
        return mybook.title !== book.title;
      });

      let updatedarr3 = booksarr["wantToRead"].filter((mybook) => {
        return mybook.title !== book.title;
      });

      booksarr["currentlyReading"] = [...updatedarr1];
      booksarr["read"] = [...updatedarr2];
      booksarr["wantToRead"] = [...updatedarr3];

      booksarr[newList].push(book);

      this.setState({
        books: booksarr,
      });

      return booksarr;
    }
  };

  render() {
  
    // window.localStorage.setItem("State", JSON.stringify(this.state));

    // AllBooks = this.state.books.wantToRead
    //   .concat(this.state.books.read)
    //   .concat(this.state.books.currentlyReading);

    // this.state && this.state.query == ""
    //   ? (shownBooks = [...this.state.AllBooks])
    //   : (shownBooks = this.state.AllBooks.filter((book) =>
    //       book.title.toLowerCase().includes(this.state.query.toLowerCase())
    //     ));

    return (
      <BrowserRouter>
        <div className="app">
          {this.state.showSearchPage ? (
            <Route
              path="/search"
              exact
              render={() => {
                return (
                  <div className="search-books">
                    <div className="search-books-bar">
                      <Link to="/">
                        <button
                          className="close-search"
                          onClick={() =>
                            this.setState({ showSearchPage: false })
                          }
                        >
                          Close
                        </button>
                      </Link>
                      <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                          type="text"
                          placeholder="Search by title or author"
                          value={this.state.query || ""}
                          onChange={(event) => this.handleSearch(event)}
                        />
                      </div>
                    </div>
                    <div className="search-books-results">
                      <ol className="books-grid">
                        {(this.state.shownBooks)&&
                        (this.state.shownBooks.map((book) => {
                          let bookStyle = {
                            width: 128,
                            height: 188,
                            backgroundImage: `url("${
                              book.imageLinks.smallThumbnail
                            }")`,
                          };

                          return (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={bookStyle}
                                  />
                                  <div className="book-shelf-changer">
                                    <select
                                      onChange={(event) =>
                                        this.searchChangeHandler(
                                          {
                                            title: book.title,
                                            author: book.authors,
                                            style: bookStyle,
                                          },
                                          event.target.value
                                        )
                                      }
                                    >
                                      <option value="move" disabled>
                                        Move to...
                                      </option>
                                      <option value="none">None</option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                  {book.authors}
                                </div>
                              </div>
                            </li>
                          );
                        }))}
                      </ol>
                    </div>
                  </div>
                );
              }}
            />
          ) 
          
          : (
            <Fragment>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      {/*<BooksList
                        books={this.state.books}
                        changeHandler={this.changeHandler}
                      />*/}
                      <div className="open-search">
                        <Link to="/search">
                          <button
                            onClick={() =>
                              this.setState({ showSearchPage: true })
                            }
                          >
                            Add a book
                          </button>
                          \
                        </Link>
                      </div>
                    </div>
                  );
                }}
              />
            </Fragment>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
