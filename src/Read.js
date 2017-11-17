import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Book from './Book'

class Read extends Component {
  static propTypes = {
    read: PropTypes.array.isRequired
  }

  state = {

  }
  render() {

    let { read, moveBook, p } = this.props

    read.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        {read.length>=1 &&
        <div className="bookshelf-books">
          <ol className="books-grid">
            {read.map((book) => (
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
        {!read.length && (
          <div className="bookshelf-books">Nothing here.</div>
        )}
      </div>
    )
  }
}

export default Read