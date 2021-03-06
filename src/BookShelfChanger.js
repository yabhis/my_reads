import React from "react";
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => {
    return (
        <div className="book-shelf-changer">
            <select
                onChange={e => props.changeBookShelf(props.book, e)}
                value={props.bookShelf || 'none'}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
    changeBookShelf: PropTypes.func,
    bookShelf: PropTypes.string,
    book: PropTypes.object
}

export default BookShelfChanger
