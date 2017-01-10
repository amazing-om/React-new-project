import React from 'react';

const Contact = ({contact, contactClick, active}) =>
	<li className={active ? 'contact_active' : null} onClick={() => {
			contactClick(contact);
		}}> 
		<a href="#"> {contact.name} </a> 
	</li>
	
export default Contact;

