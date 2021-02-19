import { createExpressServer } from "routing-controllers";
import { json } from "body-parser";

import { TratamentoExcecoesMiddleware } from "../../middlewares/TratamentosExcecoesMiddleware";

const app = createExpressServer({
	defaultErrorHandler: false,
	controllers: [__dirname + "/../../controllers/*.{ts,js}"],
	middlewares: [TratamentoExcecoesMiddleware],
	defaults: {
		undefinedResultCode: 200
	}
});

app.use(json());

export default app;