import { Component } from '@angular/core';

import { Experience } from './app.experience';
import { Contact } from './app.contact';

@Component({
    selector: 'my-app',
    templateUrl: 'app/mainsection.html',
    directives: [Experience, Contact]
})

export class AppComponent {
    title = 'GingFung Matthew Yeung';
    slogan = 'K.I.S.S';
    sub = '(Keep It Simple Stupid)';
}
