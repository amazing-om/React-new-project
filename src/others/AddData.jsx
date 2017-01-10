import React from 'react';
import AddDataList from './AddDataList.jsx';
import actionEmitter from '../actionEmitter';

class AddData extends React.Component{

	addCategory(){
		actionEmitter.emit("ADD_CATEGORY", {'add_category': true});
		actionEmitter.emit("HIDE_ADD_DATA", {'hide_add_data': false});
	}

	addGroup(){
		actionEmitter.emit("ADD_CONTACT", {'add_contact': true});
		actionEmitter.emit("HIDE_ADD_DATA", {'hide_add_data': false});
	}

	addPhoneNumber(){
		actionEmitter.emit("ADD_PHONE", {'add_phone': true});
		actionEmitter.emit("HIDE_ADD_DATA", {'hide_add_data': false });
	}

	addEmail(){
		actionEmitter.emit("ADD_EMAIL", {'add_email': true});
		actionEmitter.emit("HIDE_ADD_DATA", {'hide_add_data': false});
	}

	addBirthday(){
		actionEmitter.emit("ADD_BIRTHDAY", {'add_birthday': true});
		actionEmitter.emit("HIDE_ADD_DATA", {'hide_add_data': false});
	}

	render() {
		return (
			<div id="add_data">
				<ul> 
					<li onClick={this.addCategory}>Add Group</li>
					<li onClick={this.addGroup} className="add_data_second_item">Add Contact </li>
					<li className="add_data_third_item"> Add Field to Card : </li>
					<li onClick={this.addPhoneNumber}> Phone </li>
					<li onClick={this.addEmail}> Email </li>
					<li onClick={this.addBirthday}> Birthday </li>
				</ul>
			</div>
		)
	}
}

export default AddData;

