import React from 'react';
import Category from './Category.jsx';
import ContactInfo from '../contacts/ContactsList.jsx';
import actionEmitter from '../actionEmitter';

let categories = [{
	id: 0,
	name: 'All Contacts'
},{
	id: 'abc',
	name: 'Myntra Contacts'
},{
	id: 'def',
	name: 'Personal Contacts'
}];

let contactList = [{
	id: 1,
	name: 'Apple Inc',
	belongsTo: [0]
},{
	id: 2,
	name: 'Anjali',
	belongsTo: [0,'def']
},{
	id: 3,
	name: 'Naveen',
	belongsTo: [0,'abc']
}];

class Categories extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			contacts: contactList,
			categories: categories,
			add_category: false,
			current_category: 0
		}

		this.onItemClick = this.onItemClick.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.addContactInList = this.addContactInList.bind(this);
		this.moveInCategory = this.moveInCategory.bind(this);
	}
	
	onItemClick(category) {
		let filteredContacts = this.getFilteredContacts( contactList, category.id);
		this.setState({contacts: filteredContacts, current_category: category.id});
		actionEmitter.emit("SHOW_FIRST_USER_DETAILS", {'user_detail': filteredContacts[0]});
  	}

  	addCategory(data) {
		this.setState({add_category: data.add_category});
  	}

  	generateUid()
	{
	    var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz";
	    for( var i=0; i < 3; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}

  	addGroupInList(e) {
	    if (e.key === 'Enter') {
			this.setState({add_category: false});
			let id = this.generateUid();
			let name = this.refs.add_category_name.value ? this.refs.add_category_name.value : name = 'Untitled Group';
			categories.push({id, name});
			this.setState({ categories: categories });
	    }
  	}

	addContactInList(data) {
	    let id = parseInt(contactList[contactList.length-1].id) + 1;
	    let name = data.name ? data.name : 'No Name';
		let belongsTo = [];
		belongsTo.push(this.state.current_category);
		if( this.state.current_category !== 0 ){
			belongsTo.push(0);
		}
		contactList.push({id, name, belongsTo});
		let filteredContacts = this.getFilteredContacts( contactList, this.state.current_category);
	    this.setState({ contacts: filteredContacts });
		let new_contact = {name: name, id: id};
		actionEmitter.emit("HIDE_ADD_CONTACT", {'add_contact': false, new_user_detail: new_contact});
  	}

  	getFilteredContacts(contactList, current_category){
  		let filtered_contacts = contactList.filter(
			(contact) => {	
				return contact.belongsTo.indexOf(current_category) !== -1; 
			}
		);
		return filtered_contacts;
  	}

  	moveInCategory( data ){
		contactList.map((contact) => {
			return contact.id === data.contact ? contact.belongsTo.push(data.category) : null
		});
  	}

  	componentDidMount() {
  		actionEmitter.on('ADD_CATEGORY', this.addCategory);
  		actionEmitter.on('ADD_CONTACT_IN_LIST', this.addContactInList);
  		actionEmitter.on("MOVE_CONTACT_IN_CATEGORY", this.moveInCategory);
  	}

	render() {
		return (
			<div className="main_container container">
				<section id="categories">
					<header id="header">
						<p>On My Mac</p>
					</header>
					<ul>
						{this.state.categories.map((category,i) => {
							return <Category active = { category.id === this.state.current_category } itemClick={this.onItemClick} category={category} key={category.id} />
						})
						}
					</ul>
					{this.state.add_category ? <input className="add_category" ref="add_category_name" type="text" placeholder="Untitled Group" onKeyPress={this.addGroupInList.bind(this)}/> : null}
				</section>
				<ContactInfo contacts={this.state.contacts} categories={this.state.categories} current_category={this.state.current_category}/>
			</div>
		)
	}
}

export default Categories;

