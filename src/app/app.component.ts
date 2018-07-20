import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { ONE_SIGNAL_APP_ID, SENDER_ID } from '../config';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild('nav') nav: Nav;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(!this.nav.getActive()) {
        this.rootPage = TabsPage
      }

      if(platform.is('cordova')) {
        oneSignal.startInit(ONE_SIGNAL_APP_ID, SENDER_ID)
        oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.Notification)
        oneSignal.handleNotificationReceived().subscribe(data => {
          this.onPushReceived(data.payload)
        })
        oneSignal.handleNotificationOpened().subscribe(data => {
          this.onPushOpened(data.notification.payload)
        })
        oneSignal.endInit()
      }
    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
    alert(payload.body)

    // Open Facebook tab
    this.nav.setRoot(TabsPage, {
      tabIndex: 1
    })
  }

  private onPushOpened(payload: OSNotificationPayload) {
    // Open Facebook tab
    this.nav.setRoot(TabsPage, {
      tabIndex: 1
    })
  }
}
