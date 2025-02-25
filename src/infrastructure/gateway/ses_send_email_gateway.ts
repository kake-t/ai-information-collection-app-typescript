import { type SESClient, SendEmailCommand, type SendEmailCommandInput } from "@aws-sdk/client-ses";

import type { SendEmailRequest } from "../../domain/entities/send_email";
import type { SendEmailGateway } from "../../domain/gateway/send_email_gateway";

export class SesSendEmailGateway implements SendEmailGateway {
	private static readonly CHARSET = "UTF-8";

	constructor(readonly ses: SESClient) {}
	async send_email(request: SendEmailRequest): Promise<void> {
		const source = request.source;
		const destination = request.destination;
		const subject = request.subject;
		const body = request.body;

		const input: SendEmailCommandInput = {
			Destination: {
				ToAddresses: [destination],
			},
			Message: {
				Subject: {
					Charset: SesSendEmailGateway.CHARSET,
					Data: subject,
				},
				Body: {
					Text: {
						Charset: SesSendEmailGateway.CHARSET,
						Data: body,
					},
				},
			},
			Source: source,
		};
		await this.ses.send(new SendEmailCommand(input));
	}
}
