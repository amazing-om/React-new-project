import React from 'react';
import AddData from '../others/AddData.jsx';
import actionEmitter from '../actionEmitter';

class UserDetails extends React.Component{

	constructor() {
		super();
		this.state = {
			isAddClicked : false,
			read_only: true
		}
		this.addData = this.addData.bind(this);
		this.hideAddClick = this.hideAddClick.bind(this);
		this.addPhoneNumber = this.addPhoneNumber.bind(this);
		this.addEmail = this.addEmail.bind(this);
		this.addBirthday = this.addBirthday.bind(this);
		this.updateUserDetail = this.updateUserDetail.bind(this);
		this.updatedUserDetail = this.updatedUserDetail.bind(this);
	}

	addData(){
		this.setState({isAddClicked: !this.state.isAddClicked});
	}

	hideAddClick( data ){
		this.setState({isAddClicked: data.hide_add_data});
	}

	addPhoneNumber( data ){
		this.setState({read_only: false});
		this.refs.phone.focus(); 
	}

	addEmail( data ){
		this.setState({read_only: false});
		this.refs.email.focus(); 
	}

	addBirthday( data ){
		this.setState({read_only: false});
		this.refs.birthday.focus(); 
	}

	editUserDetail() {
		this.setState({read_only: false});
		this.refs.phone.focus(); 
	}

	componentDidMount() {
  		actionEmitter.on('HIDE_ADD_DATA', this.hideAddClick);
  		actionEmitter.on("ADD_PHONE", this.addPhoneNumber);
  		actionEmitter.on("ADD_EMAIL", this.addEmail);
  		actionEmitter.on("ADD_BIRTHDAY", this.addBirthday);
  		actionEmitter.on("UPDATED_USER_DETAIL", this.updatedUserDetail);
  	}


	updatedUserDetail() {
		this.setState({read_only: true});
	}

 
  	updateUserDetail(){
  		let phone = this.refs.phone.value;
  		let email = this.refs.email.value;
  		let birthday = this.refs.birthday.value;
  		let id = this.props.userDetail.id;
  		let updated_detail = {phone: phone, email: email, birthday: birthday, id: id};
  		actionEmitter.emit("UPDATE_USER_DETAIL", {'updated_detail': updated_detail});
  	}

	render() {
		return (
			<section id="contact_details" key={this.props.userDetail.id}>
				<div id="user_details">
					<div id="user_basic_info">
						<img src="images/avatar.png" />
						<div>
							<span id="name">{this.props.userDetail.name}</span>
							<span id="company">Company</span>
						</div>
					</div>
					<div id="user_other_info">
						<div id="mobile" className="heading">
							<p>Mobile</p> 
							<input type="text" readOnly={ this.state.read_only === false ? this.state.read_only : this.props.read_only} placeholder="Phone" ref="phone" defaultValue={this.props.userDetail.phone}/> 
						</div>
						<div id="email" className="heading"> 
							<p>Email</p>
							<input type="text" readOnly={ this.state.read_only === false ? this.state.read_only : this.props.read_only} placeholder="abc@gmail.com" ref="email" defaultValue={this.props.userDetail.email}/> 
						</div>
						<div id="ringtone" className="heading">
							<p>Ringtone</p>
							<select>
								<option>Opening</option>
								<option>Chimes</option>
								<option>Circuit</option>
							</select>
						</div>
						<div id="texttone" className="heading">
							<p>Texttone</p>
							<select>
								<option>Bamboo</option>
								<option>Chords</option>
								<option>Circles</option>
							</select>
						</div>
						<div id="address" className="heading">
							<p>Address</p>
							<div>
								<input type="text" name="street" placeholder="Street" />
								<input type="text" name="city" placeholder="City" />
								<input type="text" name="pincode" placeholder="PinCode" />
								<input type="text" name="state" placeholder="State" />
								<input type="text" name="country" placeholder="Country" />
							</div>
						</div>
						<div id="birthday" className="heading">
							<p>Birthday</p> 
							<input type="date" readOnly={ this.state.read_only === false ? this.state.read_only : this.props.read_only} placeholder="yyyy-MM-dd" ref="birthday" defaultValue={this.props.userDetail.birthday}/> 
						</div>
						<div id="note" className="heading">
							<p>Note</p>
							<input type="text" name="note" />
						</div>
					</div>
				</div>
				{ this.state.isAddClicked ? <AddData /> : null }
				<footer id="footer">
					<div id="add">
						<button onClick={this.addData}>+</button>
					</div>
					{ ( this.props.read_only && this.state.read_only ) ? <button id="done" onClick={this.editUserDetail.bind(this)}>Edit</button> : <button id="done" onClick={this.updateUserDetail.bind(this)}>Done</button> }
					<button id="export">Export</button>
				</footer>
			</section>
		)
	}
}

export default UserDetails;

