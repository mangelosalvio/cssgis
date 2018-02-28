import { Component, OnInit } from '@angular/core';
import { PathService } from '../path.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  information : Object = null;
  constructor(private pathService : PathService) {
    this.pathService.informationCast.subscribe( (information : Object)=> {
      this.information = information;
    });
  }

  ngOnInit() {
    
  }

}
