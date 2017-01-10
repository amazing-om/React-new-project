import React from 'react';

const Category = ({category, itemClick, active}) => (
	<li className = {active? 'category_active' : null } onClick={() => {
			itemClick(category);
		}}>
		<a href="#">{category.name}</a>
	</li>
);
	
export default Category;

