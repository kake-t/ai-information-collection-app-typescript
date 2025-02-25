import { TextGenerationRequest } from "../domain/entities/text_generation";
import type { TextGenerationResponse } from "../domain/entities/text_generation";
import type { TextGenerationGateway } from "../domain/gateway/text_generation_gateway";

export class TextGenerationUsecase {
	private readonly _textGenerationGateway: TextGenerationGateway;

	constructor(textGenerationGateway: TextGenerationGateway) {
		this._textGenerationGateway = textGenerationGateway;
	}

	async generate(
		prompt: string,
		maxTokens: number,
		temperature: number,
	): Promise<TextGenerationResponse> {
		const request = new TextGenerationRequest(prompt, maxTokens, temperature);
		return this._textGenerationGateway.generate_text(request);
	}
}
