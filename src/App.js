import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Search from './Search'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  moveBook(bookId, from = 'none', to, p) {
    BooksAPI.update({ "id": bookId }, to).then((response) => {
      BooksAPI.getAll().then((books) => {
        p.setState({ currentlyReading: books.filter((book) => book.shelf === "currentlyReading") })
        p.setState({ wantToRead: books.filter((book) => book.shelf === "wantToRead") })
        p.setState({ read: books.filter((book) => book.shelf === "read") })
      })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ currentlyReading: books.filter((book) => book.shelf === "currentlyReading") })
      this.setState({ wantToRead: books.filter((book) => book.shelf === "wantToRead") })
      this.setState({ read: books.filter((book) => book.shelf === "read") })
    })
  }

  render() {

    let { currentlyReading, wantToRead, read } = this.state

    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                  p={this}
                  moveBook={this.moveBook}
                  currentlyReading={currentlyReading}
                />
                <WantToRead
                  p={this}
                  moveBook={this.moveBook}
                  wantToRead={wantToRead}
                />
                <Read
                  p={this}
                  moveBook={this.moveBook}
                  read={read}
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <Search
            p={this}
            moveBook={this.moveBook}
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
