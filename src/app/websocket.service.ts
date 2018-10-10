import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  private sock: WebSocket = null;
  private onMessages:{ (message: MessageEvent): void; }[] = [];
  constructor() { }

  public connect(url: string, binder: any, onMessage: (message: MessageEvent) => void): void {
    this.onMessages.push(onMessage.bind(binder));
    if (this.sock === null) {
      this.create(url);
    } 
  }

  public async sendMessage(message: string, retry: number = 0): Promise<void> {
    if(retry === 5) {
      console.error(`Failed tp send message: ${message}`);
      return;
    }
    setTimeout(() => {
      if (this.sock.readyState === WebSocket.OPEN) {
        this.sock.send(message);
      }
      else {
        this.sendMessage(message, ++retry);
      }
    }, 2000);
  }

  public close(): void {
    this.sock.close();
    this.sock = null;
  }

  private create(url: string): void {
    this.sock = new WebSocket(url);
    this.sock.onmessage = (message: MessageEvent) => {
      this.onMessages.forEach(onMessage => onMessage(message));
    };
  }

}