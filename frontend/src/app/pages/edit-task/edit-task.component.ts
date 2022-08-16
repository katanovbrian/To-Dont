import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  listId : string = "";
  taskId : string = "";
  constructor(private taskService: TaskService,private router: Router, private route: ActivatedRoute) 
  {
    this.route.params.subscribe((params : any) => {
      next : {
        this.listId = params.listId;
        this.taskId = params.taskId;
      }
    })
   }

  ngOnInit(): void {
  }

  editTask(value:string){
    this.taskService.editTask(this.listId,this.taskId,value).subscribe(()=>{
      this.router.navigate(['../../../'],{relativeTo:this.route})
    });
  }

}
