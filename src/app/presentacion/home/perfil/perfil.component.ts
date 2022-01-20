import {Component, OnInit} from '@angular/core'
import {EsqueletoService} from '../../../dominio/entidades/esqueleto.service'


@Component({
  selector: 'ns-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public flagMantenedor:string
    public infoMantenedor:string

  constructor(private _esqueleto:EsqueletoService) {
      console.log("[PerfilComponent] constructor")
      this.flagMantenedor=""
      this.infoMantenedor=""
  }

  ngOnInit(): void {
      console.log("[PerfilComponent] f ngOnInit")
      if(this._esqueleto.mantenedorExiste()){
          let resp=this._esqueleto.mantenedorMuyViejo()
          this.infoMantenedor="Mantenedor "+resp
      }else{
          this.infoMantenedor="Rescatando mantenedor"
          this._esqueleto.rescatarEntidadesDesdeApi().subscribe(resp=>{
              console.log("[PerfilComponent] resp mantenedor")
              console.log("[PerfilComponent] resp:"+JSON.stringify(resp))
              this.infoMantenedor="Mantenedor responde:"+JSON.stringify(resp)
          })
      }
      this.flagMantenedor="Rescatando flag forzado de mantenedor"
      this._esqueleto.forzarEsqueletoDesdeApi().subscribe(resp=>{
          if(resp==true){
              console.log("[PerfilComponent] forzado de actualizar mantenedor")
              this.flagMantenedor="forzado de actualizar mantenedor"
          } else {
              console.log("[PerfilComponent] no se debe actualizar mantenedor")
              this.flagMantenedor="no se debe actualizar mantenedor"
          }
      })
  }

}
