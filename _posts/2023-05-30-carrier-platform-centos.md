---
title: Centos Installation Steps
author: User
date: 2023-05-20 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, installation, centos]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for installing Carrier on CentOS operating systems. Carrier is a powerful platform for performance and security testing.

> Please find the hardware requirements by following the [link](http://getcarrier.io/posts/carrier-install/#prerequisites).
{: .prompt-info }

### Prerequisites

Before installing Carrier, you need to ensure that the following tools are installed on your CentOS system:

- Docker
- Docker Compose
- Git
- Make

> After executing the installation commands, it is important to ensure that there are no errors. Please verify that the installation process completed successfully without encountering any issues.
{: .prompt-tip }

#### Install Docker

1. Update the system:
```bash
sudo yum update -y
```

    Expected Output:

    ```
      python3-attrs-20.3.0-7.el9.noarch
      python3-jsonschema-3.2.0-13.el9.noarch
      python3-pyrsistent-0.17.3-8.el9.x86_64

    Complete!
    ```

2. Install required packages:
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. Set up the Docker repository:
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

4. Install Docker:
```bash
sudo yum install docker-ce -y
```

5. Start and enable Docker service:
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

6. Verify that Docker is installed correctly:
```bash
docker --version
```

    Expected Output:

    ```
    [root@ip-172-31-26-250 ec2-user]# docker --version
    Docker version 24.0.2, build cb74df
    ```

#### Install Docker Compose

1. Ensure that you have Docker installed on your CentOS system. If Docker is not installed, you can refer to the previous instructions to install it.

2. Download the Docker Compose binary into the `/usr/local/bin` directory:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

3. Apply executable permissions to the Docker Compose binary:
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

4. Create a symbolic link for docker-compose in `/usr/bin/docker-compose`:
```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

5. Verify that Docker Compose is installed correctly:
```bash
docker-compose --version
```

    Expected Output:

    ```
    [root@ip-172-31-26-250 ec2-user]# docker-compose --version
    Docker Compose version v2.18.1
    ```

#### Install Git

1. Install Git:
```bash
sudo yum install git -y
```

2. Verify the Git installation:
```bash
git --version
```
  Expected Output:

    ```
    [root@ip-172-31-26-250 ec2-user]# git version
    git version 2.39.1
    ```

#### Install Make

1. Install the Development Tools group package:
```bash
sudo yum groupinstall "Development Tools" -y
```

2. Verify the Make installation:
```bash
make --version
```

After completing these steps, you have successfully installed Docker, Docker Compose, Git, and Make tools on your CentOS system.

Make sure to execute these additional steps before proceeding with the Carrier installation to ensure that all the required tools are installed on your CentOS system.
### Carrier Installation Steps
> You need to use public IP to access Carrier
{: .prompt-info }

1. Using root user clone the carrier-io centry repository to the `/opt` directory:
```bash
cd /opt
git clone https://github.com/carrier-io/centry.git -b beta-1.0
```

2. Navigate to the downloaded folder:
```bash
cd /opt/centry
```
3. Get the `public IP` of your system and set the `CURRENT_IP` variable to the defined value:

```bash
export CURRENT_IP=$(curl -s ifconfig.me)
```

4. Set parameters in `.env` and `Makefile` file

    4.1 Set IP (change `DEV_IP` and `DIRECT_IP` to `CURRENT_IP`):

        sed -i -e "s/\#DIRECT_IP=YOUR_IP_HERE/DIRECT_IP=$CURRENT_IP/g" Makefile
        sed -i -e "s/\$DEV_IP/$CURRENT_IP/g" .env

    4.2 Set installation path in for `CARRIER_PATH` and `VOLUMES_PATH` in `.env`:

        vi .env
        ....
        CARRIER_PATH=/opt/centry
        VOLUMES_PATH=/opt/centry/volumes
        ....

5. Review list of default plugins in config file:
```bash
cat config/pylon.yml
```

6. Launch the Carrier installer:
```bash
make up
```

    Expected Output:

    ```
     [+] Running 126/26
     ✔ vault 5 layers [⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                        15.4s
     ✔ loki 7 layers [⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                        6.0s
     ✔ minio 6 layers [⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                       22.9s
     ✔ mongo 9 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                    36.2s
     ✔ postgres 13 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                            32.0s
     ✔ pylon 11 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                 45.8s
     ✔ pylon_auth Pulled                                                                                                    45.8s
     ✔ grafana 9 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                  28.0s
     ✔ redis 6 layers [⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                       15.6s
     ✔ traefik 4 layers [⣿⣿⣿⣿]      0B/0B      Pulled                                                                        9.7s
     ✔ rabbitmq 12 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                             25.4s
     ✔ keycloak 4 layers [⣿⣿⣿⣿]      0B/0B      Pulled                                                                      39.6s
     ✔ influx 7 layers [⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                     33.2s
     ✔ interceptor 18 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                    42.8s
     ✔ interceptor_internal Pulled                                                                                          42.7s
    ....
    [+] Building 0.0s (0/0)
    [+] Running 16/16
     ✔ Network centry_pylon                    Created                                                                       0.1s
     ✔ Container carrier-redis                 Started                                                                      17.3s
     ✔ Container carrier-mongo                 Started                                                                      17.4s
     ✔ Container carrier-loki                  Started                                                                      17.7s
     ✔ Container carrier-minio                 Started                                                                      17.4s
     ✔ Container carrier-postgres              Started                                                                      17.5s
     ✔ Container carrier-influx                Started                                                                      17.5s
     ✔ Container carrier-vault                 Started                                                                       2.1s
     ✔ Container centry-traefik-1              Started                                                                       1.5s
     ✔ Container carrier-rabbit                Started                                                                       2.0s
     ✔ Container carrier-grafana               Started                                                                       2.0s
     ✔ Container carrier-keycloak              Started                                                                       2.3s
     ✔ Container carrier-interceptor_internal  Started                                                                       3.0s
     ✔ Container carrier-interceptor           Started                                                                       2.8s
     ✔ Container carrier-pylon-auth            Started                                                                       3.3s
     ✔ Container carrier-pylon                 Started
    ```

    Verify that main container is started:
    > Packages downloading process takes ~5-10 minutes
    {: .prompt-info }

    ```bash
    docker logs -f carrier-pylon
    ```

    Expected Output:

    ```
    INFO - pylon.core.tools.process - Stored in directory: /root/.cache/pip/wheels/e3/76/6f/..
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

    Verify that no Docker containers have been restarted:

    ```bash
    docker ps -a
    ```

7. Once the installation is finished, open the following URL in a browser: `http://<public DNS or IP>`

8. Login for the first time to the system using the `admin/admin` credentials.

    ![Carrier login form](/assets/posts_img/login_screen.png)

    > You're all set, then! Excellent Work!
    {: .prompt-info }

## Next Step: Create a Project in Carrier

Once you have completed the installation steps, you can proceed to create your first project in Carrier.
The project allows you to organize and manage your performance and security tests.

Follow the guide on [how to create a project in Carrier](http://getcarrier.io/posts/carrier-create-project/) to get started.


## Troubleshooting

1. Restart carrier-pylon container

```bash
docker restart carrier-pylon
docker logs -f carrier-pylon
```

If something doesn't work as expected, check the logs of the following containers for any errors:

```bash
docker logs -f carrier-keycloak
docker logs -f centry_traefik_1
docker logs -f carrier-pylon-auth
```

## Uninstall
If the root volume was used as the hard drive, use the following commands to stop containers and remove all required artifacts:
```bash
docker-compose down
docker volume prune
docker network prune
```

If a mounted disk was used, manually delete all directories with images:
```bash
docker-compose down
sudo rm -rf /opt/docker
```
