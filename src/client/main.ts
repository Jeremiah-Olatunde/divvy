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

