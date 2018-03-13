import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  public signup = (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);

  public signin = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

  public logout = () => firebase.auth().signOut();
}
