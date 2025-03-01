import type { TextGenerationRequest } from "../../domain/entities/text_generation";
import type { TextGenerationResponse } from "../../domain/entities/text_generation";
import type { TextGenerationGateway } from "../../domain/gateway/text_generation_gateway";

type PerplexityModel = "sonar";
type PerplexityObject = "chat.completion";
type PerplexityRole = "assistant" | "user" | "system";
type PerplexityFinishReason = "stop" | "length" | "content_filter";

interface PerplexityResponse {
	id: string;
	model: PerplexityModel;
	object: PerplexityObject;
	created: number;
	citations: string[];
	choices: {
		index: number;
		finish_reason: PerplexityFinishReason;
		message: {
			role: PerplexityRole;
			content: string;
		};
		delta: {
			role: PerplexityRole;
			content: string;
		};
	}[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}

interface PerplexityError {
	detail: {
		loc: string[];
		msg: string;
		type: string;
	}[];
}

/**
 * 生成された文章が存在しないエラー
 * @extends Error
 */

class GeneratedTextIsNoneErrorError extends Error {
	constructor() {
		super("Perplexity API error: Generated text is None");
	}
}

/**
 * トークン使用量の情報が存在しないエラー
 * @extends Error
 */
class UsageInformationIsNoneError extends Error {
	constructor() {
		super("Perplexity API error: Usage information is None");
	}
}

/**
 * Perplexity APIエラー
 * @extends Error
 */
class PerplexityAPIError extends Error {
	constructor(statusCode: number, errorResponse: PerplexityError | null = null) {
		let message = `Perplexity API error: Response is failed. status code=${statusCode}`;
		if (errorResponse) {
			message += `, response=${JSON.stringify(errorResponse)}`;
		}
		super(message);
		this.name = "PerplexityAPIError";
	}
}

export class PerplexityTextGenerationGateway implements TextGenerationGateway {
	private static readonly BASE_URL = "https://api.perplexity.ai/chat/completions";
	private static readonly MODEL = "sonar";

	async generateText(request: TextGenerationRequest): Promise<TextGenerationResponse> {
		const response = await fetch(PerplexityTextGenerationGateway.BASE_URL, {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
			},
			body: JSON.stringify({
				model: PerplexityTextGenerationGateway.MODEL,
				messages: [
					{
						role: "system",
						content: "あなたはAIニュースのキャスターです。",
					},
					{
						role: "user",
						content: request.prompt,
					},
				],
				max_tokens: request.max_tokens,
				temperature: request.temperature,
			}),
		});
		if (!response.ok) {
			if (response.status === 422) {
				throw new PerplexityAPIError(response.status, (await response.json()) as PerplexityError);
			}
			throw new PerplexityAPIError(response.status);
		}
		const data = (await response.json()) as PerplexityResponse;

		if (data.choices[0].message.content === "") {
			throw new GeneratedTextIsNoneErrorError();
		}

		if (data.usage === undefined) {
			throw new UsageInformationIsNoneError();
		}

		const textGenerationResponse: TextGenerationResponse = {
			generated_text: data.choices[0].message.content,
			token_count: data.usage.total_tokens,
		};
		return textGenerationResponse;
	}
}
