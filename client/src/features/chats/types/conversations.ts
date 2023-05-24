import { Components } from '@/types/openapi';

export type ConversationPreview = Components.Schemas.ConversationPreview;
export type Conversation = Components.Schemas.Conversation;
export type Message = Components.Schemas.Message;
export type MessageType = Components.Schemas.MessageTypeEnum;

export type SocketMessage = Message & {
  message_type: MessageType & 'READ_CONFIRMATION';
};
