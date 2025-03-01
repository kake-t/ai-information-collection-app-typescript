import { describe, expect, jest, test } from "@jest/globals";
import * as dotenv from "dotenv";
import { TextGenerationRequest } from "../../../src/domain/entities/text_generation";
import { PerplexityTextGenerationGateway } from "../../../src/infrastructure/gateway/perplexity_text_generation_gateway";
dotenv.config();

describe("PerplexityTextGenerationGateway", () => {
	test("generate text is success", async () => {
		// arrange
		const perplexityTextGenerationGateway = new PerplexityTextGenerationGateway();
		const textGenerationRequest = new TextGenerationRequest("AIニュースを生成してください");

		// act & assert
		const response = await perplexityTextGenerationGateway.generateText(textGenerationRequest);
		expect(typeof response.generated_text).toBe("string");
		expect(response.generated_text.length).toBeGreaterThan(0);
	});
});
