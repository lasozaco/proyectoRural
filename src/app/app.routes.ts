import { Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/intranet/login/login.component';

export const routes: Routes = [
    {
        path:'', component: IndexComponent
    },
    {
        path:'login', component: LoginComponent
    }
];
