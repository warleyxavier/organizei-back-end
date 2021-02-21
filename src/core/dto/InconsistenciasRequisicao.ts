import { ValidationError } from "class-validator";

import InconsistenciaRequisicao from "./InconsistenciaRequisicao";

export default class InconsistenciasRequisicao {
  public constructor(inconsistencias: ValidationError[]) {
    this.code = "400";
    this.message = inconsistencias.map(error => {
      return new InconsistenciaRequisicao(error.property, error.constraints);
    });
  }

  code: string;
  message: InconsistenciaRequisicao[];
}