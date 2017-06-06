import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/Router';
import { Observable } from 'rxjs/Observable';
import { ChildrenService } from '../../services/children/children.service';

import { Child } from '../../models/child';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  public child : Child;

  constructor(private route: ActivatedRoute, private childrenService : ChildrenService) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => Observable.of(params))
    .subscribe(params => {
      const id : number = parseInt(params['childid']);
      if(id) {
        this.getChild(id);
      }
    });
  }

  getChild(id : number) {
     this.childrenService.getChild(id).subscribe(
      result => {
        this.child = result;
      }, 
      err => console.error("Error loading child sequences. " + err) 
    );
  }

  updatePreferences() {
    this.childrenService.updatePreferences(this.child)
      .subscribe(res => this.getChild(this.child.childId),
      err => console.log("Error setting preferences."))
  }
}
