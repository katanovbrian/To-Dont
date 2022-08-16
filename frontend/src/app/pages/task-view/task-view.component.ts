import { Component, OnInit } from '@angular/core';
import Task from "src/app/models/task";
import List from "src/app/models/list";
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  listId: string ="";
  constructor(private taskService: TaskService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists : any) => {
        next : {
          this.lists = lists;
        }
      })

    this.route.params.subscribe((params : any) => {
      next : {
        this.listId = params.listId;
        if (!this.listId) return;
        this.taskService.getTasks(this.listId)
          .subscribe((tasks : any) => {
            next : {
              this.tasks = tasks;
            }
          })
      }
    })

  }

  onTaskClick(task: Task) {
    this.taskService.setCompleted(this.listId,task).subscribe(() => {
      next : {
        task.completed = !task.completed;
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(this.listId,task._id).subscribe((task:any) => {
        next : {
          this.tasks = this.tasks.filter(t => t._id != task._id);
        }
      })
  }

  deleteList(list:List) {
    console.log(list);
    this.taskService.deleteList(list._id).subscribe(() => {
      next : {
        this.lists = this.lists.filter(l => l._id != list._id);
        this.tasks = this.tasks.filter(t => t._listId  != list._id);
      }
    })
  }

  addTaskClick() {
    if (!this.listId) {
      alert("Please select a list to add this task to");
      return;
    }
    this.router.navigate(['./new-task'],{relativeTo:this.route});
  }

  editTask(task:Task){
    this.router.navigate(['./tasks',task._id,'edit-task'],{relativeTo:this.route})
  }
}
