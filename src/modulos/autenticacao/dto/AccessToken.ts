export default class AccessToken {
  public constructor(accessToken: string, nomeUsuario: string, emailUsuario: string) {
    this.accessToken = accessToken;
    this.usuario = {nome: nomeUsuario, email: emailUsuario};
  }

  accessToken: string;
  usuario: {
    nome: string;
    email: string;
  }
}