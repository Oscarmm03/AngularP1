import { Injectable, signal } from '@angular/core';
import { Post } from '../types/post.type';


//creamos un Pick, un pIck sirve para coger del typePost que hemos creado
//de manera anonima poder coger o heredar algunos de sus tipos para reusarlos
export type HeaderData = Pick<Post, 'title' | 'subtitle' | 'thumbnail'>

@Injectable({
  providedIn: 'root'
})

//creamos una señar es una funcion para poder ir cogiendo el titulo el subtitulo y la imagen
//uiData es simplemente una variable y signal es la funcion
//creamos la señal o funcion porque buscamos que cada pagina al cambiar cambie la imagen y foto
//creamos un objeto con los valores que necesitamos
export class HeadService {

  uiData = signal<HeaderData> ({title:'', subtitle:'', thumbnail:''})
  //<HeaderData> así tipamos una funcion usando el export de arriba
}
