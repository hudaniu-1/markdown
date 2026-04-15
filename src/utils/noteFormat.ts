/** 将内容转为近似「文件大小」展示 */
export function formatSizeBytes(text: string): string {
  const bytes = new Blob([text]).size;
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** 相对时间文案 */
export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "刚刚";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} 天前`;
  return new Date(ts).toLocaleDateString("zh-CN");
}

/** 字数统计（含中文，剔除空白） */
export function countChars(text: string): number {
  return text.replace(/\s/g, "").length;
}
