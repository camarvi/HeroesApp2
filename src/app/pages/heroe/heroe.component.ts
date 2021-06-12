import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

//IMPORTAR SWEETALERT2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  //Se puede poner tambien de la siguiente forma
  //heroe : HeroeModel = new HeroeModel();

  constructor(private heroesService : HeroesService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    //Captura el Id del heroe si viene como parametro en la url
    const id= this.route.snapshot.paramMap.get('id');
    
    if (id !=='nuevo'){  //Voy a modificar un heroe
      
        this.heroesService.getHeroe(id)
            .subscribe( (resp : HeroeModel) => {
              this.heroe = resp;
              this.heroe.id = id;
              console.log(this.heroe);
            });
    }


  }

  guardar(form : NgForm){

    if (form.invalid){
      console.log("Formulario no valido");
      return;
    }

    //console.log(form);
    //console.log(this.heroe);

    Swal.fire({
      allowOutsideClick : false,
      title : 'Espere',
      text: 'Guardando información..',
      icon : 'info'
    });
    Swal.showLoading();

    let peticion : Observable<any>;
    
    if (this.heroe.id) {
      //ACTUALIZAR REGISTRO
     peticion= this.heroesService.actualizarHeroe(this.heroe);
     // .subscribe(resp => {
     //    console.log(resp);
     // });
 

    } else {
      //NUEVO REGISTRO
      peticion = this.heroesService.crearHeroe(this.heroe);
     // .subscribe(resp =>{
     //   console.log(resp);
     //    this.heroe = resp; //Esta instruccion esta de mas, ya lo hace angular
     // });

    }

    peticion.subscribe( resp => {
      
        Swal.fire({
          title : this.heroe.nombre,
          text : 'Se actualizo correctamente..',
          icon : 'success'
        });

    });

    


  }


}
