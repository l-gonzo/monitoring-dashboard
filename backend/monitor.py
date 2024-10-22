import psutil
import json
import getpass

def get_system_info():
    cpu_usage = psutil.cpu_percent(interval=1)
    memory_info = psutil.virtual_memory()
    disk_info = psutil.disk_usage('/')
    
    data = {
        "cpu_usage": cpu_usage,
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
            "sent": psutil.net_io_counters().bytes_sent / (1024 * 1024), 
            "received": psutil.net_io_counters().bytes_recv / (1024 * 1024) 
        },
        "login_user": getpass.getuser()
    }
    
    return json.dumps(data)

if __name__ == "__main__":
    print(get_system_info())
