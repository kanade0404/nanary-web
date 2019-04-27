import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../core/services/question.service';
import { Question } from '../../models/question';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  questionList: Question[] = [];
  constructor(
    private globalService: GlobalService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questionService.findAll().subscribe(questions => this.questionList);
  }
}
