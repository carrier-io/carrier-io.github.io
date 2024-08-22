---
title: Debian Installation Steps
author: User
date: 2023-05-20 12:00:00 +0800
categories: [Performance, Installation Tutorial]
tags: [performance, installation, debian]
render_with_liquid: false
---

## Overview
This guide provides step-by-step instructions for installing Carrier on Debian operating systems.

> Please find the hardware requirements by following the [link](http://getcarrier.io/posts/carrier-install/#prerequisites).
{: .prompt-info }

### Prerequisites

Before installing Carrier, you need to ensure that the following tools are installed on your Debian system:

- [Docker](https://docs.docker.com/engine/install/debian/) 4.19.0+
- [Docker Compose](https://docs.docker.com/compose/install/) 1.29.2+
- [Git](https://git-scm.com/downloads) 2.40.1+
- [Make](https://www.gnu.org/software/make/)

> After executing the installation commands, it is important to ensure that there are no errors. Please verify that the installation process completed successfully without encountering any issues.
{: .prompt-tip }

#### Install Docker
```shell
sudo apt update
sudo apt install docker.io -y
```

#### Install Docker Compose:
1. Ensure that you have Docker installed on your system. If Docker is not installed, you can refer to the previous instructions to install it.

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

#### Install Git Install
- Check if Git is installed using the following command:
```shell
git --version
```
- Otherwise, install it:
```shell
sudo apt install git -y
```

#### Install Make:
```shell
sudo apt install make -y
```
After completing these steps, you have successfully installed Docker, Docker Compose, Git, and Make tools on your Debian system.

### Carrier Installation Steps
1. Using root user clone the carrier-io [centry](https://github.com/carrier-io/centry/blob/beta-1.0/Makefile) repository to the `/opt` directory:
```shell
git clone https://github.com/carrier-io/centry.git -b beta-1.0 /opt/centry
```

2. Navigate to the downloaded folder:
```shell
cd /opt/centry
```
    > You need to use public IP to access Carrier
    {: .prompt-info }

3. Get the `public IP` of your system and set the `CURRENT_IP` variable to the defined value:
For example, using next cmd:
```shell
export CURRENT_IP=$(curl -s ifconfig.me)
```

4. Set parameters in `.env` and `Makefile` file


    4.1 Set IP (change `DEV_IP` and `DIRECT_IP` to `CURRENT_IP`):

        sed -i -e "s/\#DIRECT_IP=YOUR_IP_HERE/DIRECT_IP=$CURRENT_IP/g" Makefile
        sed -i -e "s/\$APP_IP/$CURRENT_IP/g" .env



    4.2 Set installation path in for `CARRIER_PATH` and `VOLUMES_PATH` in `.env`:

        vi .env
        ....
        CARRIER_PATH=/opt/centry
        VOLUMES_PATH=/opt/centry/volumes
        ....

5. Review list of default plugins in config file:
```shell
cat config/pylon.yml
```

6. Launch the Carrier installer:
```shell
make up
```

    Expected Output:

    ```console
     [+] Running 15/15
     ✔ Network centry_pylon                    Created                                                                                                                                                                                                       0.2s
     ✔ Container carrier-redis                 Started                                                                                                                                                                                                      29.4s
     ✔ Container carrier-loki                  Started                                                                                                                                                                                                      29.4s
     ✔ Container carrier-influx                Started                                                                                                                                                                                                      29.7s
     ✔ Container carrier-minio                 Started                                                                                                                                                                                                      29.8s
     ✔ Container carrier-postgres              Started                                                                                                                                                                                                      29.7s
     ✔ Container carrier-rabbit                Started                                                                                                                                                                                                       1.6s
     ✔ Container centry-traefik-1              Started                                                                                                                                                                                                       1.5s
     ✔ Container carrier-vault                 Started                                                                                                                                                                                                       2.0s
     ✔ Container carrier-grafana               Started                                                                                                                                                                                                       1.9s
     ✔ Container carrier-interceptor_internal  Started                                                                                                                                                                                                       2.2s
     ✔ Container carrier-interceptor           Started                                                                                                                                                                                                       2.7s
     ✔ Container carrier-keycloak              Started                                                                                                                                                                                                       2.5s
     ✔ Container carrier-pylon-auth            Started                                                                                                                                                                                                       5.9s
     ✔ Container carrier-pylon                 Started                                                                                                                                                                                                       5.8s
    ```
    Verify that the main container is started:
    > Packages downloading process takes ~5-10 minutes
    {: .prompt-info }

    ```shell
    docker logs -f carrier-pylon
    ```

    Expected Output:

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

    Verify that no Docker containers have been restarted:

    ```shell
    docker ps -a
    ```

7. Once the installation is finished, open the following URL in a browser: `http://<public DNS or IP>`

8. Log in to the Carrier web interface using the default credentials:
- Username: `admin`
- Password: `admin`

    ![Carrier login form](/assets/posts_img/login_screen.png)

    > You're all set, then! Excellent Work!
    {: .prompt-info }

## Next Step: Create a Project in Carrier

Once you have completed the installation steps, you can proceed to create your first project in Carrier.
The project allows you to organize and manage your performance and security tests.

Follow the guide on [how to create a project in Carrier](http://getcarrier.io/posts/carrier-create-project/) to get started.

## Troubleshooting

1. Restart carrier-pylon container

```shell
docker restart carrier-pylon
docker logs -f carrier-pylon
```

If something doesn't work as expected, check the logs of the following containers for any errors:

```shell
docker logs -f carrier-keycloak
docker logs -f centry_traefik_1
docker logs -f carrier-pylon-auth
```

## Uninstall
If the root volume was used as the hard drive, use the following commands to stop containers and remove all required artifacts:
```shell
docker-compose down
docker volume prune
docker network prune
```

If a mounted disk was used, manually delete all directories with images:
```shell
docker-compose down
sudo rm -rf /opt/docker
```

