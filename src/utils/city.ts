import { fromEnv, ofEnum } from "./enum.ts";

export enum CityCode {
  YVR = "yvr",
  YYZ = "yyz",
}

export const BUILD_TIME_SUBDOMAIN = fromEnv(CityCode, "SUB");

export function getCurrentCityFromSubdomain(): CityCode | undefined {
  if (typeof window === "undefined") return BUILD_TIME_SUBDOMAIN;
  const subdomain = window.location.hostname.split(".")[0];
  return ofEnum(CityCode, subdomain);
}

const LAND_ACKNOWLEDGEMENTS = {
  [CityCode.YVR]: `
Metro Vancouver is located within the shared, unceded, and ancestral territories
of many Indigenous Peoples, including 10 local First Nations: q̓ic̓əy̓ (Katzie),
q̓ʷɑ:n̓ƛ̓ən̓ (Kwantlen), kʷikʷəƛ̓əm (Kwikwetlem), máthxwi (Matsqui),
xʷməθkʷəy̓əm (Musqueam), qiqéyt (Qayqayt), Semiahmoo, Sḵwx̱wú7mesh Úxwumixw
(Squamish), scəw̓aθən məsteyəxʷ (Tsawwassen) and səlilwətaɬ (Tsleil-Waututh).`,

  [CityCode.YYZ]: `We acknowledge that Toronto is located on the traditional territory of many nations including the Mississaugas of the Credit, the Anishnabeg, the Chippewa, the Haudenosaunee and the Wendat peoples.`,
};

export function getLandAcknowledgment(): string {
  const cityCode = getCurrentCityFromSubdomain();
  return LAND_ACKNOWLEDGEMENTS[cityCode] || "";
}
