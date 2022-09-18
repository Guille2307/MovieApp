import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';

@NgModule({
  declarations: [ImagenPipe, SanitizerPipe, ParesPipe, FiltroImagenPipe],
  exports: [ImagenPipe, SanitizerPipe, ParesPipe, FiltroImagenPipe],
  imports: [CommonModule],
})
export class PipesModule {}
