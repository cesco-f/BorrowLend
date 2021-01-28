import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-borrow-page-users',
  templateUrl: './borrow-page-users.component.html',
  styleUrls: ['./borrow-page-users.component.scss'],
})
export class BorrowPageUsersComponent implements OnInit {
  usersLending: User[];
  itemId: number;
  itemTitle: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private itemService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemId = +this.route.snapshot.paramMap.get('itemId');
    this.userService.getUsersLending(this.itemId).subscribe((users) => {
      this.usersLending = users;
    });
    this.itemService.getItemById(this.itemId).subscribe((item) => {
      this.itemTitle = item.title;
    });
  }
}
