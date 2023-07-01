// Store that keeps track of which drawer is open in the search.
// This way, when the drawer component re-renders, it will know
// if it should be open or not.

import { Message } from '@/features/chats/types/conversations';
import { create } from 'zustand';

type ChatStore = {
  messages: Message[];
  addMessages: (messages: Message[]) => void;
  setMessageAsRead: (message: any) => void;
  emptyMessages: () => void;
};

const chatStore = (set) => ({
  messages: [],
  addMessages: (messages) =>
    set((state) => ({ messages: [...state.messages, ...messages] })),
  setMessageAsRead: (message: any) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === message.message_id ? { ...m, read_by_recipient: true } : m
      ),
    })),
  emptyMessages: () => set({ messages: [] }),
});

export const useChatStore = create<ChatStore>(chatStore); // Store that keeps track of the current user's information.
