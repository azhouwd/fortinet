import React from 'react';
import ContentArea from './ContentArea';

const ContentList = ({content}) => {
	const display = content.map((data,i)=>{
		return <ContentArea name={content[i].name} 
		type={content[i].type} 
		description={content[i].description} 
		severity = {content[i].severity}
		/>
	})

	return(
	<div>
		{display}
	</div>
	);
}

export default ContentList;