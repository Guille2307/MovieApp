import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Genre,
  PeliculaDetalle,
  RespuestaCredits,
  RespuestaMDB,
} from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  generos: Genre[] = [];
  private popularesPages = 0;

  constructor(private http: HttpClient) {}

  getPopulares() {
    this.popularesPages++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPages}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  getFeatures() {
    const hoy = new Date();
    const twoDigitMonth =
      hoy.getMonth() + 1 >= 10
        ? hoy.getMonth() + 1
        : '0' + (hoy.getMonth() + 1);
    const twoDigitDate =
      hoy.getDate() >= 10 ? hoy.getDate() : '0' + hoy.getDate();

    const ultimoDia =
      hoy.getFullYear() + '-' + twoDigitMonth + '-' + twoDigitDate;

    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
    );
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }
  cargarGeneros(): Promise<Genre[]> {
    return new Promise((resolve) => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }
}
