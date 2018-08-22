export class StoreProvider {

  saveToken(token: string):void{
    localStorage.setItem('TOKEN',token);
  }

  getToken(): string | null{
    return localStorage.getItem('TOKEN');
  }

  clearToken():void{
    localStorage.removeItem('TOKEN');
  }
}
