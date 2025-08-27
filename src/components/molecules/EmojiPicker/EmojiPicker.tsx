import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React from "react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
}) => {
  return (
    <Picker
      data={data}
      previewPosition="none"
      onEmojiSelect={onEmojiSelect}
      theme="light"
    />
  );
};

export const EmojiPicker = React.memo(EmojiPickerComponent);
