import { LayoutWithNavbar } from '@/components/Layouts';
import { ROLES } from '@/constants/roles';
import { useListConversations } from '@/features/chats/api/list';
import { ConversationList } from '@/features/chats/components';
import { useAuth } from '@/hooks/useAuth';

const Chats = () => {
  useAuth({ roles: [ROLES.AUTHENTICATED] });
  const { conversations } = useListConversations();

  return (
    <LayoutWithNavbar className="p-4">
      <ConversationList conversations={conversations} />
    </LayoutWithNavbar>
  );
};

export default Chats;
