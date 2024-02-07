import { build } from "vite-express";
import "./style.css";
import { Chart } from "chart.js/auto";


function buildArr<T>(size: number, getItem: (i: number, xs: T[]) => T): T[] {
  const rtnArr: T[] = [];

  for(let i = 0; i < size; i++){
    rtnArr.push(getItem(i, rtnArr));
  }

  return rtnArr;
}

type Response = { member: [number], casual: [number] };



async function pieCasualMembers(){
  
  const { member, casual }: Response = JSON.parse(await (await fetch("/trip-count-year")).json());
  
  new Chart(document.getElementById("chart") as HTMLCanvasElement, {
    type: "pie",
    data: {
      labels: [ 'casual', 'member' ],
      datasets: [{
        label: 'casual vs members',
        data: [ casual[0], member[0],],
        backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(54, 162, 235)' ],
        hoverOffset: 4
      }]
    }
  })

}

async function tripCountHour(){
  
  const { member, casual }: Response = JSON.parse(await (await fetch("/trip-count-hour")).json());
  
  new Chart(document.getElementById("chart") as HTMLCanvasElement, {
    type: "line",
    data: {
      labels: buildArr(24, x => `${x}:00`),
      datasets: [
        {
          label: 'MEMBERS',
          data: member,
          fill: false,
          borderColor: 'lightcoral',
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        },      
        {
          label: 'CASUALS',
          data: casual,
          fill: false,
          borderColor: 'turquoise',
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        },
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "TRIPS STARTED DURING EACH HOUR OF THE DAY"
        }
      }
    }
  })

} 

async function tripCountWeekday(){
  
  const { member, casual }: Response = JSON.parse(await (await fetch("/trip-count-weekday")).json());
  member.push(member.shift()!)
  casual.push(casual.shift()!)

  
  new Chart(document.getElementById("chart") as HTMLCanvasElement, {
    type: "line",
    data: {
      labels: [
        "MON", "TUE", "WED", "THU", 
        "FRI", "SAT", "SUN"
      ],
      datasets: [
        {
          label: 'MEMBERS',
          data: member,
          fill: false,
          borderColor: 'lightcoral',
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        },      
        {
          label: 'CASUALS',
          data: casual,
          fill: false,
          borderColor: 'turquoise',
          cubicInterpolationMode: 'monotone',
          tension: 0.1
        },
      ]
    }
  })

} 