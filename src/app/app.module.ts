import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MotoristaService } from '../app/service/motorista.service';
import { PassageiroService} from '../app/service/passageiro.service';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PassageiroComponent } from './passageiro/passageiro.component';
import { CorridaComponent } from './corrida/corrida.component';
import { CorridaService } from './service/corrida.service';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    PassageiroComponent,
    CorridaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    MotoristaService,
    PassageiroService,
    CorridaService,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
