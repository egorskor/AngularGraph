import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Архив метеослужбы';

  selectedGraph: string = 'precipitation';

  onSelect(graphName: string){
    this.selectedGraph = graphName;
  }
}
