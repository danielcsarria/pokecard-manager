import { EventEmitter, Injectable, NgZone} from '@angular/core';
import { User } from "../models/user.model";
import  firebase  from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User;
  
  authMessage = new EventEmitter<string>();
  userInfo = new BehaviorSubject<any>(null);
  recentlyViewed$ = new BehaviorSubject<any>(null);
  
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'))
      }
    })
  } // end constructor

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard'])
        });
        this.setUserData(result.user);
        this.userInfo.next(this.getUserData())
      })
      .catch((error) => { 
        this.authMessage.emit(error.message)
      })
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      window.alert('Sent password reset link')
    })
    .catch((error) => {
      console.log(error)
      this.authMessage.emit(error.message)
    })
  }

  register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.sendEmailVerification()
        window.alert('Email verification sent, please check your email')
        this.router.navigate(['verify-email'])
      })
      .catch((error) => {
        this.authMessage.emit(error.message)
      })
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false
  }

  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard'])
        })
        this.setUserData(result.user)
        this.userInfo.next(result.user)
      })
      .catch((error) => {
        this.authMessage.emit(error.message)
      })
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider())
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    
    this.setUserMeta(user.uid)
    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    
    this.userInfo.next(userData)
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('collection');
      localStorage.removeItem('recentlyViewed');
      localStorage.removeItem('cardView');
      localStorage.removeItem('uid');
      localStorage.removeItem('collectionID');
      this.router.navigate(['login']);
    })
  }

  setUserMeta(uid: string) {
    const userMeta = this.afs.collection('userInfo', ref => ref.where('uid', '==', uid))
    userMeta.snapshotChanges().subscribe(action => {
      let collectionID: string;
      console.log('action =>', action)
      if(action.length > 0) {
        action.map(a => {
          const data = a.payload.doc.data();
          collectionID = a.payload.doc.id
          let recentlyViewed;
          for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, value);
            if(key == 'recentlyViewed') {
              recentlyViewed = value;
            }
          }
          this.recentlyViewed$.next(recentlyViewed);  
        })
        localStorage.setItem('collectionID', collectionID)
      } else {
        console.log("there is no action data!!")
        this.afs.collection('userInfo').add({
          cardView: 'grid_on',
          collection: '[]',
          recentlyViewed: '[]',
          uid: uid
        }).then(docRef => {
          localStorage.setItem('collectionID', docRef.id)
        })
      }
      
    }) 
  }

  getUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  
}
