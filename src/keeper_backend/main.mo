import Debug "mo:base/Debug";
import List "mo:base/List";

actor Keeper {
  type Note = {
    title : Text;
    content : Text;
  };
  stable var notes: List.List<Note> = List.nil<Note>();
  public func createNote(titleText : Text, contentText: Text){
    let newNote:Note = {
      title= titleText;
      content= contentText;
    };
    notes:=List.push(newNote,notes);
    Debug.print(debug_show(notes));
  };
  public func deleteNote(id: Nat){
    let front = List.take(notes,id);
    let back = List.drop(notes,id+1);
    notes := List.append(front,back);
  };


  public query func showNotes():async [Note]{
    return List.toArray(notes);
  }
};
