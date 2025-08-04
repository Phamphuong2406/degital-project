import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
constructor(private projectService: ProjectService ) {}

ngOnInit(): void {

  }
}
