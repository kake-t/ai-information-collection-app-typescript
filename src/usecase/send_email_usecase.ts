import { SendEmailRequest } from "../domain/entities/send_email";
import type { SendEmailGateway } from "../domain/gateway/send_email_gateway";

export class SendEmailUsecase {
	private readonly _sendEmailGateway: SendEmailGateway;

	constructor(sendEmailGateway: SendEmailGateway) {
		this._sendEmailGateway = sendEmailGateway;
	}

	async sendEmail(source: string, destination: string, generatedText: string): Promise<void> {
		const request = new SendEmailRequest(source, destination, generatedText);
		return this._sendEmailGateway.send_email(request);
	}
}
