import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CPUUsage } from './MonitorComponents/CPUUsage';
import { MemoryUsage } from './MonitorComponents/MemoryUsage';
import { DiskUsage } from './MonitorComponents/DiskUsage';
import { HistoryResource } from './MonitorComponents/History';
import { serverURL } from './Shared/url';
import ErrorAlert from './Alerts/AlertError';
import SwitchButton from './Components/SwitchButton';
import { Tab } from './Components/Tab';



const SystemMonitor = () => {
    const [resourceView, setResourceView] = useState('cpu');
    const [cpuUsage, setCpuUsage] = useState({ x: [], y: [] });
    const [memoryUsage, setMemoryUsage] = useState({ x: [], y: [] });
    const [diskUsage, setDiskUsage] = useState({ x: [], y: [] });
    const [history, setHistory] = useState({ x: [], y: [] });
    const [typeHistory, setTypeHistory] = useState('cpu');
    const [showError, setShowError] = useState(false);
    const [keepRecords, setKeepRecords] = useState(true);
    const [errorMessage, setErrorMessage] = useState('Something went wrong!');


    const [systemInfo, setSystemInfo] = useState({
        cpu_usage: 0,
        memory: { total: 0, used: 0, percentage: 0 },
        disk: { total: 0, used: 0, percentage: 0 },
    });
    const [dateRange, setDateRange] = useState({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    });
    const [fullStartDate, setFullStartDate] = useState('');
    const [fullEndDate, setFullEndDate] = useState('');

    const insertCpuUsage = async (login_user, cpu_usage) => {
        try {

            const form = new FormData();
            form.append('login_user', login_user);
            form.append('cpu_usage', cpu_usage);

            const response = await fetch(`${serverURL}api.php?action=insertCpuUsage`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
        } catch (error) {
            console.error('Error inserting CPU usage:', error);
        }
    };

    const triggerError = () => {
        setShowError(true);
        setErrorMessage('Something went wrong!');
    };

    const closeError = () => {
        setShowError(false);
    };



    const insertMemoryUsage = async (login_user, memory_usage) => {
        try {

            const form = new FormData();
            form.append('login_user', login_user);
            form.append('memory_usage', memory_usage);

            const response = await fetch(`${serverURL}api.php?action=insertMemoryUsage`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
        } catch (error) {
            console.error('Error inserting memory usage:', error);
        }
    };

    const handleToggle = (state) => {
        if (state) {
            setKeepRecords(!keepRecords);
        } else {
            setKeepRecords(!keepRecords);
        }
    };



    const insertDiskUsage = async (login_user, disk_usage) => {
        try {

            const form = new FormData();
            form.append('login_user', login_user);
            form.append('disk_usage', disk_usage);

            const response = await fetch(`${serverURL}api.php?action=insertDiskUsage`, {
                method: 'POST',
                body: form,
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error inserting disk usage:', error);
        }
    };

    const saveHistory = (type, user, usage) => {
        if (type === 'cpu') {
            insertCpuUsage(user, usage);
        } else if (type === 'memory') {
            insertMemoryUsage(user, usage);
        } else if (type === 'disk') {
            insertDiskUsage(user, usage);
        }
    };

    const saveLogs = (user, cpu, memory, disk) => {
        saveHistory('cpu', user, cpu);
        saveHistory('memory', user, memory);
        saveHistory('disk', user, disk);
    };

    const fetchSystemInfo = async (keepLogs = false) => {
        try {
            const response = await axios.get(`${serverURL}data_server.php`);
            const data = response.data;
            const currentTime = new Date().toLocaleTimeString();

            setSystemInfo(data);

            if (keepLogs === true) {
                saveLogs(data.login_user, data.cpu_usage, data.memory.percentage, data.disk.percentage);
            }

            setCpuUsage(prev => ({
                x: [...prev.x, currentTime],
                y: [...prev.y, data.cpu_usage],
            }));

            setMemoryUsage(prev => ({
                x: [...prev.x, currentTime],
                y: [...prev.y, data.memory.percentage],
            }));

            setDiskUsage(prev => ({
                x: [...prev.x, currentTime],
                y: [...prev.y, data.disk.percentage],
            }));
        } catch (error) {
            console.error('Error fetching system info:', error);
        }
    };

    const updateFullDate = () => {
        setFullStartDate(`${dateRange.startDate} ${dateRange.startTime}`);
        setFullEndDate(`${dateRange.endDate} ${dateRange.endTime}`);
    };

    const activateHistory = async (type, start_time, end_time) => {
        let typeAux = typeHistory;
        if (type === 'history') {

        } else {
            setTypeHistory(type);
            typeAux = type;
        }

        const serviceName =
            typeAux === 'cpu'
                ? 'getCpuUsageByRange'
                : typeAux === 'memory'
                    ? 'getMemoryUsageByRange'
                    : 'getDiskUsageByRange';

        try {
            const response = await axios.get(`${serverURL}api.php?action=${serviceName}&start_time=${start_time}&end_time=${end_time}`);
            const data = response.data;

            if (data.status === 'success') {
                // Extraer los valores de cpu_usage y timestamp
                const y = data.data.map(item => typeAux === 'cpu' ? item.cpu_usage : typeAux === 'memory' ? item.memory_usage : item.disk_usage); // Para CPU
                const x = data.data.map(item => item.timestamp);


                setHistory({ x, y });
                setResourceView('history');
            } else if (data.status === 'error') {
                triggerError();
                setErrorMessage(data.message);
            } else {
                console.error('Error fetching data:', data.message);
            }
        } catch (error) {
            console.error('Error in API call:', error);
        }
    };

    useEffect(() => {
        updateFullDate()
    }, [dateRange]);

    useEffect(() => {
        const interval = setInterval(() => fetchSystemInfo(keepRecords), 4000);
        return () => clearInterval(interval);
    }, [keepRecords]); // Adding keepRecords here ensures the interval is reset if it changes


    return (
        <div style={{ padding: '30px', background: 'linear-gradient(145deg, #333333, #2c3e50, #333333)', minHeight: '100vh' }}>
            {showError && <ErrorAlert message={errorMessage} onClose={closeError} />}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', borderRadius: '8px', boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
                background: 'linear-gradient(145deg, #333333, #2c3e50)', color: 'white',
                textShadow: `
            -1px -1px 0 white,
            1px -1px 0 white,
            -1px 1px 0 white,
            1px 1px 0 white`
            }}>
                <h1 style={{ fontSize: '2rem', color: '#333' }}>System Monitor</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <label style={{ marginRight: '10px', fontSize: '1rem', color: '#555' }}>From:</label>
                    <input
                        type="date"
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '5px' }}
                    />
                    <select onChange={(e) => { setDateRange(prev => ({ ...prev, startTime: e.target.value })); }} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}>
                        <option value="">Select Time</option>
                        {Array.from({ length: 24 }, (_, hour) => (
                            <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                            </option>
                        ))}
                    </select>

                    <label style={{ margin: '0 10px', fontSize: '1rem', color: '#555' }}>To:</label>
                    <input
                        type="date"
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '5px' }}
                    />
                    <select onChange={(e) => setDateRange(prev => ({ ...prev, endTime: e.target.value }))} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">Select Time</option>
                        {Array.from({ length: 24 }, (_, hour) => (
                            <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                            </option>
                        ))}
                    </select>

                    <button
                        style={{
                            padding: '10px 20px', marginLeft: '15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'transform 0.2s ease-in-out',
                            fontWeight: 'bold',
                        }}
                        onClick={() => activateHistory(resourceView, fullStartDate, fullEndDate)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        View History
                    </button>
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <Tab title="CPU Usage" percentage={systemInfo.cpu_usage} onClick={() => setResourceView('cpu')} />
                    <Tab title="Memory Usage" percentage={systemInfo.memory.percentage} onClick={() => setResourceView('memory')} />
                    <Tab title="Disk Usage" percentage={systemInfo.disk.percentage} onClick={() => setResourceView('disk')} />
                </div>

                <div style={{ width: '70%' }}>
                    {resourceView === 'cpu' && <CPUUsage cpuUsage={cpuUsage} />}
                    {resourceView === 'memory' && <MemoryUsage memoryUsage={memoryUsage} />}
                    {resourceView === 'disk' && <DiskUsage diskUsage={diskUsage} />}
                    {resourceView === 'history' && <HistoryResource data={history} typeResource={typeHistory} />}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end', marginTop: '.0vh', marginRight: '2vw' }}>
                <label style={{ marginRight: '10px', fontSize: '2rem', color: '#555' }}>Keep records:</label>
                <SwitchButton onToggle={handleToggle} />
            </div>
        </div>
    );
};

export default SystemMonitor;
