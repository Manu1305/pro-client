import React from 'react';
import styles from './Home.module.css';
import { FaRupeeSign, FaMoneyBillWave } from 'react-icons/fa';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import { BsFillCartCheckFill } from 'react-icons/bs';

import { PieChart, Pie, Cell } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 20 },
    { name: 'March', value: 10 },
    { name: 'April', value: 40 },
];
const lineChartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 300 },
    { name: 'May', value: 400 },
    { name: 'Jun', value: 200 },
];

const boxData = [
    { icon: <FaRupeeSign />, text: 'Sales Growing', value: '0rs' },
    { icon: <FaMoneyBillWave />, text: 'Admin Fee in Month' },
    { icon: <AiOutlineCodeSandbox />, text: 'Sold This Month' },
    { icon: <BsFillCartCheckFill />, text: 'Received This Month' },
];

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

const Home = () => {
    return (
        <div className={styles.container}>
            {/* <div>
                <h1 className={styles.title}>Welcome to the Admin Dashboard!</h1>
                <h2 className={styles.subtitle}>Get started by managing your data.</h2>
            </div> */}

            {/* <div className={styles.boxContainer}>
                {boxData.map((box, index) => (
                    <div className={styles.box} key={index}>
                        <div className={styles.icon}>{box.icon}</div>
                        <p className={styles.boxText}>{box.text}</p>
                        {box.value && <h4>{box.value}</h4>}
                    </div>
                ))}
            </div> */}

            <div className={styles.chartContainer}>
                <div className={styles.chart}>
                    <PieChart style={{marginRight:"20px", width:'40px'}} width={500} height={500}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
{/* 
                <div className={styles.chart}>
                    <LineChart width={600} height={300} data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </div> */}
            </div>
        </div>
    );
};

export default Home
