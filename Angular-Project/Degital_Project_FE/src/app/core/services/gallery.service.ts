import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class projectService {

    constructor(private http: HttpClient) { }
    
}