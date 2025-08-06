import  { useEffect, useRef, useState, useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { IMessage } from "../types";

import { MessageBubble } from "../MessageItem/MessageBubble/MessageBubble";
import { styles } from "../MessageInput/styles/maps";
import { DateSeparator } from "../MessageItem/DateSeparator";
import List from "rc-virtual-list";

export interface ChatProps {
  content: IMessage[];
  enableTeamChat: boolean;
}

export const Messages = ({ content, enableTeamChat }: ChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const calculateAverageItemHeight = useCallback(() => {
    // ... (Fungsi ini tidak perlu diubah, biarkan seperti adanya)
    if (!content || content.length === 0) return 100;
    let totalHeight = 0;
    let itemCount = 0;
    let lastDate: Date | null = null;
    content.forEach((message) => {
      let height = 0;
      const basePadding = 16;
      const messagePadding = 12;
      height += basePadding + messagePadding;
      if (message.text) {
        const averageCharPerLine = 50;
        const lineHeight = 20;
        const minLines = 1;
        const maxLines = 10;
        const estimatedLines = Math.min(
          Math.max(
            Math.ceil(message.text.length / averageCharPerLine),
            minLines
          ),
          maxLines
        );
        height += estimatedLines * lineHeight;
      }
      if (message.image) {
        height += 200;
      }
      if (message.createdAt) {
        const showDateSeparator = !lastDate || lastDate.toDateString() !== message.createdAt.toDateString();
        if (showDateSeparator) {
          height += 40;
        }
        lastDate = new Date(message.createdAt);
      }
      height += 32;
      totalHeight += height;
      itemCount++;
    });
    return itemCount > 0 ? totalHeight / itemCount : 100;
  }, [content]);

  const updateContainerHeight = useCallback(() => {
    if (messagesRef.current) {
      const parent = messagesRef.current.parentElement;
      if (parent) {
        setContainerHeight(parent.clientHeight);
      }
    }
  }, []);
  
  // Scroll to bottom function - Disederhanakan
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (listRef.current) {
      // rc-virtual-list memiliki method `scrollTo` sendiri
      listRef.current.scrollTo({
        index: content.length - 1,
        align: 'bottom',
        behavior: behavior,
      });
    }
  }, [content.length]);

  // useEffect untuk mengukur tinggi container
  useEffect(() => {
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    return () => window.removeEventListener('resize', updateContainerHeight);
  }, [updateContainerHeight]);

  // useEffect UTAMA untuk scroll. Menggabungkan initial load dan pesan baru.
  useEffect(() => {
    // Pastikan ada konten dan container sudah punya tinggi
    if (content && content.length > 0 && containerHeight > 0) {
        // Gunakan 'auto' untuk scroll instan pada load pertama atau perubahan besar
        // Gunakan timeout kecil untuk memastikan rc-virtual-list sudah siap
        setTimeout(() => scrollToBottom("auto"), 50);
    }
  }, [content, containerHeight, scrollToBottom]); // <-- KUNCI UTAMA ADA DI SINI

  const renderMessageItem = useCallback((message: IMessage, index: number) => {
    // ... (Fungsi ini tidak perlu diubah)
    const previousMessage = index > 0 ? content[index - 1] : null;
    const previousDate = previousMessage?.createdAt ? new Date(previousMessage.createdAt) : null;
    const currentDate = message.createdAt ? new Date(message.createdAt) : null;
    const showDateSeparator = currentDate && (
      !previousDate || 
      previousDate.toDateString() !== currentDate.toDateString()
    );
    return (
      <Box
        key={message.id || index}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "fit-content",
        }}
      >
        {showDateSeparator && currentDate && (
          <DateSeparator date={currentDate} />
        )}
        <MessageBubble 
          message={message} 
          messageId={message.id || String(Math.random())}
          isEmojiPickerActive={false}
          onAddReactionClick={() => {}}
        />
      </Box>
    );
  }, [content]);

  return (
    <Box
      ref={messagesRef}
      sx={{
        ...styles.messagesContainer(content?.length, enableTeamChat),
        flex: 1,
        overflow: 'hidden', // <-- Ganti overflowY ke hidden, biarkan List yang handle
        display: "flex",
        flexDirection: "column",
        height: "100%", // <-- Pastikan ini terdefinisi
      }}
    >
      {content?.length > 0 ? (
        <List 
          ref={listRef}
          data={content} 
          height={containerHeight}
          itemHeight={calculateAverageItemHeight()}
          itemKey="id"
        >
          {renderMessageItem}
        </List>
      ) : (
        <Stack
          sx={{
            ...styles.emptyContainer,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <Box sx={styles.emptyMessageBox}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              You must specify a subject to send a chat
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};