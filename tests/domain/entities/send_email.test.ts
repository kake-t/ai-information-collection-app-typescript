import { describe, expect, test } from "@jest/globals";
import { SendEmailRequest } from "../../../src/domain/entities/send_email";

test("SendEmailRequest subject date is success", () => {
	// arrange
	const sendEmailRequest = new SendEmailRequest(
		"source@source.com",
		"distination@distinasion.com",
		"body content",
	);
	// act & assert
	expect(sendEmailRequest.subject).toBe("2025-02-23のAIニュースです。");
});
