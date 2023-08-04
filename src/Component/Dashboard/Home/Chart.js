
import React from 'react'
import { Line } from 'react-chartjs-2';


function Chart() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

  return (
      <div>
          <Line data={data} />
      </div>
  )
}

export default Chart
