---
title: Steps to Add Host-to-IP Mapping to Test Containers
author: User
date: 2024-09-03 12:00:00 +0800
categories: [Carrier, Configuration, Docker]
tags: [carrier, docker, interceptor, host-mapping]
render_with_liquid: false
---
 
## Overview
 
This guide provides instructions on how to add host-to-IP mapping to test containers in Carrier. This is similar to the functionality provided by the `/etc/hosts` file in Linux-based systems.
 
### Prerequisites
 
Before you begin, ensure that:
 
- You have Carrier installed and set up successfully.
- Docker is installed on the system where the interceptor is being run.
- You have access to the Carrier platform to configure the interceptor.
 
### Step 1: Prepare the Host-to-IP Mapping
 
To map a hostname to a specific IP address in the test container, you'll need to use the `EXTRA_HOSTS` parameter when running the interceptor.
 
1. **Single Host Mapping:**
 
   If you need to map a single host to an IP address, use the following format:
   ```bash
   -e EXTRA_HOSTS='{"HOST": "IP"}'
   ```
 
   Replace `HOST` with the desired hostname and `IP` with the corresponding IP address.
 
2. **Multiple Host Mappings:**
 
   To map multiple hosts to their respective IP addresses, use the following format:
   ```bash
   -e EXTRA_HOSTS='{"HOST1": "IP1", "HOST2": "IP2"}'
   ```
 
   Replace `HOST1` and `HOST2` with the desired hostnames, and `IP1` and `IP2` with the corresponding IP addresses.
 
   > **Note:** This functionality has not yet been thoroughly tested with multiple hosts. Please proceed with caution and test configurations before full-scale deployment.
   {: .prompt-warning }
 
### Step 2: Add the Host-to-IP Mapping to the Interceptor Command
 
To apply the host-to-IP mapping, modify the interceptor run command by adding the `EXTRA_HOSTS` parameter.
 
Example:
 
```bash
docker run -d --rm -v /var/run/docker.sock:/var/run/docker.sock \
  -e RAM_QUOTA=4g -e CPU_QUOTA=2 -e CPU_CORES=2 \
  -e RABBIT_HOST=${CARRIER_HOST} \
  -e RABBIT_USER=${RABBIT_USER} -e RABBIT_PASSWORD=${RABBIT_PWD} \
  -e VHOST=${PROJECT_VHOST} \
  -e QUEUE_NAME=my_new_QUEUE -e TOKEN=${AUTH_TOKEN} \
  -e EXTRA_HOSTS='{"my-service.local": "192.168.1.100"}' \
  -e LOKI_HOST=https://${CARRIER_HOST} getcarrier/interceptor:latest
```
 
In this example:
 
- The `EXTRA_HOSTS` parameter maps the hostname `my-service.local` to the IP address `192.168.1.100`.
 
### Step 3: Verify the Configuration
 
1. **Run the Interceptor:**
 
   Execute the interceptor command with the `EXTRA_HOSTS` parameter as configured.
 
2. **Check the Container:**
 
   After running the command, verify that the host-to-IP mapping is correctly applied inside the test container:
 
   ```bash
   docker inspect <container_name>
   ```
 
   Look for entries that match the mappings you specified.
 
### Step 4: Test the Mapping
 
- **For Single Host Mapping:** Verify that the container correctly resolves the mapped hostnames to their corresponding IP addresses.
- **For Multiple Host Mappings:** If multiple mappings were configured, ensure that each hostname is correctly resolved to its respective IP address.
 
### Next Steps
 
Once you have verified that the host-to-IP mapping works as expected, you can proceed with your performance testing or other container-based tasks, knowing that your custom hostname resolutions are correctly configured.
 
> For any issues or advanced configurations, refer to the [Carrier documentation](https://getcarrier.io/docs/) or contact support.
{: .prompt-info }