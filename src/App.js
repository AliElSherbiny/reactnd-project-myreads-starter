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
      updateHome:1,
      updateId:{},
      updateList:''
    };
  }

  FetchAll = ()=> (remotes.getAll()
  .then((resp)=>(this.setState({AllBooks:resp,updateHome:0}))))

  componentDidMount = async () => {
    this.FetchAll();
  };

  componentDidUpdate() {


    if(this.state.updateHome)
    {
      if (this.state.query) {
      remotes.search(this.state.query)
      .then((response)=>{
        if(!(response.error))
        this.setState({shownBooks:response})
        else
        this.setState({shownBooks:[]})    
      })}

      else
      {
        this.setState({shownBooks:[]})
      }
    }

    if(this.state.updateHome)
    {
    remotes.update({id:this.state.updateId},this.state.updateList)
    .then((res) =>(this.FetchAll()))
    .then (this.setState({updateHome:0}))
    }

  }

  changeHandler = (bookID, newList) => {
    this.setState({updateHome:1,updateId:bookID,updateList:newList},(()=>(console.log(this.state))));
  };

  handleSearch = (e) => {
    this.setState({
      query: e.target.value,
      updateHome:1
    },(()=>(console.log(this.state))));
  };



  render() {
  
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

                        <input
                          type="text"
                          placeholder="Search by title or author"
                          value={this.state.query}
                          onChange={(event) => this.handleSearch(event)}
                        />
                      </div>
                    </div>
                    <div className="search-books-results">
                      {this.state.shownBooks?
                      (<ol className="books-grid">
                        {
                        (this.state.shownBooks.map((book) => {
                          let img= (book.imageLinks?(`url("${
                            book.imageLinks.smallThumbnail
                          }")`):(null))
                          let bookStyle = {
                            width: 128,
                            height: 188,
                            backgroundImage:img ,
                          };
                          let shelfStyle = {
                            selectedCurr: 0,selectedWant: 0,selectedRead: 0, selectedNone:1,
                            styleCurr: {},styleWant:{},styleRead:{},styleNone:{fontWeight: 'bold',color:'green'} //fontWeight: 'bold',color:'green'
                          }
                          this.state.AllBooks.map((homeBook)=>{
                           
                            if (book.id===homeBook.id)
                            {
                              shelfStyle = {
                                selectedCurr: 0,selectedWant: 0,selectedRead: 0, selectedNone:0,
                                styleCurr: {},styleWant:{},styleRead:{},styleNone:{} //fontWeight: 'bold',color:'green'
                              }

                              switch(homeBook.shelf) {
                                case "currentlyReading" :
                                  shelfStyle.selectedCurr = 1; shelfStyle.styleCurr = {fontWeight: 'bold',color:'green'}
                                  break;
                                case "wantToRead":
                                  shelfStyle.selectedWant = 1; shelfStyle.styleWant = {fontWeight: 'bold',color:'green'}
                                  break;
                                case "read":
                                  shelfStyle.selectedRead = 1; shelfStyle.styleRead = {fontWeight: 'bold',color:'green'}
                                  break;
                                default:
                                  shelfStyle.selectedNone = 1; shelfStyle.styleNone = {fontWeight: 'bold',color:'green'}
                                  break;
                              }
                            }
                          return null;})
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
                                      <option value="none" selected={shelfStyle.selectedNone} style={shelfStyle.styleNone}>None</option>
                                      <option value="currentlyReading" selected={shelfStyle.selectedCurr} style={shelfStyle.styleCurr}>
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead" selected={shelfStyle.selectedWant} style={shelfStyle.styleWant}>
                                        Want to Read
                                      </option>
                                      <option value="read" selected={shelfStyle.selectedRead} style={shelfStyle.styleRead} >Read</option>
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
                        shouldUpdate={this.state.updateHome}
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
