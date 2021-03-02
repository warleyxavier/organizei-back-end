import { createExpressServer } from "routing-controllers";
import { json } from "body-parser";

import { TratamentoExcecoesMiddleware } from "../../middlewares/TratamentosExcecoesMiddleware";

const app = createExpressServer({
	cors: {
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'X-Access-Token',
		],
		credentials: true,
		methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
	},
	defaultErrorHandler: false,
	controllers: [__dirname + "/../../modulos/**/controllers/*.{ts,js}"],
	middlewares: [TratamentoExcecoesMiddleware],
	defaults: {
		undefinedResultCode: 200
	}
});

app.use(json());

export default app;