import {Component, OnInit} from '@angular/core'
import {EsqueletoService} from '../../../dominio/entidades/esqueleto.service'
import {entidad} from "../../../dominio/interfaces/esqueleto/esqueleto";


@Component({
  selector: 'ns-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    public flagMantenedor:string
    public infoMantenedor:string
    public estadoMantenedor:string

  constructor(private _esqueleto:EsqueletoService) {
      console.log("[PerfilComponent] constructor")
      this.flagMantenedor=""
      this.infoMantenedor=""
      this.estadoMantenedor=""
  }

  ngOnInit(): void {
      console.log("[PerfilComponent] f ngOnInit")
      console.log("[PerfilComponent] existe mantenedor")
      if(this._esqueleto.mantenedorExiste()){
          console.log("[PerfilComponent] mantenedor muy viejo")
          let resp=this._esqueleto.mantenedorMuyViejo()
          this.estadoMantenedor="Mantenedor "+resp
          this.flagMantenedor="Rescatando flag forzado de mantenedor"
          this._esqueleto.forzarEsqueletoDesdeApi().subscribe(resp=>{
              if(resp==true){
                  console.log("[PerfilComponent] forzado de actualizar mantenedor")
                  this.flagMantenedor="flag forzado de actualizar mantenedor true"
              } else {
                  console.log("[PerfilComponent] no se debe actualizar mantenedor")
                  this.flagMantenedor="no se debe actualizar mantenedor"
              }
          })
      }else{
          console.log("[PerfilComponent] NO exise mantenedor")
          this.infoMantenedor="Rescatando mantenedor"
          this.estadoMantenedor="Mantenedor nuevo"
          this.flagMantenedor=""
          console.log("[PerfilComponent] a rescatar mantenedor")
          this._esqueleto.rescatarEntidadesDesdeApi().subscribe((resp)=>{
              console.log("[PerfilComponent] resp mantenedor")
              console.log("[PerfilComponent] resp:",resp)
              this.infoMantenedor="Mantenedor responde:"+JSON.stringify(resp)
              if(resp.estado=="ok"){
                  this.flagMantenedor="fecha mantenedor: "+ new Date()
              }else{
                  this.flagMantenedor="no se ha podido guardar nuevo mantenedor"
              }
          })
      }

  }

}
