export interface ITabItem {
    name: string;
    path: string;
}

export interface IFile {
    createdBy: number;
    creationDateTime: string;
    fileId: string;
    id: string;
    live: boolean;
    modifiedBy: number;
    modifiedDateTime: string;
    popularity: number;
    scheduled: boolean;
    status: string;
    title: string;
    type: string;
    uri: string;
    version: number;
}

export interface IUser {
    id: number;
    givenName: string;
    familyName: string;
}

export interface IType {
    colourId: string;
    creationDateTime: string;
    description: string;
    documentsCount: number;
    id: string;
    name: string;
}

export interface IMappedFilesByType extends IType {
    files: IFile[];
}