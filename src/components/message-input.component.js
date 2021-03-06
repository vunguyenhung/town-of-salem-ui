/* eslint-disable no-param-reassign,react/jsx-closing-tag-location */
import { compose, withHandlers, withState } from 'recompose';
import { contains } from 'ramda';

import React from 'react';

const MAFIAs = [
	'Godfather',
	'Blackmailer',
	'Framer',
	'Mafioso',
];

const MessageInput = props => (
	<div className="form-group pt-2 px-3">
		<div className="row">
			<select
				className="form-control col-3"
				value={props.targetSelect}
				onChange={event => props.updateTargetSelect(event.target.value)}
			>
				<option value="all" disabled={props.phase[0] === 'N'}>All</option>
				{contains(props.role)(MAFIAs) && <option value="mafia">Mafia</option>}
				{props.players.map(player =>
					(<option
						key={player.username}
						value={player.username}
						disabled={player.username === props.username
						|| player.died
						|| props.phase[0] !== 'N'
						|| props.status === 'blackmailed'
						|| props.died}
					>{player.username}
					</option>))}
			</select>
			<input
				type="text"
				className="form-control col-9 pl-2"
				id="message-input"
				placeholder="Message"
				disabled={props.status === 'blackmailed'}
				onKeyPress={event => props.onInputMessage(event)}
			/>
		</div>
	</div>
);

const enhancer = compose(
	withState('targetSelect', 'updateTargetSelect', 'all'),
	withHandlers({
		onInputMessage: props => (event) => {
			if (event.key === 'Enter' && event.target.value.trim() !== '') {
				if (props.died) {
					props.onAddDeadMessage(event.target.value);
				} else if (props.targetSelect === 'all') {
					props.onAddPublicMessage(event.target.value);
				} else if (props.targetSelect === 'mafia') {
					props.onAddMafiaMessage(event.target.value);
				} else {
					props.onAddPrivateMessage({ message: event.target.value, target: props.targetSelect });
				}
				event.target.value = '';
			}
		},
	}),
);

export default enhancer(MessageInput);
