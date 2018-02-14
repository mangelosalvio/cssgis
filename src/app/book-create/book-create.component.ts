import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {

  book = {}

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveBook() : void {
    this.http.post('/api/books', this.book)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/books', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
