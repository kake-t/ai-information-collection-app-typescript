import * as dotenv from "dotenv";
dotenv.config();

import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../domain/entities/text_generation";
import { sesClient } from "../infrastructure/aws_client";
import { config } from "../infrastructure/config";
import { PerplexityTextGenerationGateway } from "../infrastructure/gateway/perplexity_text_generation_gateway";
import { SesSendEmailGateway } from "../infrastructure/gateway/ses_send_email_gateway";
import { SendEmailUsecase } from "../usecase/send_email_usecase";
import { TextGenerationUsecase } from "../usecase/text_generation_usecase";

interface LambdaEvent {
	prompt?: string;
	max_tokens?: number;
	temperature?: number;
}

interface LambdaResponse {
	statusCode: number;
	body: {
		error?: string;
		generated_text?: string;
		token_count?: number;
	};
}

export const handler = async (event: LambdaEvent, _context: unknown): Promise<LambdaResponse> => {
	try {
		const prompt = event.prompt;
		const max_tokens = event.max_tokens ?? DEFAULT_MAX_TOKENS;
		const temperature = event.temperature ?? DEFAULT_TEMPERATURE;

		if (!prompt) {
			return {
				statusCode: 400,
				body: { error: "Prompt is required" },
			};
		}

		const email_source = config.email.source;
		const email_destination = config.email.destination;

		const text_generation_gateway = new PerplexityTextGenerationGateway();
		const usecase = new TextGenerationUsecase(text_generation_gateway);
		// テキスト生成の実行
		const text_generation_result = await usecase.generate(prompt, max_tokens, temperature);
		const generated_text = text_generation_result.generated_text;

		const email_gateway = new SesSendEmailGateway(sesClient(config.aws.region));
		const send_email_usecase = new SendEmailUsecase(email_gateway);
		// email送信
		await send_email_usecase.sendEmail(email_source, email_destination, generated_text);

		return {
			statusCode: 200,
			body: {
				generated_text,
				token_count: text_generation_result.token_count,
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: { error: error instanceof Error ? error.message : String(error) },
		};
	}
};
