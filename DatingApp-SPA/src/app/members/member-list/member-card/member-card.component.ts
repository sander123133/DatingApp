import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private auth : AuthService, private userService : UserService, private altertify : AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number){
    this.userService.sendLike(this.auth.decodedToken.nameid, id).subscribe(data => 
      this.altertify.succes('you have liked ' + this.user.knownAs),
      error => this.altertify.error(error)
    );
  }


}
