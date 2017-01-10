import React from 'react';
import ReactDOM from 'react-dom';

import Categories from './categories/Categories.jsx';

class App extends React.Component{
	render() {
		return (
			<Categories />
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));