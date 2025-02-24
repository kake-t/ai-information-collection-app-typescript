import type { SendEmailRequest } from "../entities/send_email";

export interface SendEmailGateway {
	send_email(request: SendEmailRequest): Promise<void>;
}
