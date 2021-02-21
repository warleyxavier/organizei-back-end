import { Middleware, ExpressErrorMiddlewareInterface, HttpError, } from "routing-controllers";

import { EBaseException } from "../core/exception/BaseException";
import FalhaRequisicao from "../core/dto/FalhaRequisicao";
import InconsistenciasRequisicao from "../core/dto/InconsistenciasRequisicao";

@Middleware({ type: "after" })
export class TratamentoExcecoesMiddleware implements ExpressErrorMiddlewareInterface {
	error(error: any, request: any, response: any, next: (err?: any) => any): void {
		const CODIGO_ERRO_INTERNO = "500";

		if (error instanceof EBaseException)
			return response.status(error.Codigo).send(new FalhaRequisicao(error.Codigo, error.message));

		if (error.message == "Invalid body, check 'errors' property for more info.")
			return response.status(400).send(new InconsistenciasRequisicao(error.errors));

		return response.status(CODIGO_ERRO_INTERNO).send(new FalhaRequisicao(CODIGO_ERRO_INTERNO, error.message));
	}
}