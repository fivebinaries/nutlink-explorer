export const middleCrop = (text: string, startChars: number, endChars: number): string => {
  if (text.length <= startChars + endChars) return text;
  const start = text.substring(0, startChars);
  const end = text.substring(text.length - endChars, text.length);
  return `${start}…${end}`;
};

export const middleCropFixed = (text: string, lengthLimit: number): string => {
  const length = text.length;
  const overLimit = length - lengthLimit;
  if (overLimit <= 0) {
    return text;
  }

  const chunkLength = (length - overLimit) / 2;
  const start = text.substring(0, Math.floor(chunkLength));
  const end = text.substring(text.length - Math.ceil(chunkLength), text.length);
  return `${start}…${end}`;
};

export const getCurrencySymbol = (currency: string): string | undefined => {
  const symbols: { [s: string]: string | undefined } = {
    usd: '$',
    cad: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    btc: '฿',
  };
  return symbols[currency];
};
