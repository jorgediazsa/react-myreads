import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Book from './Book'

class WantToRead extends Component {
  static propTypes = {
    wantToRead: PropTypes.array.isRequired
  }

  state = {

  }
  render() {

    let { wantToRead, moveBook, p } = this.props

    wantToRead.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        {wantToRead.length>=1 &&
        <div className="bookshelf-books">
          <ol className="books-grid">
            {wantToRead.map((book) => (
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
        {!wantToRead.length && (
          <div className="bookshelf-books">Nothing here.</div>
        )}
      </div>
    )
  }
}

export default WantToRead