import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ViewBook from './containers/ViewBook'
import AddBook from './containers/AddBook'
import Home from './containers/Home'

class App extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/new" component={AddBook} />
					<Route exact path="/:id" component={ViewBook} />
				</Switch>
			</div>
		)
	}
}

export default App
