import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PathService {

  private subject = new Subject<Object>();
  private information = new BehaviorSubject<Object>(null);
  
  informationCast = this.information.asObservable();

  setPaths( paths : Object ) {
    this.subject.next(paths);
  }

  getPaths() : Observable<Object> {
    return this.subject.asObservable();
  }

  setInformation( information : Object ){
    this.information.next(information);
  }

  getInformation() : Observable<Object> {
    return this.information.asObservable();
  }

  constructor() { }
}
