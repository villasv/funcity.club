export const BUILD_TIME_SUBDOMAIN =
  typeof process === "undefined" ? undefined : process.env.SUB;

export enum CityCode {
  YVR = "yvr",
  YYZ = "yyz",
}

type StrEnum = Record<string, string>;
export function asEnum<T extends StrEnum>(enumObj: T, str: string): T[keyof T] {
  for (const key in enumObj) if (enumObj[key] === str) return enumObj[key];
  throw new Error(`Value ${str} not found in enum`);
}

export function getCurrentCityFromSubdomain(): CityCode | undefined {
  if (typeof window === "undefined") return undefined;
  const sub = window.location.hostname.split(".")[0];
  try {
    return asEnum(CityCode, sub);
  } catch {
    return undefined;
  }
}

const LAND_ACKNOWLEDGEMENTS = {
  [CityCode.YVR]: `Metro Vancouver is located within the shared, unceded, and
   ancestral territories of many Indigenous Peoples, including 10 local First
   Nations: q̓ic̓əy̓ (Katzie), q̓ʷɑ:n̓ƛ̓ən̓ (Kwantlen), kʷikʷəƛ̓əm (Kwikwetlem), máthxwi
   (Matsqui), xʷməθkʷəy̓əm (Musqueam), qiqéyt (Qayqayt), Semiahmoo, Sḵwx̱wú7mesh
   Úxwumixw (Squamish), scəw̓aθən məsteyəxʷ (Tsawwassen) and səlilwətaɬ (Tsleil-Waututh).`,

  [CityCode.YYZ]: `We acknowledge that Toronto is located on the traditional territory of many nations including the Mississaugas of the Credit, the Anishnabeg, the Chippewa, the Haudenosaunee and the Wendat peoples.`,
};

export function getLandAcknowledgment(cityCode?: CityCode): string {
  return LAND_ACKNOWLEDGEMENTS[cityCode] || "";
}
