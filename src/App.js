import React from "react";
import { Link, Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import BookShelf from "./BookShelf";
import SearchResults from "./SearchResults"
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import debounce from 'lodash.debounce'

class App extends React.Component {
	state = {
		books: [],
		bookResults: []
	};

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({ books });
		});
	}

	setBooksAgain() {
		BooksAPI.getAll().then(books => {
			this.setState({ books });
		});
	}

	changeBookShelf = (book_to_change, event) => {
		BooksAPI.update(book_to_change, event.target.value).then(result => {
			this.setBooksAgain();
		});
	};

	updateBook = (book, shelf) => {
		BooksAPI.update(book, shelf).then(res => {
			this.setBooksAgain()
		})
	}

	resetSearchResultState = () => {
		this.setState({ bookResults: [] });
	}


	sendRequestForSearch = debounce(function (query, maxResult) {
		BooksAPI.search(query, maxResult).then(res => {
			if (query.length) {
				this.setState({ bookResults: res })
			} else {
				this.resetSearchResultState();
			}
		}).catch(this.resetSearchResultState);
	}, 1000, { leading: false, trailing: true });

	searchEveryBook = (query) => {
		const maxResult = 7;
		if (query.length) {
			this.sendRequestForSearch(query, maxResult);
		} else {
			this.resetSearchResultState();
		}
	}

	render() {
		return (
			<div className="app">
				<Route path="/search" render={() => (
					<div className="search-books">
						<SearchBook
							searchEveryBook={this.searchEveryBook}
						/>
						<SearchResults
							changeBookShelf={this.changeBookShelf}
							bookResults={this.state.bookResults}
							booksInShelf={this.state.books}
							resetSearchResultState={this.resetSearchResultState}
						/>
					</div>
				)} />

				<Route path="/" exact render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf
									key="Currently Reading"
									shelfName="Currently Reading"
									books={this.state.books.filter(
										book => book.shelf === "currentlyReading"
									)}
									booksInShelf={this.state.books}
									changeBookShelf={this.changeBookShelf}
								/>
								<BookShelf
									key="Read"
									shelfName="Read"
									books={this.state.books.filter(
										book => book.shelf === "read"
									)}
									booksInShelf={this.state.books}
									changeBookShelf={this.changeBookShelf}
								/>
								<BookShelf
									key="Want to Read"
									shelfName="Want to Read"
									books={this.state.books.filter(
										book => book.shelf === "wantToRead"
									)}
									booksInShelf={this.state.books}
									changeBookShelf={this.changeBookShelf}
								/>
							</div>
						</div>
						<div className="open-search">
							<Link to="/search">Add a book</Link>
						</div>
					</div>
				)}
				/>
			</div>
		);
	}
}

export default App;
