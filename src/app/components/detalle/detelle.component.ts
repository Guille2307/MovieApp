import { MoviesService } from './../../services/movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  slideOptsActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5,
  };
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {
    this.dataLocal
      .existePelicula(this.id)
      .then((existe) => (this.estrella = existe ? 'star' : 'star-outline'));
    this.moviesService.getPeliculaDetalle(this.id).subscribe((resp) => {
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe((resp) => {
      this.actores = resp.cast;
    });
  }
  regresar() {
    this.modalCtrl.dismiss();
  }
  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = existe ? 'star' : 'star-outline';
  }
}
