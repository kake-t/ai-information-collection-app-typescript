import type { SendEmailRequest } from "../entities/send_email";

export interface SendEmailGateway {
	sendEmail(request: SendEmailRequest): Promise<void>;
}
