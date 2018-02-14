import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookEditComponent implements OnInit {

  book = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
  }

  getBook(id) : void {
    this.http.get('/api/books/'+id).subscribe(data => {
      this.book = data;
    });
  }

  updateBook(id) :void {
    console.log(this.book);
    this.http.put('/api/books/'+id, this.book)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/books', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}