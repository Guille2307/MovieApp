import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;
  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.initDB();
    this.cargarFavoritos();
  }

  async initDB() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Eliminado de Favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a Favoritos';
    }
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);
    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }
  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find((peli) => peli.id === id);
    return existe ? true : false;
  }
}
