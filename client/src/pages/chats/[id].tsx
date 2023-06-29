import { BaseLayout } from '@/components/Layouts';
import { ChatHeader, MessageList } from '@/features/chats/components';
import { useChat } from '@/hooks/useChat';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
};

type ChatProps = {
  pageProps: {
    id: string;
  };
};

const Chat = ({ pageProps }: ChatProps) => {
  const { id } = pageProps;
  const { conversation, sendTextMessage, connectionStatus } = useChat(id);

  if (!conversation) return <></>;

  return (
    <BaseLayout className="flex flex-col">
      <ChatHeader conversation={conversation} />
      <div className="flex h-full flex-col justify-end overflow-auto px-4">
        <MessageList conversation={conversation} />
      </div>
      <MessageInput
        sendTextMessage={sendTextMessage}
        connectionStatus={connectionStatus}
      />
    </BaseLayout>
  );
};

export default Chat;

type MessageInputProps = {
  sendTextMessage: (text: string) => void;
  connectionStatus: string;
};

const MessageInput = ({
  sendTextMessage,
  connectionStatus,
}: MessageInputProps) => {
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Messages are limited to 2000 chars in the backend
    const trimmedMessage = message.trim().substring(0, 2000);
    if (trimmedMessage.length > 0) {
      sendTextMessage(trimmedMessage);
    }
    setMessage('');
  };

  const [message, setMessage] = useState('');

  return (
    <div className="absolute bottom-0 w-full p-4">
      <form
        className="flex h-16 w-full items-center justify-between rounded-full bg-light-gray"
        onSubmit={handleSubmitMessage}
      >
        <textarea
          className="h-full w-full resize-none bg-transparent p-5 text-xl leading-none focus:outline-none"
          placeholder={
            connectionStatus === 'Open'
              ? 'Escribe un mensaje...'
              : 'Conectando...'
          }
          value={message}
          maxLength={2000}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key == 'Enter' && !e.shiftKey && handleSubmitMessage(e)
          }
          disabled={connectionStatus !== 'Open'}
        />
        <button
          className="mr-2 flex aspect-square w-14 items-center justify-center rounded-full bg-green p-1.5 text-white"
          type="submit"
        >
          <ArrowRightIcon />
        </button>
      </form>
    </div>
  );
};
