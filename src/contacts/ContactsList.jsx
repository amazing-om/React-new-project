import React from 'react';
import Contact from './Contact.jsx';
import UserDetails from '../userDetails/UserDetails.jsx';
import actionEmitter from '../actionEmitter';

let userInfos = [{
	id: 0,
	phone: 'phone',
	email: 'email',
	name: 'name',
	belongsTo: '0',
	birthday: 'yyyy-MM-dd'
},{
	id: 1,
	name: 'Apple Inc',
	phone: '3637456384568',
	email: 'apple@abc.com',
	belongsTo: '1',
	birthday: 'yyyy-MM-dd'
},{
	id: 2,
	phone: '12323556',
	email: 'anjali@abc.com',
	belongsTo: '2',
	birthday: 'yyyy-MM-dd'
},{
	id: 3,
	phone: '000001232',
	email: 'naveen@abc.com',
	belongsTo: '3',
	birthday: 'yyyy-MM-dd'
}];

class ContactsList extends React.Component{
	constructor() {
		super();
		this.state = {
			search: '',
			userInfo: userInfos[1],
			add_contact: false,
			current_contact: userInfos[1].id,
			move_disabled: true,
			current_moveIn_category: ''
		}
		this.onContactClick = this.onContactClick.bind(this);
		this.addContact = this.addContact.bind(this);
		this.hideAddContact = this.hideAddContact.bind(this);
		this.UpdateUserDetail = this.UpdateUserDetail.bind(this);
		this.moveContact = this.moveContact.bind(this);
		this.selectedCategory = this.selectedCategory.bind(this);
		this.showFirstUserDetail = this.showFirstUserDetail.bind(this);
	}

	updateSearch(event) {
		this.setState({search: this.refs.search_value.value})
	}

	onContactClick(contact) {
		let filteredUserInfo = userInfos.filter((userInfo) => {	
			return userInfo.belongsTo.indexOf(contact.id) !== -1; 
		});
		if( filteredUserInfo.length > 0 ) {
			filteredUserInfo[0]['name'] = contact.name;
			this.setState({userInfo: filteredUserInfo[0], current_contact: contact.id});
		}else {
			this.setState({userInfo: userInfos[0], current_contact: 0});
		}
  	}

  	UpdateUserDetail( details ){
  		let user_detail = details.updated_detail;
  		userInfos.map((userInfo) => {	
			if ( userInfo.id === user_detail.id ) {
				userInfo.email = user_detail.email;
				userInfo.phone = user_detail.phone;
				userInfo.birthday = user_detail.birthday;
			} 
			return userInfo;
		});
		actionEmitter.emit("UPDATED_USER_DETAIL", {updatation: true});
  	}

  	showFirstUserDetail( data ){
  		let filteredUserInfo = userInfos.filter((userInfo) => {	
			return userInfo.belongsTo.indexOf(data.user_detail.id) !== -1; 
		});
		filteredUserInfo[0]['name'] = data.user_detail.name;
		this.setState({userInfo: filteredUserInfo[0], current_contact: data.user_detail.id})
  	}

  	hideAddContact(data){
  		this.setState({add_contact: data.add_contact});
  		let id = parseInt(userInfos[userInfos.length-1].id) + 1;
  		userInfos.push({id: id, name: data.new_user_detail.name, belongsTo: '' + data.new_user_detail.id});
  	}

  	addContact(data) {
  		if( data.add_contact ){
  			this.setState({add_contact: data.add_contact});
  		}
  	}

  	addGroupInList(e){
  		if (e.key === 'Enter') {
  			let name = this.refs.add_contact_name.value;
  			actionEmitter.emit("ADD_CONTACT_IN_LIST", {'name': name});
  		}
  	}

  	moveContact(){
  		let contact = this.state.current_contact;
  		let category = this.state.current_moveIn_category;
  		actionEmitter.emit("MOVE_CONTACT_IN_CATEGORY", {'category': category, 'contact': contact});
  	}

  	selectedCategory(e){
  		if( parseInt(e.target.value) !== -1 ){
  			this.setState({move_disabled: false, current_moveIn_category: e.target.value});
  			let selected_category = e.target.value;
  		}else {
  			this.setState({move_disabled: true});
  		}
  	}

  	componentDidMount() {
  		actionEmitter.on('ADD_CONTACT', this.addContact);
  		actionEmitter.on('HIDE_ADD_CONTACT', this.hideAddContact);
  		actionEmitter.on("UPDATE_USER_DETAIL", this.UpdateUserDetail);
  		actionEmitter.on("SHOW_FIRST_USER_DETAILS", this.showFirstUserDetail);
  	}

	render() {
		let filteredContacts = this.props.contacts.filter((contact) => {	
			return contact.name.toLowerCase().indexOf(this.state.search) !== -1; 
		});
		return (
			<div className="main_container">
				<section id="contacts">
					<div id="search">
						<input type="text"  id="search_box" placeholder='Search Here' value={this.state.search}  ref = "search_value" onChange = {this.updateSearch.bind(this)}/>
					</div>
					<select onChange={this.selectedCategory}>
						<option value='-1'> Select Category </option>
						{this.props.categories.map((category) => {
							return category.id !== this.props.current_category ? <option value={category.id} key={category.id}>{category.name}</option> : null 
						})}
					</select>
					<button disabled={this.state.move_disabled} onClick={this.moveContact}>move</button>
					<ul>
						{filteredContacts.map((contact) => {
							return <Contact active = { contact.id === this.state.current_contact } contactClick={this.onContactClick} contact={contact} key={contact.id} />
						})}
					</ul>
					{this.state.add_contact ? <input className="add_category" ref="add_contact_name" type="text" placeholder="No Name" onKeyPress={this.addGroupInList.bind(this)}/> : null}
				</section>
				<UserDetails userDetail = {this.state.userInfo} read_only={true}/> 
			</div>
		)
	}
}

export default ContactsList;

