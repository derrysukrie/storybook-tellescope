import type { ChatInterface, IMessage } from '../../types';
import { HeaderContent } from './HeaderContent';
import type { HeaderFormData } from './types';

interface MessageHeaderProps {
  chatInterface: ChatInterface;
  content?: IMessage[];
  enableTeamChat?: boolean;
  setEnableTeamChat: (value: boolean) => void;
  headerFormData?: HeaderFormData;
  onHeaderFormChange?: (field: keyof HeaderFormData, value: string | string[]) => void;
}

export const MessageHeader = ({
  chatInterface,
  content,
  enableTeamChat,
  setEnableTeamChat,
  headerFormData,
  onHeaderFormChange
}: MessageHeaderProps) => {
  const isEmpty = content?.length === 0;

  return (
    <HeaderContent
      chatInterface={chatInterface}
      enableTeamChat={enableTeamChat}
      setEnableTeamChat={setEnableTeamChat}
      isEmpty={isEmpty}
      headerFormData={headerFormData}
      onHeaderFormChange={onHeaderFormChange}
    />
  );
};

export default MessageHeader;