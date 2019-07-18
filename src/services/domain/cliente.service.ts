import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../storage.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClienteService {

    constructor (
        public http: HttpClient,
        public storage: StorageService) {

    }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }
}