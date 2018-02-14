import { Component, OnInit, OnChanges } from '@angular/core';
import { PathService } from '../path.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-create-closed-path',
  templateUrl: './create-closed-path.component.html',
  styleUrls: ['./create-closed-path.component.css']
})
export class CreateClosedPathComponent implements OnInit, OnChanges {

  geometry : String = null;
  geometryIsDisabled : Boolean = false;
  path : { lat : number, lng : number } = { lat : null, lng : null };
  paths : any[] = [];
  saveButtonVisibility : Boolean = false;

  constructor(private pathService : PathService, public snackBar : MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges(changes : SimpleChanges) {
    console.log(changes);

  }

  addPath() : void {
  
    if ( this.geometry == null || this.path.lat == null || this.path.lng == null ) {
      console.log('here');
      this.snackBar.open('Please supply all details','Dismiss', { duration : 9000 });
    }

    if ( this.geometry == "Point" ) {
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : [this.path.lng, this.path.lat]
      });
      this.enableGeometry();

    } else if ( this.geometry == "LineString" ) {
      this.paths.push([
        this.path.lng,
        this.path.lat
      ]);

      if ( this.paths.length >= 2 ) {
        this.saveButtonVisibility = true;
      }

      this.disableGeometry();
    } else if ( this.geometry == "Polygon" ) {
      this.paths.push([
        this.path.lng,
        this.path.lat
      ]);

      this.disableGeometry();

      if ( this.paths.length >= 3 ) {
        this.saveButtonVisibility = true;
      }

    }
    
    this.path.lat = null;
    this.path.lng = null;

  }

  savePath() : void {

    console.log(this.paths);

    if ( this.geometry == "Polygon" ) {
      this.paths.push(this.paths[0]);
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : [ this.paths ]
      });
    } else {
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : this.paths
      });
    }

    this.saveButtonVisibility = false;

    this.enableGeometry();
    this.paths = [];
  }

  enableGeometry() : void {
    this.geometryIsDisabled = false;
  }

  disableGeometry() : void {
    this.geometryIsDisabled = true;
  }

  deletePath(path : [Number]) : void {
    const index = this.paths.indexOf(path);
    console.log(index);
    if (index > -1) {
      this.paths.splice(index, 1);
    }
  }

}
