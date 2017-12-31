/* eslint-disable no-param-reassign,react/jsx-closing-tag-location */
import { compose, withHandlers, withState } from 'recompose';

import React from 'react';

const MessageInput = props => (
	<div>
		<select
			value={props.targetSelect}
			onChange={event => props.updateTargetSelect(event.target.value)}
		>
			<option value="all">All</option>
			{props.players.map(player =>
				(<option
					key={player.username}
					value={player.username}
					disabled={player.username === props.username}
				>{player.username}
				</option>))}
		</select>
		<label htmlFor="message-input">Message:
			<input
				id="username-input"
				type="text"
				onKeyPress={event => props.onInputMessage(event)}
			/>
		</label>
	</div>
);

const enhancer = compose(
	withState('targetSelect', 'updateTargetSelect', 'all'),
	withHandlers({
		onInputMessage: props => (event) => {
			if (event.key === 'Enter') {
				if (props.targetSelect === 'all') {
					props.onAddPublicMessage(event.target.value);
				} else {
					props.onAddPrivateMessage({ message: event.target.value, target: props.targetSelect });
				}
				event.target.value = '';
			}
		},
	}),
);

export default enhancer(MessageInput);
