import React from 'react';
import './Leader.scss'

const Leader = (props) => {

	return (
		
		<tr className="leader-tr">
			<td>{props.number}</td>
			<td className="text-left">
				<div>
					{props.leaderinfo.username}
				</div>
				<img src={props.leaderinfo.img} alt="leader profile picture" className="img leader-prof-img"/>
				
			</td>
			<td>{props.leaderinfo.recent}</td>
			<td>{props.leaderinfo.alltime}</td>
		</tr>
		


	)
}

export default Leader;