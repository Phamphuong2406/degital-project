import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent implements OnInit {

  http = inject(HttpClient)
  userList: any[] = [];
  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject() {
    this.http.get("https://localhost:7132/api/ProjectManagement").subscribe((Res: any) => {
      this.userList = Res;
    })
  }
}

