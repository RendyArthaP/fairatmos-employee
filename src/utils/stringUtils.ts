export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .filter(Boolean) // hilangkan spasi ganda
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const parseStringToArray = (str: string): string[] => {
  if (!str) return [];
  return str
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
};

export const parseArrayToString = (arr: string[]): string => {
  if (!arr || arr.length === 0) return "";
  return arr.join(", ");
};
