import React from 'react';
import './ContentArea.css';

const ContentArea = ({name,type,description,severity}) => {
return(
	<div className='flex_container'>
		<div className='name_type'>
			<div id='name' className={severity}>{name}</div>
			<div id='type'>{type}</div>	
		</div>
		<div className='content' id='description'><span className='detailed_des'>{description}</span></div>
		<div className='detail' id='detail'>></div>
	</div>
	);
}

export default ContentArea; 