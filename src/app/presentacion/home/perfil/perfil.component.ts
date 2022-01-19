import {Component, OnInit} from '@angular/core'
import {EsqueletoService} from '../../../dominio/entidades/esqueleto.service'


@Component({
  selector: 'ns-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public rutas:string

  constructor(private _esqueleto:EsqueletoService) {
      console.log("[PerfilComponent] constructor")
      this.rutas=""
  }

  ngOnInit(): void {
      console.log("[PerfilComponent] f ngOnInit")
      this._esqueleto.rescatarEntidadesDesdeApi().subscribe(resp=>{
          console.log("[PerfilComponent] resp mantenedor")
          console.log("[PerfilComponent] resp:"+JSON.stringify(resp))
      })
      /*this._mantenedor.obtenerEntidades().subscribe(resp=>{
          console.log("[PerfilComponent] resp de mantenedor")
          console.log("[PerfilComponent]"+resp)
      })*/

  }

}
