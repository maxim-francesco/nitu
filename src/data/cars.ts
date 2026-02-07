import suvImg from "@/assets/car-suv.jpg";
import sedanImg from "@/assets/car-sedan.jpg";
import sportImg from "@/assets/car-sport.jpg";

export interface CarData {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  year: number;
  km: string;
  fuel: string;
  power: string;
  engine: string;
  transmission: string;
  image: string;
  category: string;
  features: string[];
}

export const cars: CarData[] = [
  {
    id: 1, name: "BMW X5 xDrive30d", price: "32.900 €", priceNum: 32900, year: 2020,
    km: "85.000 km", fuel: "Diesel", power: "265 CP", engine: "3.0L 6 cilindri", transmission: "Automată",
    image: suvImg, category: "SUV",
    features: ["Navigație", "Cameră 360°", "Trapa panoramică", "Scaune încălzite", "Pilot automat", "LED Matrix", "Jante 20\"", "Piele integrală"],
  },
  {
    id: 2, name: "Mercedes-Benz E220d", price: "28.500 €", priceNum: 28500, year: 2019,
    km: "112.000 km", fuel: "Diesel", power: "194 CP", engine: "2.0L 4 cilindri", transmission: "Automată 9G-Tronic",
    image: sedanImg, category: "Sedan",
    features: ["COMAND Online", "Distronic Plus", "Ambient lighting", "Scaune ventilate", "Burmester", "Keyless Go", "Piele Nappa"],
  },
  {
    id: 3, name: "Audi RS5 Sportback", price: "45.900 €", priceNum: 45900, year: 2021,
    km: "42.000 km", fuel: "Benzină", power: "450 CP", engine: "2.9L V6 BiTurbo", transmission: "Automată S-Tronic",
    image: sportImg, category: "Sport",
    features: ["Virtual Cockpit", "Bang & Olufsen", "Quattro Sport", "Evacuare sport", "Suspensie adaptivă", "Matrix LED", "Carbon interior"],
  },
  {
    id: 4, name: "Volkswagen Tiguan R-Line", price: "24.900 €", priceNum: 24900, year: 2020,
    km: "95.000 km", fuel: "Diesel", power: "150 CP", engine: "2.0L TDI", transmission: "Automată DSG",
    image: suvImg, category: "SUV",
    features: ["Discover Pro", "Park Assist", "LED", "Scaune sport", "Keyless", "ACC", "Vienna Leather"],
  },
  {
    id: 5, name: "BMW 520d M-Paket", price: "26.500 €", priceNum: 26500, year: 2018,
    km: "130.000 km", fuel: "Diesel", power: "190 CP", engine: "2.0L 4 cilindri", transmission: "Automată Steptronic",
    image: sedanImg, category: "Sedan",
    features: ["M Sport Package", "Head-Up Display", "Harman Kardon", "Piele Dakota", "LED Adaptive", "Pilot automat", "Jante M 19\""],
  },
  {
    id: 6, name: "Porsche Cayman GTS", price: "58.900 €", priceNum: 58900, year: 2019,
    km: "38.000 km", fuel: "Benzină", power: "365 CP", engine: "2.5L Boxer Turbo", transmission: "Manuală 6 trepte",
    image: sportImg, category: "Sport",
    features: ["Sport Chrono", "PASM", "BOSE Surround", "Alcantara", "Sport Exhaust", "20\" Carrera S", "Sport Design Package"],
  },
];

export const categories = ["Toate", "SUV", "Sedan", "Sport"];
