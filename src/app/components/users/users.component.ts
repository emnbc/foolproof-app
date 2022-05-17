import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isLoading: boolean = false;
  users: IUser[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.isLoading = true;
    this.appService.getUsers().subscribe({
      next: res => this.users = res,
      complete: () => this.isLoading = false
    });
  }

}
