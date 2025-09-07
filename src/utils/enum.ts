type StrEnum = Record<string, string>;
type EGet<T> = T[keyof T] | undefined;

export function ofEnum<T extends StrEnum>(enumObj: T, str: string): EGet<T> {
  for (const key in enumObj) if (enumObj[key] === str) return enumObj[key];
}

export function fromEnv<T extends StrEnum>(enumObj: T, key: string): EGet<T> {
  if (typeof process === "undefined") return undefined;
  return ofEnum(enumObj, process.env[key]);
}
