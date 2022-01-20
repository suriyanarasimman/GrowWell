import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  baseUrl: String = environment.baseUrl;
  private stocksJsonUrl: any = [
    { "ticker": "ADN", "name": "ADN Industries", "price": 740 },
    { "ticker": "CIP", "name": "Cipla", "price": 955 },
    { "ticker": "HCT", "name": "HCLTECH", "price": 945 },
    { "ticker": "ICT", "name": "I&C Technologies", "price": 215 },
    { "ticker": "LCP", "name": "Lex Corp", "price": 450 },
    { "ticker": "MSF", "name": "Microsoft", "price": 278 },
    { "ticker": "NST", "name": "NESTLEIND", "price": 500 },
    { "ticker": "QPY", "name": "Q-Pay", "price": 768 },
    { "ticker": "SIS", "name": "Stark Industries", "price": 370 },
    { "ticker": "SVN", "name": "SVRN", "price": 430 },
    { "ticker": "TMS", "name": "TRQ Motors", "price": 320 },
    { "ticker": "TKS", "name": "TK Steel", "price": 990 },
    { "ticker": "WIS", "name": "Wayne Industries", "price": 800 }
  ];
  addressUrl:String="https://www.universal-tutorial.com/api/"
  mf_api_url="https://api.mfapi.in/mf/";

  constructor(private http: HttpClient) { }

  forgotPassword(mail:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + "sh/m/mail", mail);
  }

  changePassword(requiredDetals:Object):Observable<any>{
    return this.http.post<any>(this.baseUrl + "sh/m/checkmail", requiredDetals);
  }

  getFunds(code:Number):Observable<any> {
    return this.http.get<any>(this.mf_api_url+code);
  }

  registerUser(userDetail: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', userDetail);
  }


  getToken(header:any): Observable<any> {
    return this.http.get<any>(this.addressUrl + 'getaccesstoken',header);
  }

  getCountries(header:any): Observable<any> {
    return this.http.get<any>(this.addressUrl + 'countries',header);
  }

  getStates(country:string,header:any): Observable<any> {
    return this.http.get<any>(this.addressUrl + 'states/'+country,header);
  }


  authenticateUser(userDetail: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'authenticate', userDetail);
  }

  buyProduct(productInfo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'products/buy', productInfo);
  }

  sellProduct(productInfo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'products/sell', productInfo);
  }

  productsOwnedByUser(username: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'products/' + username);
  }

  registerMutualFund(mutualFundInfo: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + 'mutual-fund/register',
      mutualFundInfo
    );
  }

  mutualFundsOwnedByUser(username: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'mutual-fund/' + username);
  }

  registerIpo(ipoInfo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'ipo/register', ipoInfo);
  }

  ipoOwnedByUser(username: String): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'ipo/' + username);
  }

  registerMessage(messageInfo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'messages/register', messageInfo);
  }

  fetchAllMessages(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'messages');
  }


  fetchOpenIPoInformation():Observable<any>{
    return this.http.get<any>(this.baseUrl + 'ipo/open');
  }

  fetchFinancialProductList(): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'products/catalog');
  }

  searchstockhistory(name:String): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'sh/' + name);
  }

  fetchstockdetails(name:String,date:String): Observable<any>{
    return this.http.get<any>(this.baseUrl + "sh/" + name +"/" + date);
  }

  fetchStockInformation(): Observable<any[]> {
    return this.http.get<any>(this.stocksJsonUrl);
  }

  fetchStockHistory(userName: String): Observable<any[]>{
    return this.http.get<any>(this.baseUrl + "products/history/" + userName);
  }

}
