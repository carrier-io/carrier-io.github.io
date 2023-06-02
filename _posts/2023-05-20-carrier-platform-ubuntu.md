---
title: Ubuntu Installation Steps
author: User
date: 2023-05-20 12:00:00 +0800
categories: [Performance, Installation Tutorial]
tags: [performance, installation, ubuntu]
render_with_liquid: false
---

## Overview
This guide provides step-by-step instructions for installing Carrier on Ubuntu operating systems.

> Please find the hardware requirements by following the [link](http://getcarrier.io/posts/carrier-install/#prerequisites).
{: .prompt-info }

### Prerequisites

Before installing Carrier, you need to ensure that the following tools are installed on your CentOS system:

- [Docker](https://docs.docker.com/desktop/install/ubuntu/) 4.19.0+
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads) 2.40.1+
- [Make](https://wiki.ubuntu.com/ubuntu-make)

> After executing the installation commands, it is important to ensure that there are no errors. Please verify that the installation process completed successfully without encountering any issues.
{: .prompt-tip }

#### Install Docker
```bash
sudo apt update
sudo apt install docker.io -y
```

#### Install Docker Compose:
```bash
sudo apt install docker-compose -y
```

#### Install Git Install
- Check if Git is installed using the following command:
```bash
git --version
```
- Otherwise, install it:
```bash
sudo apt install git -y
```

#### Install Make:
```bash
sudo apt install make -y
```
After completing these steps, you have successfully installed Docker, Docker Compose, Git, and Make tools on your Ubuntu system.

### Carrier Installation Steps
1. Using root user clone the carrier-io [centry](https://github.com/carrier-io/centry/blob/beta-1.0/Makefile) repository to the `/opt` directory:
```bash
git clone https://github.com/carrier-io/centry.git -b beta-1.0 /opt/centry
```

2. Navigate to the downloaded folder:
```bash
cd /opt/centry
```
    > You need to use public IP to access Carrier
    {: .prompt-info }

3. Get the `public IP` of your system and set the `CURRENT_IP` variable to the defined value:
For example, using next cmd:
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
    Creating carrier-minio    ... done
    Creating carrier-grafana  ... done
    Creating carrier-vault    ... done
    Creating centry_traefik_1 ... done
    Creating carrier-rabbit   ... done
    Creating carrier-keycloak             ... done
    Creating carrier-interceptor          ... done
    Creating carrier-interceptor_internal ... done
    Creating carrier-pylon-auth           ... done
    Creating carrier-pylon                ... done
    ```
    Verify that main container is started:
    > Packages downloading process takes ~5-10 minutes
    {: .prompt-info }

    ```bash
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
