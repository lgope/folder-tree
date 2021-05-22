export interface IFolder {
  folder: {
    _id: String;
    name: String;
    ancestor: String;
    child: Object[];
    designation: String;
  };
}

export interface IParentFolder {
  parentFolder: {
    _id: String;
    name: String;
    ancestor: String;
    child: Object[];
    designation: String;
  };
}
