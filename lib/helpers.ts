export const limitText = (sentence: string, limit: number) =>
  sentence.length > limit ? sentence.slice(0, limit) + "..." : sentence;

export const dateLocale = (date: Date) => {
  const conv = new Date(date);
  return conv.toLocaleDateString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const dateTimeLocale = (date: Date) => {
  const conv = new Date(date);
  return conv.toLocaleString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const useDefaultCatagories = () => [
  { category: "", subCategories: [{ category: "", imageUrl: "" }] },
];

export const firstUppercase = (word?: string | string[]) =>
  word &&
  word
    .toString()
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

export const cleanObject = (object?: { [key: string]: string | undefined }) => {
  if (object)
    Object.keys(object).forEach((key) => {
      if (object[key] === null || object[key] === undefined) {
        delete object[key];
      }
    });
  return object;
};
