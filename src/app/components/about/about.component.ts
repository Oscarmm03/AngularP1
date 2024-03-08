import { Component } from '@angular/core';
import { HeadService, HeaderData } from '../../sevices/head.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  
  private uiData:HeaderData = {
    title:'Nuestra História',
    subtitle:'BMW Motorroad',
    thumbnail:'https://www.eventosmotor.com/wp-content/uploads/2020/09/P90398260_highRes_the-new-bmw-m-1000-r-1-2048x1501.jpg'
  }
constructor(private headerService: HeadService){
  headerService.uiData.set(this.uiData)
}

}
