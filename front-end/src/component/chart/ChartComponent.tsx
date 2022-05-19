
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { useEffect, useRef } from 'react';
import { Bar, Chart, Doughnut } from 'react-chartjs-2';


/**
 * @Project     : HelpDesk
 * @FileName    : SortButtonComponent.tsx
 * @Date        : 2022-05-16
 * @author      : 김지인
 * @description : 차트 컴포넌트
 */


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export function DoughnutChart({count, labels}) {


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels : labels,
  datasets: [
    {
      label: labels,
      data: count,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  return <Doughnut data={data} />;
}



export function LeftBarChart({count, labels}) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  
  const options = {
    plugins : {
      legend : {
          display : false
      }
    },
    indexAxis: 'y' as const,
    responsive: true,
  };
  
  
  const data = {
    labels : labels,
    datasets: [
      {
        data: count,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ],
  };
  return <Bar options={options} data={data} />;
}

export function BarChart({count, labels}) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  
  const options = {
    plugins : {
      legend : {
          display : false
      }
    },
    responsive: true,
  };
  
  
  const data = {
    labels : labels,
    datasets: [
      {
        data: count,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'white',
        borderWidth: 2,
      }
    ],
  };
  return <Bar options={options} data={data} />;
}
