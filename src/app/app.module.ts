import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/mobile/tabs/tabs';
import { LoginPage } from '../pages/common/login/login';
import { SchedulesPage } from '../pages/mobile/schedules/schedules';
import { UsersPage } from '../pages/mobile/users/users';
import { TicketsPage } from '../pages/mobile/tickets/tickets';
import { FinancesPage } from '../pages/mobile/finances/finances';
import { QuotesPage } from '../pages/mobile/quotes/quotes';
import { TicketDetailPage } from '../pages/mobile/ticket-detail/ticket-detail';
import { TicketPopupPage, } from '../pages/mobile/ticket-popup/ticket-popup';
import { AddTicketPage } from '../pages/mobile/add-ticket/add-ticket';
import { AddingServiceTicketPage } from '../pages/mobile/adding-service-ticket/adding-service-ticket';
import { CredentialsAddTicketPage } from '../pages/mobile/credentials-add-ticket/credentials-add-ticket';
import { QuotesDetailPage } from '../pages/mobile/quotes-detail/quotes-detail';

import { ServicesProvider } from '../providers/services/services';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import {PriorityPopupPage} from "../pages/mobile/priority-popup/priority-popup";
import {RecurringPopupPage} from "../pages/mobile/recurring-popup/recurring-popup";
import { ThemeableBrowser} from '@ionic-native/themeable-browser';
import {AddressBookPage} from "../pages/mobile/address-book/address-book";
import {AddLocationPage} from "../pages/mobile/add-location/add-location";
import {AddAddressPage} from "../pages/mobile/add-address/add-address";
import {CancelTicketPopupPage} from "../pages/mobile/cancel-ticket-popup/cancel-ticket-popup";
import {SettingsPage} from "../pages/mobile/settings/settings";
import {RemoveLocationPopupPage} from "../pages/mobile/remove-location-popup/remove-location-popup";
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverviewDesktopPage} from "../pages/desktop/overview-desktop/overview-desktop";
import {TicketsDesktopPage} from "../pages/desktop/tickets-desktop/tickets-desktop";
import {AddTicketDesktopPage} from "../pages/desktop/add-ticket-desktop/add-ticket-desktop";
import {FinancesDesktopPage} from "../pages/desktop/finances-desktop/finances-desktop";
import {Constants} from "../providers/constants";
import {AddCustomerPage} from "../pages/mobile/add-customer/add-customer";
import {AddTechPage} from "../pages/mobile/add-tech/add-tech";
import {AddQuotesPage} from "../pages/mobile/add-quotes/add-quotes";
import {AddServiceRatePage} from "../pages/mobile/add-service-rate/add-service-rate";
import {AddQuotePopupPage} from "../pages/mobile/add-quote-popup/add-quote-popup";
import {AddNewCustomerPage} from "../pages/mobile/add-new-customer/add-new-customer";
import {AcceptQuotePopupPage} from "../pages/mobile/accept-quote-popup/accept-quote-popup";
import {DeclineQuotePopupPage} from "../pages/mobile/decline-quote-popup/decline-quote-popup";
import {ProfilePage} from "../pages/mobile/profile/profile";
import {AccountDetailsPage} from "../pages/mobile/account-details/account-details";
import {TypicalAvailabilityPage} from "../pages/mobile/typical-availability/typical-availability";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TicketsPage,
    TabsPage,
    TicketDetailPage,
    TicketPopupPage,
    AddTicketPage,
    AddingServiceTicketPage,
    CredentialsAddTicketPage,
    UsersPage,
    QuotesPage,
    QuotesDetailPage,
    SchedulesPage,
    FinancesPage,
    PriorityPopupPage,
    RecurringPopupPage,
    AddressBookPage,
    AddLocationPage,
    AddAddressPage,
    CancelTicketPopupPage,
    SettingsPage,
    RemoveLocationPopupPage,
    OverviewDesktopPage,
    TicketsDesktopPage,
    AddTicketDesktopPage,
    FinancesDesktopPage,
    AddCustomerPage,
    AddTechPage,
    AddQuotesPage,
    AddServiceRatePage,
    AddQuotePopupPage,
    AddNewCustomerPage,
    AcceptQuotePopupPage,
    DeclineQuotePopupPage,
    ProfilePage,
    AccountDetailsPage,
    TypicalAvailabilityPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TicketsPage,
    TabsPage,
    TicketDetailPage,
    TicketPopupPage,
    AddTicketPage,
    AddingServiceTicketPage,
    CredentialsAddTicketPage,
    UsersPage,
    QuotesPage,
    QuotesDetailPage,
    SchedulesPage,
    FinancesPage,
    PriorityPopupPage,
    RecurringPopupPage,
    AddressBookPage,
    AddLocationPage,
    AddAddressPage,
    CancelTicketPopupPage,
    SettingsPage,
    RemoveLocationPopupPage,
    OverviewDesktopPage,
    TicketsDesktopPage,
    AddTicketDesktopPage,
    FinancesDesktopPage,
    AddCustomerPage,
    AddTechPage,
    AddQuotesPage,
    AddServiceRatePage,
    AddQuotePopupPage,
    AddNewCustomerPage,
    AcceptQuotePopupPage,
    DeclineQuotePopupPage,
    ProfilePage,
    AccountDetailsPage,
    TypicalAvailabilityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    Constants,
    AuthenticationProvider,
    HttpModule,
    HttpClientModule,
    ThemeableBrowser,
  ]
})
export class AppModule {}
