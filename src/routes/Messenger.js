import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChannelsManager from '../channels/ChannelsManager';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';
import ChatList from '../components/ChatList';
import MessageContainer from '../components/MessageContainer';
import UserList from '../components/UserList';
import UserPanel from '../components/UserPanel';
import { selectCurrentChatId, selectPeer } from '../stores/activeChatStore';
import { selectCurrentUser } from '../stores/authStore';
import { selectChats } from '../stores/chatsStore';
import { useQuery } from '../utils/hooks';

const Messenger = () => {
	const user = useSelector(selectCurrentUser);
	const peer = useSelector(selectPeer);
	const chatId = useSelector(selectCurrentChatId);
	const chats = useSelector(selectChats);
	const history = useHistory();

	const chat = chats.find(chat => chat.id === chatId);

	const peerId = useQuery().peer;
	useEffect(() => {
		if(Number.parseInt(peerId) && peer?.id !== +peerId) {
			ChannelsManager.chats.requestChat(+peerId);
		} else {
			history.replace("?");
		}
	}, [peerId]);

	return (
		<div className="messenger">
			<div className="left-bar">
				<UserPanel user={user}/>
				<ChatList/>
				<UserList/>
			</div>
			<div className="main">
				{peer ?
					<div className="chat" style={{backgroundImage: `url("./images/default_bg.jpg")`}}>
						<ChatHeader peer={peer} action={chat?.action}/>
						<MessageContainer/>
						<ChatInput/>
					</div>
					:
					<div className="select-chat">
						<div className="select-chat-message">Select chat</div>
					</div>
				}
			</div>
		</div>
	)
}

export default Messenger;
