import React, { Component } from 'react'
import * as axios from 'axios'
import { Link, Redirect, withRouter } from 'react-router-dom'

class ViewBook extends Component {
	state = {
		book: null,
		isLoading: true,
		editMode: false
	}

	getBook = id => {
		this.setState(
			{
				isLoading: true
			},
			() => {
				axios
					.get('http://localhost:3001/api/book')
					.then(res => {
						const { books } = res.data
						const book = books.filter(book => +book.book_id === +id).pop()
						if (typeof book !== 'undefined') {
							this.setState({ book })
						}
					})
					.catch(err => {
						alert('ไม่สามารถโหลดข้อมูลได้!')
					})
					.finally(() => {
						this.setState({ isLoading: false })
					})
			}
		)
	}

	componentDidMount = () => {
		const {
			match: {
				params: { id }
			}
		} = this.props
		this.getBook(id)
	}

	handleEditMode = () => {
		const { editMode } = this.state
		this.setState({
			editMode: !editMode
		})
	}

	handleDelete = () => {
		const {
			match: {
				params: { id }
			},
			history
		} = this.props
		if (window.confirm('คุณแน่ใจที่จะลบ ?')) {
			this.setState(
				{
					isLoading: true
				},
				() => {
					axios
						.delete(`http://localhost:3001/api/book/${id}`)
						.then(res => {
							const { message } = res.data
							alert(message)
							history.push('/')
						})
						.catch(err => {
							const { message } = err.data
							alert(message)
						})
						.finally(() => {
							this.setState({ isLoading: false })
						})
				}
			)
		}
	}

	handleChange = e => {
		const { name, value } = e.target
		const { book } = this.state
		this.setState({
			book: {
				...book,
				[name]: value
			}
		})
	}

	handleSubmit = e => {
		if (e) {
			const { book } = this.state
			e.preventDefault()
			this.setState(
				{
					isLoading: true
				},
				() => {
					axios
						.patch(`http://localhost:3001/api/book/${book.book_id}`, { book })
						.then(res => {
							const { book } = res.data
							this.setState({
								editMode: false,
								book
							})
						})
						.catch(err => {
							alert('กรุณากรอกข้อมูลให้ครบถ้วน!')
						})
						.finally(() => {
							this.setState({ isLoading: false })
						})
				}
			)
		}
	}

	render() {
		const { book, isLoading, editMode } = this.state

		if (isLoading === true) {
			return <div className="container">กำลังโหลดข้อมูล...</div>
		}

		if (isLoading === false && book === null) {
			return <Redirect to="/" />
		}

		if (editMode === true) {
			return (
				<div className="container">
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>ชื่อหนังสือ</label>
							<input
								type="text"
								name="title"
								className="form-control"
								placeholder="ชื่อหนังสือ"
								value={book.title}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group">
							<label>คำอธิบาย</label>
							<input
								type="text"
								name="description"
								className="form-control"
								placeholder="คำอธิบาย"
								value={book.description}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group">
							<label>ราคา</label>
							<input
								type="number"
								name="price"
								className="form-control"
								placeholder="ราคา"
								value={book.price}
								onChange={this.handleChange}
							/>
						</div>
						<hr />
						{/* <img src={book.image_url} /> */}
						<button type="submit" class="btn btn-success">
							บันทึก
						</button>{' '}
						<button type="button" class="btn btn-danger" onClick={this.handleEditMode}>
							ย้อนกลับ
						</button>
					</form>
				</div>
			)
		}

		return (
			<div className="container">
				<div>
					<h1>
						{book.title}
						<br />
						<small>{book.description}</small>
						<br />
						<small className="text-primary">{book.price} บาท</small>
					</h1>
					<hr />
					{/* <img src={book.image_url} /> */}
					<button type="button" class="btn btn-warning" onClick={this.handleEditMode}>
						แก้ไข
					</button>{' '}
					<button type="button" class="btn btn-danger" onClick={this.handleDelete}>
						ลบ
					</button>
				</div>
			</div>
		)
	}
}

export default withRouter(ViewBook)
