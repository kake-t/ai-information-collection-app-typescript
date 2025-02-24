import { describe, expect, jest, test } from "@jest/globals";
import { SendEmailRequest } from "../../../src/domain/entities/send_email";

// 日付のモック
jest.useFakeTimers();
const mockDate = new Date("2022/08/30");
jest.setSystemTime(mockDate);

describe("SendEmailRequest", () => {
	test("subject date is success", () => {
		// arrange
		const sendEmailRequest = new SendEmailRequest(
			"source@source.com",
			"distination@distinasion.com",
			"body content",
		);
		// act & assert
		expect(sendEmailRequest.subject).toBe("2022-08-30のAIニュースです。");
	});
});
