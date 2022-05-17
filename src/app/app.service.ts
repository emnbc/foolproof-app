import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, retry, tap } from "rxjs";
import { IFile, IType, IUser } from "./interfaces";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _files!: IFile[];
    private _users!: IUser[];
    private _types!: IType[];

    constructor(private http: HttpClient) { }

    getFiles(): Observable<IFile[]> {
        return Array.isArray(this._files)
            ? of(this._files)
            : this.http.get<IFile[]>('/api/files').pipe(
                catchError(() => of([])),
                tap(res => this._files = res)
            );
    }
 
    getUsers(): Observable<IUser[]> {
        return Array.isArray(this._users)
            ? of(this._users)
            : this.http.get<IUser[]>('/api/users').pipe(
                retry({ count: 5, delay: 500 }),
                catchError(() => of([])),
                tap(res => this._users = res)
            );
    }

    getTypes(): Observable<IType[]> {
        return Array.isArray(this._types)
            ? of(this._types)
            : this.http.get<IType[]>('/api/types').pipe(
                catchError(() => of([])),
                tap(res => this._types = res)
            );
    }

}