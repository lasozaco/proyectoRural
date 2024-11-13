import { Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/intranet/login/login.component';
import { EventosComponent } from './components/intranet/eventos/eventos.component';
import { DashboardComponent } from './components/intranet/dashboard/dashboard.component';
import { ColegiosComponent } from './components/intranet/colegios/colegios.component';

export const routes: Routes = [
    {
        path:'', component: IndexComponent
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path:'events/:id', component: EventosComponent
    },
    {
        path:'colegios', component: ColegiosComponent
    },  
    {
        path:'dashboard', component: DashboardComponent
    } 
];
