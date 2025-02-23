import { DateTime } from "luxon";

export class SendEmailRequest {
	constructor(
		public source: string,
		public destination: string,
		public body: string,
		public subject = `${DateTime.now()
			.setZone("Asia/Tokyo")
			.toFormat("yyyy-MM-dd")}のAIニュースです。`,
	) {}
}
