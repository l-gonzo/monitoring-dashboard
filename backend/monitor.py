import psutil
import json
import getpass
import time

def get_cpu_usage():
    # Obtiene el uso de CPU por núcleo en varios intervalos
    usage_samples = [psutil.cpu_percent(interval=1, percpu=True) for _ in range(5)]
    
    # Calcula el promedio de uso de cada núcleo
    promedios_nucleos = [sum(nucleo) / len(nucleo) for nucleo in zip(*usage_samples)]
    return [round(promedio, 2) for promedio in promedios_nucleos]  # Redondea a 2 decimales

def mean_list(lst):
    if len(lst) == 0:  
        return 0  
    addition = sum(lst)  
    count = len(lst)  
    mean = addition / count  
    mean = round(mean, 2)
    return mean  


def get_system_info():
    cpu_usage = get_cpu_usage()
    memory_info = psutil.virtual_memory()
    disk_info = psutil.disk_usage('/')
    net_io = psutil.net_io_counters()

    data = {
        "cpu_usage": mean_list(cpu_usage),  
        "memory": {
            "total": memory_info.total / (1024 * 1024),  
            "used": memory_info.used / (1024 * 1024),    
            "percentage": memory_info.percent              
        },
        "disk": {
            "total": disk_info.total / (1024 * 1024),    
            "used": disk_info.used / (1024 * 1024),      
            "percentage": disk_info.percent                
        },
        "network": {
            "sent": net_io.bytes_sent / (1024 * 1024),    
            "received": net_io.bytes_recv / (1024 * 1024) 
        },
        "login_user": getpass.getuser()
    }

    return json.dumps(data)

if __name__ == "__main__":
    print(get_system_info())
