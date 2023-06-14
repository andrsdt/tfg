import { WS_URL } from '@/config';
import NEXT_ROUTES from '@/constants/routes';
import { retrieveConversation } from '@/features/chats/api/retrieve';
import { CONNECTION_STATUS } from '@/features/chats/types/connectionStatuses';
import {
  Conversation,
  SocketMessage,
} from '@/features/chats/types/conversations';
import { useChatStore } from '@/stores/chats';
import router from 'next/router';
import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useAuth } from './useAuth';
import { useRetrieveHandler } from './useRetrieveHandler';

export const useChat = (id: string) => {
  const { user } = useAuth();

  const { addMessages, setMessageAsRead, emptyMessages } = useChatStore();

  const [historyConversation] = useRetrieveHandler<Conversation, Conversation>(
    () => retrieveConversation(id)
  );

  const { sendJsonMessage, readyState } = useWebSocket(
    `${WS_URL}/ws/chat/${id}/`,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      onClose: async () => {
        // TODO: maybe this will also send user to home when the websocket has to reconnect.
        // Specify a reason in the close() -> throw an error maybe?
        await router.replace(NEXT_ROUTES.HOME);
      },
      onMessage: (event) => {
        if (!event.data) return;
        const message = JSON.parse(event.data) as SocketMessage;
        const messageIsMine = message?.sender === user?.pk;
        // Answer with a read confirmation when I receive a message from another user
        if (message.message_type !== 'READ_CONFIRMATION' && !messageIsMine) {
          sendReadConfirmation(message.id);
        }

        if (message.message_type === 'TEXT_MESSAGE') {
          addMessages([message]);
        }
        if (message.message_type === 'READ_CONFIRMATION') {
          setMessageAsRead(message);
        }
      },
    }
  );

  const sendReadConfirmation = (messageId: number) => {
    sendJsonMessage({
      message_type: 'READ_CONFIRMATION',
      message_id: messageId,
    });
  };

  const sendTextMessage = (text: string) => {
    sendJsonMessage({
      message_type: 'TEXT_MESSAGE',
      text,
    });
  };

  useEffect(() => {
    // When the connection is open, send a read
    // confirmation for all the pending messages
    if (readyState !== ReadyState.OPEN || !historyConversation) return;
    historyConversation?.messages.forEach((message) => {
      const messageIsMine = message?.sender === user?.pk;
      if (
        message.message_type === 'TEXT_MESSAGE' &&
        !message.read_by_recipient &&
        !messageIsMine
      ) {
        sendReadConfirmation(message.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState, historyConversation]);

  // Empty messages from the state when mounting
  useEffect(emptyMessages, [emptyMessages]);

  return {
    conversation: historyConversation,
    sendTextMessage,
    connectionStatus: CONNECTION_STATUS[readyState],
  };
};
