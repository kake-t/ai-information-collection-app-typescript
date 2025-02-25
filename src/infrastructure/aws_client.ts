import { SESClient } from "@aws-sdk/client-ses";

export const sesClient = (region: string) => new SESClient({ region });
