import React, { Fragment } from "react";
import "./App.css";
import BooksList from "./Components/BooksList";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as remotes from "./BooksAPI.js";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      query: "",
      AllBooks: [],
      shownBooks:[],
      updateHome:false,
      updateId:{},
      updateList:''
    };
  }

  FetchAll = ()=> (remotes.getAll()
  .then((resp)=>(this.setState({AllBooks:resp,updateHome:false},(()=>(console.log(this.state.AllBooks)))))))

  componentDidMount = async () => {
    // let AllBooks = [];

     /*AllBooks = await remotes.getAll()
     .then(async(AllBooks)=>(
       this.setState ({AllBooks:[...AllBooks]})
    ))*/

this.FetchAll();
    


  };

  componentDidUpdate() {


    if(this.state.query)
    {
      remotes.search(this.state.query)
      .then((response)=>{
        if(!(response.error))
        this.setState({shownBooks:response})
        else
        this.setState({shownBooks:[]})
      
      
      })
      
    }

    if(this.state.updateHome)
    {
    remotes.update({id:this.state.updateId},this.state.updateList)
    .then((res) =>(this.FetchAll()))
    }

  }

  changeHandler = (bookID, newList) => {

    console.log(bookID , newList)
    this.setState({updateHome:true,updateId:bookID,updateList:newList},(()=>(console.log(this.state))));
  

  };

  handleSearch = (e) => {
    this.setState({
      query: e.target.value,
    });


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
                      {this.state.shownBooks?
                      (<ol className="books-grid">
                        {
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
                                        this.changeHandler(
                                          book.id   ,
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
                      </ol>):(null)
              }
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
                      {this.state.AllBooks?
                      (<BooksList
                        books={this.state.AllBooks}
                        changeHandler={this.changeHandler}
                      />):(null)}
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
