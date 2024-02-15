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

### Prerequisites

To add Interceptor successfully you should use [Docker](https://docs.docker.com/) so your machine must meet the following hardware requirements (CPU, RAM, Disk space):

| Minimal Hardware requirements  |                    |
|--------------------------------|--------------------|
| CPU                            | 4 cores            |
| RAM                            | 4 GB               |
| Disk space                     | 30 GB              |

Before you begin configuring Interceptor in Carrier, ensure that you have completed the following:

- Installed and set up Carrier successfully
- Had access to a project in Carrier
- Installed [Docker](https://docs.docker.com/)

### Step 1: Obtain Secrets Parameters from Carrier Platform
 
1. Go to your Carrier platform by visiting - [https://${CARRIER_HOST}/](https://${CARRIER_HOST}/) <br />
*(${CARRIER_HOST} is not a real URL it is just a template of the URL you should have after a successful Carrier installation)*
  - From the project dropdown menu, select the project you want.
  - Click "Go!" to navigate to the project's configuration page.
  ![Select Project](/assets/posts_img/select_prj.png)
  - Select CONFIGURATION option from the top left dropdown menu.
  ![Select Configuration Dropdown](/assets/posts_img/select_configuration_dropdown.png)
  - Click on "Secrets" option in the top menu
  ![Secrets Option](/assets/posts_img/secrets_option.png)

 > Also you can go to "Configuration" > "Secrets" on your Carrier platform by visiting  <br />
[https://${CARRIER_HOST}/-/configuration/secrets/](https://${CARRIER_HOST}/-/configuration/secrets/)
{: .prompt-info }

2. Copy the values of the following parameters:
   - `auth_token` (used as `${AUTH_TOKEN}` parameter)
   - `rabbit_project_password` (used as `${RABBIT_PWD}` parameter)
   - `rabbit_project_user` (used as `${RABBIT_USER}` parameter)
   - `rabbit_project_vhost` (used as `${PROJECT_VHOST}` parameter)
 
> For your convenience, you can temporarily paste the values into Notepad or another text editor, but **don't save it on your machine**!
{: .prompt-info }

### Step 2: Run the Interceptor Docker Container
 
Execute the following Docker command with parameters from "Secrets" to run the interceptor container:
 
```bash
docker run -d --rm -v /var/run/docker.sock:/var/run/docker.sock \
  -e RAM_QUOTA=4g -e CPU_QUOTA=2 -e CPU_CORES=2 \
  -e RABBIT_HOST=${CARRIER_HOST} \
  -e RABBIT_USER=${RABBIT_USER} -e RABBIT_PASSWORD=${RABBIT_PWD} \
  -e VHOST=${PROJECT_VHOST}
  -e QUEUE_NAME=my_new_QUEUE -e TOKEN=${AUTH_TOKEN} \
  -e LOKI_HOST=https://${CARRIER_HOST} getcarrier/interceptor:latest
```
 > Ensure to replace the placeholders `${CARRIER_HOST}`, `${RABBIT_USER}`, `${RABBIT_PWD}`, `${PROJECT_VHOST}`, and `${AUTH_TOKEN}` with your specific values. Also don't forget to remove all **${ }**.
{: .prompt-info }
 
### Step 3: Run Rabbit Queue Checker Task
 
1. Navigate to "Configuration" > "Tasks" on your Carrier platform using the following URL: [https://${CARRIER_HOST}/-/configuration/tasks/](https://${CARRIER_HOST}/-/configuration/tasks/)
![Tasks RQC](/assets/posts_img/tasks_rqc.png)
2. Run the "rabbit_queue_checker" task.
![Run RQC](/assets/posts_img/run_rqc.png)
 
By following these simple steps, you can seamlessly integrate the interceptor into your Carrier platform, enhancing your performance testing capabilities with advanced monitoring and interception features.