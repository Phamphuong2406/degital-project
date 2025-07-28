import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactinformation',
  standalone: false,
  templateUrl: './contactinformation.component.html',
  styleUrl: './contactinformation.component.scss'
})
export class ContactinformationComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

  }


}
