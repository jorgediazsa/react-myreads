import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'

class Search extends Component {

  static propTypes = {

  }

  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    BooksAPI.search(query, 20)
      .then((books) => {
        this.setState({ books })
      })
    this.setState({ query })
  }

  render() {

    const { books, query } = this.state
    const { moveBook, p, currentlyReading, wantToRead, read } = this.props

    if(books && books.length){
      books.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        {books.length > 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book
                    p={p}
                    moveBook={moveBook}
                    book={book}
                    currentlyReading={currentlyReading}
                    wantToRead={wantToRead}
                    read={read}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }

}

export default Search