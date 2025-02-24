import { DateTime } from "luxon";

export class SendEmailRequest {
	constructor(
		readonly source: string,
		readonly destination: string,
		readonly body: string,
		readonly subject = `${DateTime.now().setZone("Asia/Tokyo").toFormat("yyyy-MM-dd")}のAIニュースです。`,
	) {}
}
