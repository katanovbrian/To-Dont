import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  addList(value:string){
    this.taskService.createList(value).subscribe((list:any)=>{
      next:{
        this.router.navigate(['/lists',list._id])
      }
    })
  }
}
