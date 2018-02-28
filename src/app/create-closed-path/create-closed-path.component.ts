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
  path : { lat : any, lng : any } = { lat : null, lng : null };
  property : { key : String, value: String } = { key : null, value : null };
  paths : any[] = [];
  selectOnMap : Boolean = false;


  constructor(private pathService : PathService, public snackBar : MatSnackBar) { 
    pathService.coordinateCast.subscribe( (coordinate : any) => {
      if ( this.selectOnMap == true ) {
        this.path.lng = coordinate[0];
        this.path.lat = coordinate[1];
      }
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes : SimpleChanges) {
    console.log(changes);

  }

  addPath() : void {
  
    if ( this.geometry == null || this.path.lat == null || this.path.lng == null ) {
      this.snackBar.open('Please supply all details','Dismiss', { duration : 9000 });
    }

    if ( this.geometry == "Point" ) {
      this.paths.push([
        this.path.lng,
        this.path.lat
      ]);

      
      
      

    
      /* this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : [this.path.lng, this.path.lat]
      });

      this.enableGeometry(); */

    } else if ( this.geometry == "LineString" ) {
      this.paths.push([
        this.path.lng,
        this.path.lat
      ]);

      


    } else if ( this.geometry == "Polygon" ) {
      this.paths.push([
        this.path.lng,
        this.path.lat
      ]);

      

      

    }
    
    this.path.lat = null;
    this.path.lng = null;

  }

  savePath() : void {

    console.log(this.paths);

    if ( this.geometry == "Point" ) {
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : this.paths[0],
        "property" : this.property
      });

    
    } else if ( this.geometry == "Polygon" ) {
      this.paths.push(this.paths[0]);
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : [ this.paths ],
        "property" : this.property
      });
    } else {
      this.pathService.setPaths({
        "type" : this.geometry,
        "coordinates" : this.paths,
        "property" : this.property
      });
    }

    this.reset();

  }

  reset() : void {
    this.paths = [];
  }

  deletePath(path : [Number]) : void {

    const index = this.paths.indexOf(path);
    console.log(index);
    if (index > -1) {
      this.paths.splice(index, 1);
    }

  }

  addButtonEnabled() : Boolean {
    if ( this.geometry == "Point" && this.paths.length != 0 ) {
      return false; 
    }

    return true;
  }

  saveButtonVisibility() : Boolean {
    if ( this.geometry == "Point" && this.paths.length == 1 ) {
      return true;
    } else if ( this.geometry == "LineString" && this.paths.length >= 2 ) {
      return true;
    } else if ( this.geometry == "Polygon" && this.paths.length >= 3 ) {
      return true
    }

    return false;
  }

  geometryIsDisabled() : Boolean {
    //return false;
    if ( this.paths.length > 0 ) {
      return true;
    }

    return false;
  }


}
