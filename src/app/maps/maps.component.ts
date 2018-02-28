import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { } from '@types/googlemaps';
import { PathService } from '../path.service';
import { AgmDataLayer, DataLayerManager } from '@agm/core';
import { DataOptions } from '@agm/core/services/google-maps-types';

import { GeoJson } from './../geo-json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{

  @ViewChild(AgmDataLayer) agmDataLayer;
  title : string = 'Google Maps';
  lng: number = 123.0203076;
  lat: number = 10.755713;
  zoom : number = 12;

  markers : { lat : number, lng : number }[] = [];

  /* paths : { lat : number, lng : number }[] = [
    {lat: 51.624458563486066, lng: 7.9156494140625},
    {lat: 51.79464975049103, lng: 8.0694580078125},
    {lat: 51.63809742760194, lng: 8.294677734375}
  ]; */

  arr_of_paths : any[] = [];

  geoJson : GeoJson;

  /* geoJson : GeoJson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "letter": "G",
          "color": "blue",
          "rank": "7",
          "ascii": "71"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
            ]
          ]
        }
      }
    ]
  }; */

  hasMarker:boolean = false;
    
  constructor(private pathService : PathService, private router : Router) { 
    var e = this;
    this.pathService.getPaths().subscribe( ( paths : { type : String, coordinates : [any], property : Object } ) => { 

      let geo_data = {
        "type" : "Feature",
        "geometry": {},
        "properties" : {
          "property" :  paths.property
        }
      }

      geo_data.geometry = {
        type : paths.type,
        coordinates : paths.coordinates
      };

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

  
  onChoseLocation(event) {
  
    this.markers.push({
      lat : event.coords.lat,
      lng : event.coords.lng
    });

    console.log(this.markers);


  }

  clicked(event) {

    let information = event.feature.getProperty('property');
    this.router.navigate(['maps','information']);
    this.pathService.setInformation(information);

  
    /* let color = event.feature.getProperty('color');
    if ( color == "yellow" ) {
      event.feature.setProperty('color', "gray");
    } else {
      event.feature.setProperty('color', "yellow");
    } */
  }

  styleFunc(feature){
     return ({
      clickable: true,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }



}
