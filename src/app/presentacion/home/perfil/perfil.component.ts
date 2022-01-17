import {Component, OnInit} from '@angular/core'


@Component({
  selector: 'ns-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public rutas:string

  constructor() {
      console.log("[PerfilComponent] constructor")
      this.rutas=""
  }

  ngOnInit(): void {
      console.log("[PerfilComponent] f ngOnInit")
  }

}
