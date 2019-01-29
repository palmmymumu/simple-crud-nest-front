import React, { Component } from 'react'
import * as axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	state = {
		books: [],
		isLoading: true
	}

	componentDidMount = () => {
		this.setState(
			{
				isLoading: true
			},
			() => {
				axios
					.get('http://localhost:3001/api/book')
					.then(res => {
						const { books } = res.data
						this.setState({ books })
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

	render() {
		const { books, isLoading } = this.state
		return (
			<div className="container">
				<table className="table table-striped">
					<thead>
						<th>#</th>
						<th>ชื่อหนังสือ</th>
						<th>คำอธิบาย</th>
						<th>ราคา</th>
						<th />
					</thead>
					<tbody>
						{isLoading === true && (
							<tr>
								<td colSpan="5">
									<center>กำลังโหลดข้อมูล...</center>
								</td>
							</tr>
						)}
						{isLoading === false && books.length === 0 && (
							<tr>
								<td colSpan="5">
									<center>- ไม่มีหนังสือในระบบ -</center>
								</td>
							</tr>
						)}
						{isLoading === false &&
							books.length !== 0 &&
							books.map(book => (
								<tr>
									<td>{book.book_id}</td>
									<td>{book.title}</td>
									<td>{book.description}</td>
									<td>{book.price}</td>
									<td>
										<Link to={`/${book.book_id}`} className="btn btn-sm btn-primary">
											View
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		)
	}
}
