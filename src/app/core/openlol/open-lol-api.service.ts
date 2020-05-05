import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {machineIdSync} from 'node-machine-id';

@Injectable({
  providedIn: 'root'
})
export class OpenLolApiService {
  /// hola hola websockets
  webSocketEndPoint: string = 'http://localhost:8080/login';
  topic: string = "/topic/greetings";
  stompClient: any;
  private requestKey = null;

  constructor(private http: HttpClient) {
  }

  initRequestKey(): Promise<boolean> {
    if (this.requestKey !== null) {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      });
    }
    return new Promise<boolean>((resolve, reject) => {
      this._connect();
      /*
            this.http.get("http://localhost:8080/crypto/publickey?userId=1").subscribe((resUser) => {
                console.log(resUser);
                console.log("RSA public key[base64]: " + resUser['rsaPublicKey']);

                let transaction = {amount: '50', creditcard: {number: "objetoTrifasico"}};

                //generate AES key
                var secretPhrase = CryptoJS.lib.WordArray.random(16);
                var salt = CryptoJS.lib.WordArray.random(128 / 8);
                //aes key 128 bits (16 bytes) long
                var aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
                  keySize: 128 / 32
                });
                //initialization vector - 1st 16 chars of userId
                var iv = CryptoJS.enc.Utf8.parse("1234567890123456"); // replace "1234567890123456" with pcid
                var aesOptions = {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv};
                var aesEncTrans = CryptoJS.AES.encrypt(JSON.stringify(transaction), aesKey, aesOptions);

                console.log(`Transaction: ${JSON.stringify(transaction)}`);
                console.log('AES encrypted transaction [Base64]: ' + aesEncTrans.toString());
                console.log('AES key [hex]: ' + aesEncTrans.key);
                console.log('AES init vector [hex]: ' + aesEncTrans.iv);

                //encrypt AES key with RSA public key
                var rsaEncrypt = new JsEncryptModule.JSEncrypt();
                rsaEncrypt.setPublicKey(resUser['rsaPublicKey']);
                var rsaEncryptedAesKey = rsaEncrypt.encrypt(aesEncTrans.key.toString());
                console.log('RSA encrypted AES key [base64]: ' + rsaEncryptedAesKey);

                var encryptedTransaction = {userId: "1", payload: aesEncTrans.toString(), encAesKey: rsaEncryptedAesKey};

                this.authorizedCall(encryptedTransaction);
                //console.log("OK", e);

                setTimeout(() => { //TODO: REMOVE

                  resolve(true);
                }, 5000);
              },
              (e) => {
                console.log("err", e);
                reject();
              });*/
    });
  }

  authorizedCall(encryptedTransaction) {

    /*this.http.post("http://localhost:8080/crypto/transaction", encryptedTransaction).subscribe((apicallres) => {
      console.log("api cal resssss", apicallres);
    }, (e)=> {

      console.log("api cal ERRRR", e);
    });*/
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    const uuid = machineIdSync();
    _this.stompClient.connect({'uuid': uuid}, (frame) => {
      _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
  }
}
