import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { IType } from '../../interfaces';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  isLoading: boolean = false;
  types: IType[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  private getTypes() {
    this.isLoading = true;
    this.appService.getTypes().subscribe({
      next: res => this.types = res,
      complete: () => this.isLoading = false
    });
  }

}
