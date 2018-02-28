import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PathService {

  private subject = new Subject<Object>();
  private information = new BehaviorSubject<Object>(null);
  private selectOnMap = new BehaviorSubject<Boolean>(false);
  private coordinate = new BehaviorSubject<any[]>(null);
  
  informationCast = this.information.asObservable();
  selectOnMapCast = this.selectOnMap.asObservable();
  coordinateCast = this.coordinate.asObservable();

  setPaths( paths : Object ) {
    this.subject.next(paths);
  }

  getPaths() : Observable<Object> {
    return this.subject.asObservable();
  }

  setInformation( information : Object ){
    this.information.next(information);
  }

  setSelectOnMap( selectOnMap : Boolean ) {
    this.selectOnMap.next(selectOnMap);
  }

  setCoordinate( coordinate : any[] ) {
    this.coordinate.next(coordinate);
  }



  constructor() { }
}
