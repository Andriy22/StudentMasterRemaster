import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '@shared/models/signalr/chatMessage.models';
import { ToolsService } from '@shared/services/tools.service';
import { API, JWT_TOKEN } from '@shared/config';
import { AuthService } from '@shared/services/auth.service';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {
  private _hubConnection: HubConnection;
  messages: ChatMessage[] = [];
  message = '/help';
  isLoading = false;
  constructor(private _tools: ToolsService, private _authService: AuthService) {}

  ngOnInit(): void {
    this.connect();
  }
  connect() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(API + '/api/hubs/console', {
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return window.localStorage.getItem(JWT_TOKEN);
        },
      })
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this.Send();
        this._tools.showNotification('Підключено до @console');
      })
      .catch(err => {
        this._tools.showNotification('Помилка під час підключення до @console');
        console.log('Error while starting connection: ' + err);
      });
    this._hubConnection.on('reciveCmd', (message: ChatMessage) => {
      this.messages.push(message);
      this.goDown();
    });
  }
  Send() {
    this._hubConnection.invoke('Execute', this.message).catch(e => this.Handler(e));
    this.message = '';
  }
  goDown() {
    const chatElement = document.querySelector('.chat');
    setTimeout(() => {
      chatElement.scrollTop = chatElement.scrollHeight;
    }, 0);
  }
  saveCommand(cmd: string) {
    this.message = cmd.split(' ')[0];
  }
  Handler(err) {
    const error = err.message.toString();

    if (error.indexOf('because user is unauthorized') !== -1) {
      this._hubConnection.stop();
      this._authService.refresh().subscribe(() => {
        this.connect();
      });
    }
  }
  Clear() {
    this.messages = [];
  }
  Help() {
    this._hubConnection.invoke('Execute', '/help').catch(e => this.Handler(e));
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
