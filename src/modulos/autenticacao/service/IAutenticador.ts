import AccessToken from "../dto/AccessToken";

export default interface IAutenticador {
  autenticar(email: string, senha: string): Promise<AccessToken>;
}