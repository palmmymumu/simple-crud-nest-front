import React, { Component } from 'react'
import * as axios from 'axios'

export default class AddBook extends Component {
	state = {
		book: {
			title: '',
			description: '',
			price: 0
		},
		isLoading: false
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
			const { history } = this.props
			e.preventDefault()
			this.setState(
				{
					isLoading: true
				},
				() => {
					axios
						.post(`http://localhost:3001/api/book`, { book })
						.then(res => {
							const { book } = res.data
							history.push(`/${book.book_id}`)
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
		const { book, isLoading } = this.state

		if (isLoading === true) {
			return <div className="container">กำลังโหลดข้อมูล...</div>
		}

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
						<input type="number" name="price" className="form-control" placeholder="ราคา" value={book.price} onChange={this.handleChange} />
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
}
