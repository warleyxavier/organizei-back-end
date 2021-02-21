export default class InconsistenciaRequisicao {
  public constructor(propriedade: string, inconsistencias: any) {
    this.propriedade = propriedade;
    this.messages = Object.keys(inconsistencias).map(propriedade => inconsistencias[propriedade]);
  };

  propriedade: string;
  messages: string[];
};