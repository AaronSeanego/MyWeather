import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  // geometry: Geometry[];
  query: [];
  ID;
}

export interface Feature {
  place_name: string;
  geometry: string;

}

export interface Geometry {
  coordinates: string;
}

@Injectable({
  providedIn: 'root'
})

export class MapboxService {
  @ViewChild('map', {static: false}) mapNativeElementnativElement: ElementRef;
  map;

  constructor(public http: HttpClient) { }

  search_place(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=place&access_token=pk.eyJ1IjoiYWFyb25zZWFuZWdvIiwiYSI6ImNrNWh1YWF5aDA0b3gzbW83eG9mNzRseTMifQ.Yx4qe_DpeUhl5dWaFPxEMg')
    .pipe(map((res: MapboxOutput) => {
      return res.features;
    }));
  }
}
