import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';


import { Map, latLng, tileLayer, Layer, marker, Icon } from 'leaflet';

/* Para o ícone do marker carregar nos dispositivos moveis 
@see https://github.com/Leaflet/Leaflet/issues/4968
*/
function habilitarMarkerIcon() {
  delete Icon.Default.prototype._getIconUrl;

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}

habilitarMarkerIcon()

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: Map;

  constructor(private geolocation: Geolocation) { }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([28.644800, 77.216721], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© ionic LeafLet',
    }).addTo(this.map);

    marker([28.6, 77]).addTo(this.map)
      .bindPopup('Ionic 4 <br> Leaflet.')
      .openPopup();

    this.geolocation.getCurrentPosition().then((resp) => {
      let coords = [resp.coords.latitude, resp.coords.longitude]
      this.map.setView(coords);

      marker(coords).addTo(this.map)
        .bindPopup('Você está aqui')
        .openPopup();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
