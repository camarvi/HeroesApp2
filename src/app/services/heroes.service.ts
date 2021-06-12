import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

//Importar map
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroes-crud-a4358.firebaseio.com';

  constructor(private http : HttpClient) { }

  crearHeroe( heroe : HeroeModel){

    return this.http.post(`${ this.url }/heroes.json`, heroe)
      .pipe(
        map( (resp :any) => {
          heroe.id = resp.name; //Paso el id de firebase al heroe.id
          return heroe; //devuelvo el heroe con el id de firebase
        })
      );
  }


  actualizarHeroe(heroe : HeroeModel){

    // Creo una variable con los datos del heroe, rompemos la referencia a heroe, esto
    // es una copia nueva con los mimos valores de heroe, pero no estan relacionados
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id; // Elimino la propiedad id del objeto


    return this.http.put(`${ this.url }/heroes/${ heroe.id}.json`, heroeTemp);
  }

  borrarHeroe( id :string){

    return this.http.delete(`${ this.url}/heroes/${ id }.json`);
  }


 getHeroe( id:string ){

  return this.http.get(`${ this.url }/heroes/${ id }.json`);

 }  


  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map(resp=>this.crearArreglo(resp))
        
      );
  }

  private crearArreglo( heroesObj : object){

      const heroes : HeroeModel[] = [];
      //console.log(heroesObj);

      if (heroesObj === null) {return [];}

      Object.keys(heroesObj).forEach(key =>{
          const heroe : HeroeModel = heroesObj[key];
          heroe.id = key;

          heroes.push(heroe); // Añadir el heroe al arreglo

      });

      return heroes;

  }


}
