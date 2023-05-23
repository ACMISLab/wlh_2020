import requests

BASE_URL = 'http://192.168.103.121:32101/api/v1/query?query='

cpu = '100*(1-sum by(instance)(increase(node_cpu_seconds_total{mode=\"idle\",instance=\"{nodeName}\"}[1m]))/sum by(instance)(increase(node_cpu_seconds_total{instance=\"{nodeName}\"}[1m])))'
gpu = 'sum+by%28node%29%28container_gpu_utilization%7Bnode%3D%22node4%22%7D%29'
gpu_mem = '100+*+sum+by%28node%29%28container_gpu_memory_total%7Bnode%3D%22node4%22%7D%29+%2F+8192'
mem = '(node_memory_MemTotal_bytes%7Binstance%3D%22{nodeName}%22%7D-(node_memory_MemFree_bytes%7Binstance%3D%22{nodeName}%22%7D%2Bnode_memory_Cached_bytes%7Binstance%3D%22{nodeName}%22%7D%2Bnode_memory_Buffers_bytes%7Binstance%3D%22{nodeName}%22%7D))%2Fnode_memory_MemTotal_bytes%7Binstance%3D%22{nodeName}%22%7D*100'
net = '(sum(rate(node_network_receive_bytes_total{instance=\"{nodeName}\"}[1m]))*8)/(1024*1024)'

CLUSTER_RESOURCE_USAGE = [cpu, gpu, gpu_mem, mem, net]


def get_node_load(node_list):
    node_info = {}
    for node_name in node_list:
        system_info = []
        for url in CLUSTER_RESOURCE_USAGE:
            # system_info.append(float(0.0))
            # continue

            response = requests.get(BASE_URL + url.replace('{nodeName}', node_name))
            result = response.json()["data"]["result"]
            if len(result) == 0:
                system_info.append(float(0.0))
            else:
                system_info.append(float(response.json()["data"]["result"][0]["value"][1]))
        node_info[node_name] = system_info
    return node_info
