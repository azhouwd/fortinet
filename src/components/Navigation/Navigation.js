import React from 'react';
import './Navigation.css';
import logo from './logo.jpg';

class Navigation extends React.Component {

render(){
	return(
	<div className='overall'>
	<img className='logo' src={logo} alt='pic' />
	<div className='Navigation'>
		<input id='search_area' onChange={this.props.onSearchChange} 
			   placeholder='Search By Name' type='text' />
		<select id='drop_down' onChange = {this.props.setOptionValue}>  
  		  <option value="name">Name</option>
		  <option value="severity_up">Severity Up</option>
		  <option value="severity_down">Severity Down</option>
		</select>		
		<input className="btn-filter" type="submit" value="Filter"
			   onClick={this.props.sortMethod}
		 />
	</div>
	</div>
	);
}
}

export default Navigation; 