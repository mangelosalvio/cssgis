import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { } from '@types/googlemaps';
import { PathService } from '../path.service';
import { DataLayerManager } from '@agm/core/services/managers/data-layer-manager';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {

  title : string = 'Google Maps';
  lat: number = 10.7558816;
  lng: number = 123.0203076;
  zoom : number = 12;

  markers : { lat : number, lng : number }[] = [];

  /* paths : { lat : number, lng : number }[] = [
    {lat: 51.624458563486066, lng: 7.9156494140625},
    {lat: 51.79464975049103, lng: 8.0694580078125},
    {lat: 51.63809742760194, lng: 8.294677734375}
  ]; */

  arr_of_paths : any[] = [];

  geoJson : { type : String, features : any[] };

  hasMarker:boolean = false;
    
  constructor(private pathService : PathService) { 
    var e = this;
    this.pathService.getPaths().subscribe( paths => { 

      let geo_data = {
        "type" : "Feature",
        "geometry": {}
      }

      geo_data.geometry = paths;
      this.geoJson.features.push(geo_data);

      // to update changes
      this.geoJson = Object.assign({}, this.geoJson);
      
    })
  }

  ngOnInit() {
    this.geoJson = {
      "type": "FeatureCollection",
      "features" : []
    };
    
  }

  ngOnChanges(changes : SimpleChanges) {

  }

  

  onChoseLocation(event) {
  
    /* this.markers.push({
      lat : event.coords.lat,
      lng : event.coords.lng
    }); */

    // /console.log(this.markers);


  }

}
