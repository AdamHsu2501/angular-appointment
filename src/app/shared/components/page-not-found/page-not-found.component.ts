import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  title?: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.data, this.router.url);
    const data = this.route.snapshot.data;
    this.title = data.route;
  }
}
