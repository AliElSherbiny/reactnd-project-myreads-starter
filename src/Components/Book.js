import React, { Component, Fragment } from "react";
// import * as BooksAPI from './BooksAPI'
import "../App.css";

class Book extends Component {

  shouldComponentUpdate()
  {
    return true//this.props.shouldUpdate
  }
  render() {

    let SortedBooks = { read:[] , wantToRead:[] , currentlyReading:[]};
    const selected = {fontWeight: 'bold',color:'green'}


    this.props.books.map ((book)=>
    SortedBooks[book.shelf].push ({
      id: book.id,
      shelf:book.shelf,
      title: book.title , 
      author: book.authors,
      style: {width: 128, height: 188,backgroundImage: `url("${ book.imageLinks.smallThumbnail }")` }
    })
    )

    return (
      <Fragment>
        {this.props.ListType === "currentlyReading" && 
          SortedBooks.currentlyReading.map((book) => {
            //console.count(book.id);
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.style} />
                    <div className="book-shelf-changer">
                      <select
                        onChange={(event) =>
                          this.props.changeHandler(
                            book.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="move" disabled selected>
                          Move to...
                        </option>
                        <option value="none" >None</option>
                        <option value="currentlyReading" style={selected} >
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            );
          })}

        {this.props.ListType === "wantToRead" &&
          SortedBooks.wantToRead.map((book) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.style} />
                    <div className="book-shelf-changer">
                      <select
                        onChange={(event) =>
                          this.props.changeHandler(
                            book.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="move" disabled selected>
                          Move to...
                        </option>
                        <option value="none">None</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead" style={selected} >Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            );
          })}

        {this.props.ListType === "read" &&
          SortedBooks.read.map((book) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={book.style} />
                    <div className="book-shelf-changer">
                      <select
                        onChange={(event) =>
                          this.props.changeHandler(
                            book.id,
                            event.target.values
                          )
                        }
                      >
                        <option value="move" disabled selected>
                          Move to...
                        </option>
                        <option value="none">None</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read" style={selected} >Read</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            );
          })}
      </Fragment>
    );
  }
}
export default Book;
