import type {  IMessage, Reaction } from "../../types";
import { MessageImage } from "./MessageImage/MessageImage";
import { MessageLink } from "./MessageLink/MessageLink";
import { MessageText } from "./MessageText/MessageText";
import { MessageScheduled } from "./MessageScheduled/MessageScheduled";
import type { ChatInterface } from "../../../../Organism/ItemViewer/types";

interface MessageContentProps {
  message: IMessage;
  reactions?: Reaction[];
  avatar?: string;
  chatInterface?: ChatInterface;
  scheduledTime?: string;
}

const getMessageComponent = (message: IMessage) => {
  if (message.image) {
    return { Component: MessageImage, props: { image: message.image } };
  }
  if (message.link) {
    return { Component: MessageLink, props: { link: message.link } };
  }
  if (message.scheduledTime) {
    return {
      Component: MessageScheduled,
      props: {
        scheduledTime: message.scheduledTime,
        children: message.text,
      },
    };
  }
  return { Component: MessageText, props: { children: message.text } };
};

export const MessageContent = ({
  message,
  reactions,
  avatar,
  chatInterface,
  scheduledTime,
}: MessageContentProps) => {
  const { Component, props } = getMessageComponent(message);
  const commonProps = {
    messageType: message.type,
    reactions,
    avatar,
    chatInterface,
    scheduledTime,
  };

  const TypedComponent = Component as any;
  return <TypedComponent {...commonProps} {...props} />;
}; 