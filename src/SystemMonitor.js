import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { CPUUsage } from './CPUUsage';
import { MemoryUsage } from './MemoryUsage';
import { DiskUsage } from './DiskUsage';

const ResourcesUsage = ({ title, percentage, clickEvent = null }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid black',
                padding: '10px',
                margin: '10px',
                width: '18vw',
            }}
            onClick={clickEvent}
        >
            <h1>{title}</h1>
            <h2>{percentage}%</h2>
        </div>
    );
};

const SystemMonitor = () => {
    const [resourceView, setResourceView] = useState('cpu');
    const [cpuUsage, setCpuUsage] = useState({ x: [], y: [] });
    const [memoryUsage, setMemoryUsage] = useState({ x: [], y: [] });
    const [diskUsage, setDiskUsage] = useState({ x: [], y: [] });
    const [systemInfo, setSystemInfo] = useState({
        cpu_usage: 0,
        memory: { total: 0, used: 0, percentage: 0 },
        disk: { total: 0, used: 0, percentage: 0 }
    });

    const [fechaInicial, setFechaInicial] = useState('');
    const [horaInicial, setHoraInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [fechaCompletaInicial, setFechaCompletaInicial] = useState('');
    const [fechaCompletaFinal, setFechaCompletaFinal] = useState('');

    const fetchSystemInfo = () => {
        axios.get('http://localhost/monitoring-dashboard/backend/data_server.php')
            .then(response => {
                const data = response.data;
                const currentTime = new Date().toLocaleTimeString();

                setSystemInfo(data);

                // Usar funciones de actualización para garantizar el estado correcto
                setCpuUsage(prevCpuUsage => ({
                    x: [...prevCpuUsage.x, currentTime],
                    y: [...prevCpuUsage.y, data.cpu_usage]
                }));

                setMemoryUsage(prevMemoryUsage => ({
                    x: [...prevMemoryUsage.x, currentTime],
                    y: [...prevMemoryUsage.y, data.memory.percentage]
                }));

                setDiskUsage(prevDiskUsage => ({
                    x: [...prevDiskUsage.x, currentTime],
                    y: [...prevDiskUsage.y, data.disk.percentage]
                }));
            })
            .catch(error => {
                console.error("Error fetching system info", error);
            });
    };

    const unirFechaInicial = () => {
        setFechaCompletaInicial(fechaInicial + ' ' + horaInicial);
    }

    const unirFechaFinal = () => {
        setFechaCompletaFinal(fechaFinal + ' ' + horaFinal);
    }

    useEffect(() => {
        unirFechaInicial();
        unirFechaFinal();
        console.log("caca-i",fechaCompletaInicial);
        console.log("caca-f",fechaCompletaFinal);
    }, [fechaInicial, horaInicial, fechaFinal, horaFinal]);

    useEffect(() => {
        fetchSystemInfo();
        const interval = setInterval(fetchSystemInfo, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <h2>System Monitor</h2>

                
            <div style={{ display: 'flex', flexDirection: 'row', height: '20px' }}>
                <label>De:</label>
                <input type="date" id="fecha" name="fecha" required onChange={(e) => setFechaInicial(e.target.value)}/>
                <input type="time" id="hora" name="hora" required onChange={(e) => setHoraInicial(e.target.value)}/>
                <label style={{marginLeft:'1vw'}}>A:</label>
                <input type="date" id="fecha" name="fecha" required onChange={(e) => setFechaFinal(e.target.value)}/>
                <input type="time" id="hora" name="hora" required onChange={(e) => setHoraFinal(e.target.value)}/>
                <button >Ver historial</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <ResourcesUsage title="CPU Usage" percentage={systemInfo.cpu_usage} clickEvent={() => setResourceView('cpu')} />
                    <ResourcesUsage title="Memory Usage" percentage={systemInfo.memory.percentage} clickEvent={() => setResourceView('memory')} />
                    <ResourcesUsage title="Disk Usage" percentage={systemInfo.disk.percentage} clickEvent={() => setResourceView('disk')} />
                </div>

                <div>
                    {resourceView === 'cpu' && <CPUUsage cpuUsage={cpuUsage} />}
                    {resourceView === 'memory' && <MemoryUsage memoryUsage={memoryUsage} />}
                    {resourceView === 'disk' && <DiskUsage diskUsage={diskUsage} />}
                </div>
            </div>
        </div>
    );
};

export default SystemMonitor;
