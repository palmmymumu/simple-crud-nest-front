import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
				<div className="container">
					<Link class="navbar-brand" to="/">
						Simple CRUD
					</Link>
					<div class="collapse navbar-collapse">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item">
								<Link class="nav-link active" to="/">
									หน้าหลัก
								</Link>
							</li>
							<li className="nav-item">
								<Link class="nav-link" to="/new">
									เพิ่มหนังสือใหม่
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
