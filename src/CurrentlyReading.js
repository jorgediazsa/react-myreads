import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Book from './Book'

class CurrentlyReading extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired
  }

  state = {

  }
  render() {

    let { currentlyReading, moveBook, p } = this.props

    currentlyReading.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        {currentlyReading.length>=1 &&
        <div className="bookshelf-books">
          <ol className="books-grid">
            {currentlyReading.map((book) => (
              <li key={book.id}>
                <Book
                  p={p}
                  moveBook={moveBook}
                  book={book}
                />
              </li>
            ))}
          </ol>
        </div>
        }
        {!currentlyReading.length && (
          <div className="bookshelf-books">Nothing here.</div>
        )}
      </div>
    )
  }
}

export default CurrentlyReading