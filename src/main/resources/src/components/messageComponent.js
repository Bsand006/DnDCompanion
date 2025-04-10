import React, { useState, useEffect } from 'react';
import { getMessages, saveMessage } from '../services/apiService';

const MessageComponent = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const data = await getMessages();
			setMessages(data);
		} catch (error) {
			console.error('Failed to fetch messages', error);
		}
	};


	return (
		<div>

			{messages}

		</div>
	);
};
export default MessageComponent;
