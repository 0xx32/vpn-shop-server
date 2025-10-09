import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";

export const validateInitData = (
  initData: string,
  botToken: string,
): boolean => {
  const searchParams = new URLSearchParams(initData);
  const hash = searchParams.get("hash");
  if (!hash) return false;

  searchParams.delete("hash");

  // Сортируем параметры по ключам
  const sortedEntries = Array.from(searchParams.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  // Формируем строку для подписи
  const dataCheckString = sortedEntries
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  // Генерируем секретный ключ
  const secretKey = createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  // Считаем хеш данных
  const calculatedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest();

  // Безопасное сравнение хешей
  const expectedHash = Buffer.from(hash, "hex");
  return (
    calculatedHash.length === expectedHash.length &&
    timingSafeEqual(calculatedHash, expectedHash)
  );
};
