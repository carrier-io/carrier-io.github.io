---
title:  Add Interceptor (Carrier Agent) to the Carrier Platform
author: User
date: 2024-02-14 12:00:00 +0800
categories: [Performance, Tutorial, Interceptor]
tags: [performance, backend, interceptor, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to add Interceptor (Carrier Agent) to the Carrier Platform. By Adding an interceptor to the Carrier platform allows you to enhance monitoring and interception capabilities for your performance testing environment. Follow these straightforward steps to seamlessly integrate the interceptor into your setup.

### Step 1: Run the Interceptor Docker Container
 
Execute the following Docker command to run the interceptor container:
 
```bash
docker run -d --rm -v /var/run/docker.sock:/var/run/docker.sock \
  -e RAM_QUOTA=4g -e CPU_QUOTA=2 -e CPU_CORES=2 \
  -e RABBIT_HOST=${CARRIER_HOST} \
  -e RABBIT_USER=${RABBIT_USER} -e RABBIT_PASSWORD=${RABBIT_PWD} \
  -e VHOST=${PROJECT_VHOST}
  -e QUEUE_NAME=my_new_QUEUE -e TOKEN=${AUTH_TOKEN} \
  -e LOKI_HOST=https://${CARRIER_HOST} getcarrier/interceptor:latest
```
 > Ensure to replace the placeholders `${CARRIER_HOST}`, `${RABBIT_USER}`, `${RABBIT_PWD}`, `${PROJECT_VHOST}`, and `${AUTH_TOKEN}` with your specific values.
{: .prompt-info }
 
### Step 2: Obtain Parameters from Carrier Platform
 
1. Go to "Configuration" > "Secrets" on your Carrier platform by visiting [https://${CARRIER_HOST}/-/configuration/secrets/](https://${CARRIER_HOST}/-/configuration/secrets/)
  - From the project dropdown menu, select the project you want.
  - Click "Go!" to navigate to the project's configuration page.
  ![Select Project](/assets/posts_img/select_prj.png)
  - Click on "Secrets" option in the top menu
  ![Secrets Option](/assets/posts_img/secrets_option.png)

2. Copy the values of the following parameters:
   - `auth_token` (used as `AUTH_TOKEN` parameter)
   - `rabbit_project_password` (used as `RABBIT_PWD` parameter)
   - `rabbit_project_user` (used as `RABBIT_USER` parameter)
   - `rabbit_project_vhost` (used as `PROJECT_VHOST` parameter)
 
### Step 3: Run Rabbit Queue Checker Task
 
1. Navigate to "Configuration" > "Tasks" on your Carrier platform using the following URL: [https://${CARRIER_HOST}/-/configuration/tasks/](https://${CARRIER_HOST}/-/configuration/tasks/)
![Tasks RQC](/assets/posts_img/tasks_rqc.png)
2. Run the "rabbit_queue_checker" task.
![Run RQC](/assets/posts_img/run_rqc.png)
 
By following these simple steps, you can seamlessly integrate the interceptor into your Carrier platform, enhancing your performance testing capabilities with advanced monitoring and interception features.