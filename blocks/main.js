import React from 'react'
import Header from './header'
import Tasks from './tasks'

export default ({commonStaff, handler}) => (
	<div className="data">
		<Header />
		<Tasks commonStaff={commonStaff} handler={handler}/>
	</div>
);