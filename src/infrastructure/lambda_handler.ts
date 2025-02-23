import type { Context } from "aws-lambda";

interface EventHandler {
	prompt: string;
}

interface EventHandlerResponse {
	statusCode: number;
	body: string;
}

export const handler = async (event: EventHandler, context: Context): Promise<EventHandlerResponse> => {
	// TODO implement
	const response: EventHandlerResponse = {
		statusCode: 200,
		body: JSON.stringify("Hello from Lambda!"),
	};
	return response;
};
