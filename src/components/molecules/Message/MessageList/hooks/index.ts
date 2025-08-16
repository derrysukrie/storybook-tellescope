import type { IMessage } from "../../types";

export const useEstimateMessageHeight = (
    message: IMessage,
    lastDate: Date | null
  ): number => {
    let height = 0;
    const basePadding = 16;
    const messagePadding = 12;
    height += basePadding + messagePadding;
    if (message.text) {
      const averageCharPerLine = 50;
      const lineHeight = 20;
      const estimatedLines = Math.ceil(message.text.length / averageCharPerLine);
      height += Math.min(estimatedLines, 10) * lineHeight;
    }
    if (message.image) {
      height += 200;
    }
    if (message.createdAt) {
      const showDateSeparator =
        !lastDate ||
        lastDate.toDateString() !== new Date(message.createdAt).toDateString();
      if (showDateSeparator) {
        height += 40;
      }
    }
    height += 32;
    return height;
  };
  