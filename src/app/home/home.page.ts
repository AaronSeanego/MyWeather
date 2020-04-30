import { Component } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapboxService, Feature } from '../Services/mapbox.service';
import { AlertController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  info;
  city = "Pretoria"
  temp;
  min;
  max;
  search;
  windTemp;
  hourlyInfo;
  Feels_Like;
  Address
  coordinates;
  place_name;
  selectedAddress:string;
  PlaceName;
  bgImage;

  list;
  lon;
  lat;
  weatherIcon;
  constructor(public weatherService: WeatherService,
    public geolocation:Geolocation,
    public mapboxService: MapboxService,
    public alertController: AlertController) {

      this.searchByGeolocation();
      // this.weatherService.getData(this.city).subscribe((data) => {
      //   this.info = data;
      //   console.log(this.info);
  
      //   /* Below code is for coverting kelvin temperature to celsius*/
      //   this.Feels_Like = Math.round(this.info.main.feels_like - 273.25);
      //   this.temp = Math.round(this.info.main.temp - 273.25);
      //   this.min = Math.round(this.info.main.temp_min - 273.25);
      //   this.max = Math.round(this.info.main.temp_max - 273.25);
      // })
    }

    searchData() {
    }
  
    searchByGeolocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
        // console.log(resp);
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
  
        this.weatherService.getByCoordinates(this.lat,this.lon).subscribe((data) => {

          if(isNullOrUndefined(data)){
            this.presentAlert("We have data relating to the location you selected. Please make another selection");
          }else{
            this.info = data;
            // console.log(data);
    
            this.Feels_Like = Math.round(this.info.main.feels_like - 273.25);
            this.temp = Math.round(this.info.main.temp - 273.25);
            this.min = Math.round(this.info.main.temp_min - 273.25);
            this.max = Math.round(this.info.main.temp_max - 273.25);
  
            // console.log(this.info.weather[0].description)
  
            let Image = document.getElementsByClassName('screen') as HTMLCollectionOf<HTMLElement>;

            if((this.info.weather[0].description == 'clear sky') && (this.info.weather[0].icon = '01d')){
              // this.bgImage = '/assets/Clear sky/photo-of-sky-during-daytime-2677720.jpg';
              this.weatherIcon = '01d';
            }else if((this.info.weather[0].description == 'clear sky') && (this.info.weather[0].icon = '01n')){
              // this.bgImage = '/assets/Clear sky/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '01n';
            }else{}
  
            if((this.info.weather[0].description == 'few clouds') && (this.info.weather[0].icon == '02d')){
              // this.bgImage = '../../assets/Few clouds/white-cloud-3374334.jpg';
              this.weatherIcon = '02d';
            }else if((this.info.weather[0].description == 'few clouds') && (this.info.weather[0].icon == '02n')){
              // this.bgImage = '../../assets/Few clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '02n';
            }else{}
  
            if((this.info.weather[0].description == 'scattered clouds') && (this.info.weather[0].icon == '03d')){
              // this.bgImage = 'assets/Scattered Clouds/body-of-water-and-green-field-under-blue-sky-photo-1179225.jpg';
              this.weatherIcon = '03d';
            }else if((this.info.weather[0].description == 'scattered clouds') && (this.info.weather[0].icon == '03n')){
              // this.bgImage = 'assets/Scattered Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '03n';
            }else{}
  
            if((this.info.weather[0].description == 'overcast clouds') && (this.info.weather[0].icon == '04d')){
              // this.bgImage = '/assets/Overcast clouds/birds-flying-under-cloudy-sky-3906389.jpg';
              this.weatherIcon = '04d';
            }else if((this.info.weather[0].description == 'overcast clouds') && (this.info.weather[0].icon == '04n')){
              // this.bgImage = '/assets/Overcast clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '04n';
            }else{}
  
            if((this.info.weather[0].description == 'broken clouds') && (this.info.weather[0].icon == '04d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '04d';
            }else if((this.info.weather[0].description == 'broken clouds') && (this.info.weather[0].icon == '04n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '04n';
            }else{}
  
  
  
  
  
  
  
  
            /////////////////////////////////////////////
            //////////////////Thunderstorm//////////////
            ////////////////////////////////////////////

            if((this.info.weather[0].description == 'thunderstorm with light rain') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with light rain') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'thunderstorm with rain') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with rain') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}


            if((this.info.weather[0].description == 'thunderstorm with heavy rain') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with heavy rain') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}
  
            if((this.info.weather[0].description == 'light thunderstorm') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'light thunderstorm') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'thunderstorm') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'heavy thunderstorm') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'heavy thunderstorm') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'ragged thunderstorm') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'ragged thunderstorm') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'thunderstorm with light drizzle') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with light drizzle') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'thunderstorm with drizzle') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with drizzle') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}

            if((this.info.weather[0].description == 'thunderstorm with heavy drizzle') && (this.info.weather[0].icon == '11d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '11d';
            }else if((this.info.weather[0].description == 'thunderstorm with heavy drizzle') && (this.info.weather[0].icon == '11n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '11n';
            }else{}
  
  
  
  
  
  
  
            /////////////////////////////////
            ///////////Drizzle//////////////
            ////////////////////////////////
            if((this.info.weather[0].description == 'light intensity drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'light intensity drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'heavy intensity drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'heavy intensity drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'light intensity drizzle rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'light intensity drizzle rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'drizzle rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'drizzle rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'heavy intensity drizzle rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'heavy intensity drizzle rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'shower rain and drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'shower rain and drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'heavy shower rain and drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'heavy shower rain and drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}

            if((this.info.weather[0].description == 'shower drizzle') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'shower drizzle') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}
  
  
  
  
  
  
  
            //////////////////////////////////////////
            ///////////////Rain//////////////////////
            /////////////////////////////////////////
            if((this.info.weather[0].description == 'light rain') && (this.info.weather[0].icon == '10d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '10d';
            }else if((this.info.weather[0].description == 'light rain') && (this.info.weather[0].icon == '10n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '10n';
            }else{}
  
            if((this.info.weather[0].description == 'moderate rain') && (this.info.weather[0].icon == '10d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '10d';
            }else if((this.info.weather[0].description == 'moderate rain') && (this.info.weather[0].icon == '10n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '10n';
            }else{}
  
            if((this.info.weather[0].description == 'heavy intensity rain') && (this.info.weather[0].icon == '10d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '10d';
            }else if((this.info.weather[0].description == 'heavy intensity rain') && (this.info.weather[0].icon == '10n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '10n';
            }else{}
  
            if((this.info.weather[0].description == 'very heavy rain') && (this.info.weather[0].icon == '10d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '10d';
            }else if((this.info.weather[0].description == 'very heavy rain') && (this.info.weather[0].icon == '10n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '10n';
            }else{}
  
            if((this.info.weather[0].description == 'extreme rain') && (this.info.weather[0].icon == '10d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '10d';
            }else if((this.info.weather[0].description == 'extreme rain') && (this.info.weather[0].icon == '10n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '10n';
            }else{}
  
            if((this.info.weather[0].description == 'freezing rain') && (this.info.weather[0].icon == '13d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '13d';
            }else if((this.info.weather[0].description == 'freezing rain') && (this.info.weather[0].icon == '13n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '13n';
            }else{}
  
            if((this.info.weather[0].description == 'light intensity shower rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'light intensity shower rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}
  
            if((this.info.weather[0].description == 'shower rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'shower rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}
  
            if((this.info.weather[0].description == 'heavy intensity shower rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'heavy intensity shower rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}
  
            if((this.info.weather[0].description == 'ragged shower rain') && (this.info.weather[0].icon == '09d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '09d';
            }else if((this.info.weather[0].description == 'ragged intensity shower rain') && (this.info.weather[0].icon == '09n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '09n';
            }else{}
  
  
  
  
  

            //////////////////////////////////////////////////////////////////
            //////////////////////////////////Snow//////////////////////////

            if((this.info.weather[0].main == 'Snow') && (this.info.weather[0].icon == '13d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '13d';
            }else if((this.info.weather[0].main == 'Snow') && (this.info.weather[0].icon == '13n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '13n';
            }else{}
  





            //////////////////////////////////////////////
            ///////////////Atmosphere////////////////////
            /////////////////////////////////////////////
            if((this.info.weather[0].description == 'mist') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'mist') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'Smoke') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'Smoke') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'Haze') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'Haze') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'sand/ dust whirls') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'sand/ dust whirls') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'fog') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'fog') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'sand') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'sand') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'dust') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'dust') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'volcanic ash') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'volcanic ash') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}

            if((this.info.weather[0].description == 'tornado') && (this.info.weather[0].icon == '50d')){
              // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
              this.weatherIcon = '50d';
            }else if((this.info.weather[0].description == 'tornado') && (this.info.weather[0].icon == '50n')){
              // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
              this.weatherIcon = '50n';
            }else{}
          }
        });
  
       }).catch((error) => {
        //  console.log('Error getting location', error);
        this.presentAlertConfirm("Unable to get location. Please turn location on and press okay");
       })
    }

    Search_Places(event: any) {
      // let Styler = document.getElementsByClassName('search') as HTMLCollectionOf<HTMLElement>;
      // let List_Styler = document.getElementsByClassName('List') as HTMLCollectionOf<HTMLElement>;
      // let Items_Style = document.getElementsByClassName('Items') as HTMLCollectionOf<HTMLElement>;
      let inputStyle = document.getElementsByClassName('searchbar-input sc-ion-searchbar-md') as HTMLCollectionOf<HTMLElement>;

      const searchTerm = event.target.value.toLowerCase();
      if (searchTerm && searchTerm.length > 0) {
        this.mapboxService.search_place(searchTerm).subscribe((features: Feature[]) => {
          console.log(features);
          this.coordinates = features.map(feat => feat.geometry);
          this.Address = features.map((feat => feat.place_name));
          this.list = features;
        });

      } else {
        this.Address = [];
      }
    }
  
   onSelect(address, i) {
      this.selectedAddress = address;
      console.log(this.selectedAddress);
      console.log(this.selectedAddress.substring(0,this.selectedAddress.indexOf(",")));
      console.log(i);
  
      this.city = this.selectedAddress.substring(0,this.selectedAddress.indexOf(","));
  
      console.log(this.list);
      this.lon = JSON.stringify(this.list[i].geometry.coordinates[0])
      this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
  
      // this.weatherService.getByCoordinates(this.lon,this.lat).subscribe((data) => {
      //   this.info = data;
      //   console.log(data);
  
      //   this.Feels_Like = Math.round(this.info.main.feels_like - 273.25);
      //   this.temp = Math.round(this.info.main.temp - 273.25);
      //   this.min = Math.round(this.info.main.temp_min - 273.25);
      //   this.max = Math.round(this.info.main.temp_max - 273.25);
      // });
  
      this.weatherService.getData(this.city).subscribe((data) => {
        if(isNullOrUndefined(data)){
          this.presentAlert("We have no data relating to the location you have selected. Please make another selection");
        }else{
          this.info = data;
          console.log(this.info);
  
          this.Feels_Like = Math.round(this.info.main.feels_like - 273.25);
          this.temp = Math.round(this.info.main.temp - 273.25);
          this.min = Math.round(this.info.main.temp_min - 273.25);
          this.max = Math.round(this.info.main.temp_max - 273.25);

          if((this.info.weather[0].description == 'clear sky') && (this.info.weather[0].icon = '01d')){
            // this.bgImage = '/assets/Clear sky/photo-of-sky-during-daytime-2677720.jpg';
            this.weatherIcon = '01d';
          }else if((this.info.weather[0].description == 'clear sky') && (this.info.weather[0].icon = '01n')){
            // this.bgImage = '/assets/Clear sky/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '01n';
          }else{}
  
          if((this.info.weather[0].description == 'few clouds') && (this.info.weather[0].icon == '02d')){
            // this.bgImage = '../../assets/Few clouds/white-cloud-3374334.jpg';
            this.weatherIcon = '02d';
          }else if((this.info.weather[0].description == 'few clouds') && (this.info.weather[0].icon == '02n')){
            // this.bgImage = '../../assets/Few clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '02n';
          }else{}
  
          if((this.info.weather[0].description == 'scattered clouds') && (this.info.weather[0].icon == '03d')){
            // this.bgImage = 'assets/Scattered Clouds/body-of-water-and-green-field-under-blue-sky-photo-1179225.jpg';
            this.weatherIcon = '03d';
          }else if((this.info.weather[0].description == 'scattered clouds') && (this.info.weather[0].icon == '03n')){
            // this.bgImage = '/assets/Scattered Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '03n';
          }else{}
  
          if((this.info.weather[0].description == 'overcast clouds') && (this.info.weather[0].icon == '04d')){
            // this.bgImage = '/assets/Overcast clouds/birds-flying-under-cloudy-sky-3906389.jpg';
            this.weatherIcon = '04d';
          }else if((this.info.weather[0].description == 'overcast clouds') && (this.info.weather[0].icon == '04n')){
            // this.bgImage = '/assets/Overcast clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '04n';
          }else{}
  
          if((this.info.weather[0].description == 'broken clouds') && (this.info.weather[0].icon == '04d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '04d';
          }else if((this.info.weather[0].description == 'broken clouds') && (this.info.weather[0].icon == '04n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '04n';
          }else{}
  
  
  
  
  
  
          
  
          /////////////////////////////////////////////
          //////////////////Thunderstorm//////////////
          ////////////////////////////////////////////
          if((this.info.weather[0].description == 'thunderstorm with light rain') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with light rain') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'thunderstorm with rain') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with rain') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}


          if((this.info.weather[0].description == 'thunderstorm with heavy rain') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with heavy rain') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'light thunderstorm') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'light thunderstorm') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'thunderstorm') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'heavy thunderstorm') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'heavy thunderstorm') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'ragged thunderstorm') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'ragged thunderstorm') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'thunderstorm with light drizzle') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with light drizzle') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'thunderstorm with drizzle') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with drizzle') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}

          if((this.info.weather[0].description == 'thunderstorm with heavy drizzle') && (this.info.weather[0].icon == '11d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '11d';
          }else if((this.info.weather[0].description == 'thunderstorm with heavy drizzle') && (this.info.weather[0].icon == '11n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '11n';
          }else{}
  
  
  
  
  
  
  
          /////////////////////////////////
          ///////////Drizzle//////////////
          ////////////////////////////////
          if((this.info.weather[0].description == 'light intensity drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'light intensity drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'heavy intensity drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'heavy intensity drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'light intensity drizzle rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'light intensity drizzle rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'drizzle rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'drizzle rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'heavy intensity drizzle rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'heavy intensity drizzle rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'shower rain and drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'shower rain and drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'heavy shower rain and drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'heavy shower rain and drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}

          if((this.info.weather[0].description == 'shower drizzle') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'shower drizzle') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}
  
  
  
  
  
  
  
          //////////////////////////////////////////
          ///////////////Rain//////////////////////
          /////////////////////////////////////////
          if((this.info.weather[0].description == 'light rain') && (this.info.weather[0].icon == '10d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '10d';
          }else if((this.info.weather[0].description == 'light rain') && (this.info.weather[0].icon == '10n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '10n';
          }else{}
  
          if((this.info.weather[0].description == 'moderate rain') && (this.info.weather[0].icon == '10d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '10d';
          }else if((this.info.weather[0].description == 'moderate rain') && (this.info.weather[0].icon == '10n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '10n';
          }else{}
  
          if((this.info.weather[0].description == 'heavy intensity rain') && (this.info.weather[0].icon == '10d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '10d';
          }else if((this.info.weather[0].description == 'heavy intensity rain') && (this.info.weather[0].icon == '10n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '10n';
          }else{}
  
          if((this.info.weather[0].description == 'very heavy rain') && (this.info.weather[0].icon == '10d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '10d';
          }else if((this.info.weather[0].description == 'very heavy rain') && (this.info.weather[0].icon == '10n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '10n';
          }else{}
  
          if((this.info.weather[0].description == 'extreme rain') && (this.info.weather[0].icon == '10d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '10d';
          }else if((this.info.weather[0].description == 'extreme rain') && (this.info.weather[0].icon == '10n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '10n';
          }else{}
  
          if((this.info.weather[0].description == 'freezing rain') && (this.info.weather[0].icon == '13d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '13d';
          }else if((this.info.weather[0].description == 'freezing rain') && (this.info.weather[0].icon == '13n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '13n';
          }else{}
  
          if((this.info.weather[0].description == 'light intensity shower rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'light intensity shower rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}
  
          if((this.info.weather[0].description == 'shower rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'shower rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}
  
          if((this.info.weather[0].description == 'heavy intensity shower rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'heavy intensity shower rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}
  
          if((this.info.weather[0].description == 'ragged shower rain') && (this.info.weather[0].icon == '09d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '09d';
          }else if((this.info.weather[0].description == 'ragged intensity shower rain') && (this.info.weather[0].icon == '09n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '09n';
          }else{}
  
  
  
  
  
          //////////////////////////////////////////////
          ///////////////Snow////////////////////
          /////////////////////////////////////////////
          if((this.info.weather[0].main == 'Snow') && (this.info.weather[0].icon == '13d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '13d';
          }else if((this.info.weather[0].main == 'Snow') && (this.info.weather[0].icon == '13n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '13n';
          }else{}
  
           //////////////////////////////////////////////
          ///////////////Atmosphere////////////////////
          /////////////////////////////////////////////
          if((this.info.weather[0].description == 'mist') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'mist') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'Smoke') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'Smoke') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'Haze') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'Haze') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'sand/ dust whirls') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'sand/ dust whirls') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'fog') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'fog') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'sand') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'sand') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'dust') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'dust') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'volcanic ash') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'volcanic ash') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'squalls') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}

          if((this.info.weather[0].description == 'tornado') && (this.info.weather[0].icon == '50d')){
            // this.bgImage = 'src/assets/Broken Clouds/white-cumulus-clouds-2097628.jpg';
            this.weatherIcon = '50d';
          }else if((this.info.weather[0].description == 'tornado') && (this.info.weather[0].icon == '50n')){
            // this.bgImage = 'src/assets/Broken Clouds/nature-sky-night-milky-way-127577.jpg';
            this.weatherIcon = '50n';
          }else{}
        }
      });
  
      // console.log("lng:" + JSON.stringify(this.list[i].geometry));
  
      console.log("index =" + i)
      this.Address = [];
   }
  
    ClearData() {
      this.search = "";
    }

    async presentAlert(info) {
      const alert = await this.alertController.create({
        header: 'Error',
        // subHeader: 'Subtitle',
        message: info,
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async presentAlertConfirm(message) {
      const alert = await this.alertController.create({
        header: 'Alert!',
        message: message,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.searchByGeolocation();
            }
          }
        ]
      });
  
      await alert.present();
    }
  

}
