export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export class TokenService {
  persistToken(tokenType: TokenType, token: string): void {
    localStorage.setItem(tokenType, token);
  }

  getToken(tokenType: TokenType): string {
    return localStorage.getItem(tokenType) as string;
  }

  hasToken(tokenType: TokenType): boolean {
    return !!localStorage.getItem(tokenType);
  }

  isLoggedIn(){
    return this.hasToken(TokenType.ACCESS_TOKEN) || this.hasToken(TokenType.REFRESH_TOKEN)
  }
}