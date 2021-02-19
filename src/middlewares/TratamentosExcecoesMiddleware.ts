import { Middleware, ExpressErrorMiddlewareInterface, } from "routing-controllers";

import { EBaseException } from "../core/exception/BaseException";
import FalhaRequisicao from "../core/dto/FalhaRequisicao";

@Middleware({ type: "after" })
export class TratamentoExcecoesMiddleware implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err?: any) => any): void {
		const CODIGO_ERRO_INTERNO = "500";

		if (error instanceof EBaseException)
			return response.status(error.Codigo).send(new FalhaRequisicao(error.Codigo, error.message));

		return response.status(CODIGO_ERRO_INTERNO).send(new FalhaRequisicao(CODIGO_ERRO_INTERNO, error.message));
	}
}