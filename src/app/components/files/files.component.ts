import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, filter, find, first, map } from 'rxjs';
import { AppService } from '../../app.service';
import { IFile, IMappedFilesByType, IType, IUser } from '../../interfaces';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  isLoading: boolean = false;
  isUsersLoading: boolean = false;
  filesByType: IMappedFilesByType[] = [];
  strSearch = new FormControl('');
  private _users: IUser[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadFiles();
    this.loadUsers();
  }

  getUserById(id: number) {
    return this._users.find(user => user.id === id)?.givenName || 'Not Found';
  }

  get filteredFiles(): IMappedFilesByType[] {
    const str = this.strSearch.value.toLowerCase();
    return this.filesByType.map(type => ({
      ...type,
      files: type.files.filter(file => file.title.toLowerCase().includes(str))
    }));
  }

  private loadFiles() {
    this.isLoading = true;
    const combined = combineLatest([
      this.appService.getTypes(),
      this.appService.getFiles()
      /**
       * I could add load users here, but they take a long time to load
       * and I decided to load them separately to show files more fast
       */
    ]);

    combined.pipe(map(this.mapFilesByType)).subscribe({
      next: res => this.filesByType = res,
      complete: () => this.isLoading = false
    });
  }

  private loadUsers() {
    this.isUsersLoading = true;
    this.appService.getUsers().subscribe({
      next: res => this._users = res,
      complete: () => this.isUsersLoading = false
    });
  }

  private mapFilesByType(res: [IType[], IFile[]]): IMappedFilesByType[] {
    const [types, files] = res;
    return types.map(t => ({...t, files: files.filter(f => f.type === t.id)}));
  }

}
