---
title: Ubuntu - Carrier Installation
author: User
date: 2023-05-20 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, installation, ubuntu]
render_with_liquid: false
---
 
## Installation
This guide provides step-by-step instructions for installing Carrier on Ubuntu operating systems. 
Carrier is a powerful platform for performance and security testing. 

### Prerequisites

To install Carrier successfully, your Linux host must meet the following hardware requirements (CPU, RAM, Disk):

| Minimal Hardware requirements |                    |
|--------------------------------|--------------------|
| CPU                            | 4 (and more)        |
| RAM                            | 16 GB (and more)    |
| Disk                           | 100-500GB (root drive or mounted drive) |
| IP address or DNS              | Static              |
| Inbound ports                  | http – 80, ssh - 22, tcp - 3100, http - 5672(rabbitmq), http - 8086 (influxdb)|

As a load generator it is recommended to use separate virtual machine:

| Load generator hardware minimal requirements  |                    |
|--------------------------------|--------------------|
| CPU                            | 2 (and more)       |
| RAM                            | 8 GB (and more)    |


> Please note that the specifications mentioned above are recommendations and can be adjusted based on your specific requirements and workload. Make sure to choose the appropriate instance types or virtual machine sizes that align with the Carrier instance requirements.

### Cloud Provider Recommendations

#### AWS
For Carrier installation on AWS, you can use EC2 instances that meet the following specifications:
- Instance Type: `m5.large` or higher
- vCPUs: 4 or more
- RAM: 16 GB or more
- Root Volume: 100-500GB SSD
- IP: Assign a static IP to the instance

#### Azure
For Carrier installation on Azure, you can use virtual machines that meet the following specifications:
- Virtual Machine Size: `Standard_D4s_v3` or higher
- vCPUs: 4 or more
- RAM: 16 GB or more
- OS Disk: 100-500GB Premium SSD
- IP: Assign a static IP to the virtual machine

> For Azure it is reccomended to disable daily updates to avoid Docker restarts:

1. Check if you have any daily services enabled using the following command:
```bash
$ sudo systemctl list-timers
```
The following services should be stopped/disabled: `apt-daily-upgrade.service`, `apt-daily.service`.

2. Disable the timer services:
```bash
$ sudo systemctl stop apt-daily-upgrade.timer
$ sudo systemctl disable apt-daily-upgrade.timer
$ sudo systemctl stop apt-daily.timer
$ sudo systemctl disable apt-daily.timer
$ sudo systemctl daemon-reload
```
After disabling, ensure that the disabled services are not running anymore using the following command:
3. Run next:
```bash
$ sudo systemctl list-timers
```

#### Google Cloud Platform (GCP)
For Carrier installation on GCP, you can use Compute Engine instances that meet the following specifications:
- Machine Type: `n1-standard-4` or higher
- vCPUs: 4 or more
- RAM: 16 GB or more
- Boot Disk: 100-500GB SSD
- IP: Assign a static IP to the instance

#### Software

1. Install [Docker](https://docs.docker.com/desktop/install/ubuntu/) 4.19.0+:
```bash
$ sudo apt update
$ sudo apt install docker.io -y
```

2. Install Docker [Compose](https://docs.docker.com/compose/install/):
```bash
$ sudo apt install docker-compose
```
> Make sure you're got no errors after the build step command.

5. If the hardware drive is not the root drive, mount the disk to the /opt directory.
> Please find how to mount disk steps by the link: [how](#how-to-mount-disks)

6. Install [Git](https://git-scm.com/downloads) 2.40.1+ :
- Check if Git is installed using the following command:
```bash
$ git --version
```
- Otherwise, install it:
```bash
$ sudo apt install git
```

### Steps
1. Using root user clone the carrier-io centry repository to the /opt directory:
```bash
$ cd /opt
$ git clone https://github.com/carrier-io/centry.git -b next
```

2. Navigate to the downloaded folder:
```bash
$ cd centry
```
> 05/2/29 `beta-1.0` branch to release

9. Get the `public IP` of your system and set the `CURRENT_IP` variable to the defined value:
```bash
$ CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com | grep 'address ' | cut -d ' ' -f 4)
```

10. In the `.env` file, change `DEV_IP` to `CURRENT_IP`:
```bash
$ sed -i -e "s/\$DEV_IP/$CURRENT_IP/g" .env
```

11. Create a new config file:
```bash
$ cp config/pylon-example.yml config/pylon.yml
```

12. Launch the Carrier installer:
```bash
$ docker-compose up -d
```
Output:

```console
Status: Downloaded newer image for grafana/grafana:latest
Pulling pylon (getcarrier/pylon:latest)...
latest: Pulling from getcarrier/pylon
918547b94326: Pull complete
5d79063a01c5: Pull complete
4eedd9c5abf7: Pull complete
9cdadd40055f: Pull complete
2a12d0031f3f: Pull complete
2d4866cf6449: Pull complete
406c88e1abe3: Pull complete
02df300aa56e: Pull complete
167443f87bae: Pull complete
2cd12cb7de27: Pull complete
b18d02dee478: Pull complete
2c59c872b36d: Pull complete
cb98fd0463c7: Pull complete
Digest: sha256:c9704508366b319d0c2c0414fb7271e34b458fb63a794522bf03833b9ba509ae
Status: Downloaded newer image for getcarrier/pylon:latest
Creating carrier-influx   ... done
Creating carrier-postgres ... done
Creating carrier-redis    ... done
Creating carrier-loki     ... done
Creating carrier-mongo    ... done
Creating carrier-minio    ... done
Creating carrier-grafana  ... done
Creating carrier-vault    ... done
Creating centry_traefik_1 ... done
Creating carrier-rabbit   ... done
Creating carrier-keycloak             ... done
Creating carrier-interceptor          ... done
Creating carrier-interceptor_internal ... done
Creating carrier-pylon-worker         ... done
Creating carrier-pylon-auth           ... done
Creating carrier-pylon                ... done
```
> Installation process takes ~5-10 minutes

```bash
$ docker logs -f carrier-pylon-auth
```

**Output:**

```console
INFO - pylon.core.tools.process - Stored in directory: /root/.cache/pip/wheels/e3/76/6f/c25be6a9e6cc9985b96e8c95997d46790242c6426ef68e754c
INFO - pylon.core.tools.process - Successfully built jsonpath_rw
INFO - pylon.core.tools.process - Installing collected packages: ply, decorator, jsonpath_rw
INFO - pylon.core.tools.process - Successfully installed decorator-5.1.1 jsonpath_rw-1.4.0 ply-3.11
INFO - plugins.auth_mappers.module - Initializing module
INFO - plugins.auth_oidc.module - Initializing module
INFO - plugins.auth_root.module - Initializing module auth_root
INFO - pylon.core.tools.server - Starting Flask server
 * Tip: There are .env or .flaskenv files present. Do "pip install python-dotenv" to use them.
WARNING - werkzeug -  * Debugger is active!
INFO - werkzeug -  * Debugger PIN: 686-802-926
```

Validate logs: 

```bash
$ docker logs carrier-pylon
```

12. Once the installation is finished, open the following URL in a browser: `http://<public DNS or IP>`

13. Login for the first time to the system using the admin/admin credentials.

![Carrier login form](/assets/posts_img/login_screen.png)

> You're all set, then! Excellent Work! 


## How to create a project in Carrier

1. Once you log in, you will see a page indicating that there are no projects created yet.
    ![Carrier after login](/assets/posts_img/main_page.png)

2. Click on the person logo in the top right corner and select "Administration" to switch to Administration mode and create your first project.

    ![Carrier select admin](/assets/posts_img/select_admin.png)

3. Click on the plus sign to add the project. Set the name of your project and click "Create".

    3.1 Open ![Carrier plus btn](/assets/posts_img/plus_project.png)


    3.2 Save ![Carrier set name ](/assets/posts_img/set_name_prj.png)

4. Your project will be created. It might take around 1 minute. You can track the process of project creation in the carrier-pylon logs to ensure that there are no errors.

    ```bash
$ docker logs -f carrier-pylon 
``` 

5. Once the project is created, you can switch back to Project mode.

    ![Carrier plus btn](/assets/posts_img/project_mode.png)

    You will get to Project configuration page.

    ![Carrier demo ](/assets/posts_img/demo_prj.png)

6. You can navigate to the required sections, either Performance or Security, to start configuring tests using the left menu in the dropdown list.

    ![Carrier menu ](/assets/posts_img/dropdown.png)

    Performance:

    ![Carrier perf ](/assets/posts_img/perf_screen.png)

## Troubleshooting

1. Restart main container 

```bash
$ docker restart carrier-pylon
$ docker logs -f carrier-pylon
```

If something doesn't work as expected, check the logs of the following containers for any errors:

```bash
$ docker logs -f carrier-keycloak
$ docker logs -f centry_traefik_1
$ docker logs -f carrier-pylon-auth
```

### How to mount disks
1. Get the list of all available partitions on your system with the following command:
    ```bash
$ sudo fdisk -l
```

2. Make a new file system:
    ```bash
$ sudo mkfs -t ext4 /dev/nvme1n1
```

3. Add information about the new filesystem in the file system table by editing /etc/fstab:
    ```bash
$ sudo vi /etc/fstab
```

4. Add the following line at the end of the file:
    ```
/dev/nvme1n1    /opt   ext4    defaults     0        2
```

5. Mount the required file system to the existing /opt directory:
    ```bash
$ sudo mount /dev/nvme1n1 /opt
```

6. Mount Docker to the /opt folder:
    ```bash
$ cd /opt
$ sudo mkdir docker
$ sudo service docker stop
$ sudo mount --rbind /opt/docker /var/lib/docker
$ sudo service docker start
```

## Uninstall
If the root volume was used as the hard drive, use the following commands to stop containers and remove all required artifacts:
```bash
$ docker-compose down
$ docker volume prune
$ docker network prune
```

If a mounted disk was used, manually delete all directories with images:
```bash
$ docker-compose down
$ sudo rm -rf /opt/docker
```