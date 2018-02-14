import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PathService {

  private subject = new Subject<Object>();

  setPaths( paths : Object ) {
    this.subject.next(paths);
  }

  getPaths() : Observable<Object> {
    return this.subject.asObservable();
  }

  constructor() { }
}
