import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {

  }

  findShelf(bookId) {
    const { currentlyReading, wantToRead, read } = this.props
    if(currentlyReading.find(book => book.id === bookId)){
      return 'currentlyReading'
    }
    if(wantToRead.find(book => book.id === bookId)){
      return 'wantToRead'
    }
    if(read.find(book => book.id === bookId)){
      return 'read'
    }
    return 'none'
  }

  render() {

    const { book, moveBook, p } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : this.findShelf(book.id)} onChange={(event) => moveBook(book.id, book.shelf , event.target.value, p)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.length && (
          <div className="book-authors">{book.authors.length===1 ? book.authors : book.authors.join(', ')}</div>
        )}
      </div>
    );
  }
}


export default Book