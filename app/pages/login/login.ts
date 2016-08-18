import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {FirebaseService} from '../../lib/firebaseService'
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  error: any
  auth: any

  constructor(public FBService: FirebaseService,
    public viewCtrl: ViewController, public _nav: NavController) { }
  /** 
   * this will dismiss the modal page
   */
  dismiss() {
    this._nav.push(AboutPage);
    this.viewCtrl.data.cb()
  }

  /**
   * this create in the user using the form credentials. 
   *
   * we are preventing the default behavor of submitting 
   * the form
   * 
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  registerUser(_credentials, _event) {
    _event.preventDefault();

    this.FBService.createEmailUser(_credentials).subscribe(
      (data: any) => {
        console.log("the data", data.email)
        this.dismiss()
      },
      (error) => {
        alert("Error Logging In: " + error.message)
        console.log(error)
      });
  }

  /**
   * this logs in the user using the form credentials.
   * 
   * if the user is a new user, then we need to create the user AFTER
   * we have successfully logged in
   * 
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  login(credentials, _event) {
    _event.preventDefault();

    // if this was called from the register user,  the check if we 
    // need to create the user object or not
    let addUser = credentials.created
    credentials.created = null;

    // login usig the email/password auth provider
    this.FBService.login(credentials)
      .subscribe(
      (data: any) => {
        console.log("the data", data.email)

        this.dismiss()


      },
      (error) => {
        alert("Error Logging In: " + error.message)
        console.log(error)
      });
  }
}