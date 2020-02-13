import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currenUserId = +this.auth.decodedToken.nameid;
    this.userService
      .getMessageThread(this.auth.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead == false && messages[i].recipientId === currenUserId) {
              this.userService.markAsRead(currenUserId, messages[i].id);
            }

          }
        })
      )
      .subscribe(
        messages => {
          this.messages = messages;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.auth.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          // const sender: User = JSON.parse(localStorage.getItem('user'));
          // message.senderKnownAs = sender.knownAs;
          // message.senderPhotoUrl = sender.photoUrl;
          this.messages.unshift(message);
          this.newMessage.content = '';
        },
        error => this.alertify.error(error)
      );
  }
}
