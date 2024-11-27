import {Component, OnInit} from '@angular/core';
import Institutions from '../../../Models/Institutions';
import {ColegiosService} from "../../../services/public/colegios.service";

@Component({
    selector: 'app-colegios',
    standalone: true,
    imports: [],
    templateUrl: './colegios.component.html',
    styleUrl: './colegios.component.css'
})
export class ColegiosComponent implements OnInit {
    params: string = ''
    colegios: Institutions[] = []

    constructor(private colegiosService: ColegiosService) {
    }

    ngOnInit(): void {
        this.getColegios();
    }

    getColegios() {
        this.colegiosService.getColegios(this.params).subscribe({
            next: (res) => {
                this.colegios = res.data
                console.log(res.data)
            },
            error: (res) => {
                console.error(res.error)
            }
        })
    }
}
