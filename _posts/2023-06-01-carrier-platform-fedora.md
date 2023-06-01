---
title: Carrier Installation on Fedora
author: User
date: 2023-06-01 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, installation, Fedora]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for installing Carrier on Fedora operating systems.

> Please find the hardware requirements by following the [link](http://getcarrier.io/posts/carrier-install/#prerequisites).
{: .prompt-info }

### Prerequisites

Before installing Carrier, you need to ensure that the following tools are installed on your Fedora system:

- Docker
- Docker Compose
- Git
- Make

> After executing the installation commands, it is important to ensure that there are no errors. Please verify that the installation process completed successfully without encountering any issues.
{: .prompt-tip }

#### Install Docker

1. Update the system:
```bash
sudo dnf update -y
```

2. Install required packages:
```bash
sudo dnf install -y dnf-plugins-core
```

3. Set up the Docker repository:
```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

4. Install Docker:
```bash
sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
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

#### Install Docker Compose

1. Ensure that you have Docker installed on your Fedora system. If Docker is not installed, you can refer to the previous instructions to install it.

2. Install Docker Compose:
```bash
sudo dnf install python3-pip -y
pip3 install docker-compose
```

#### Install Git

1. Install Git:
```bash
sudo dnf install -y git
```

2. Verify the Git installation:
```bash
git --version
```

#### Install Make

1. Install Make:
```bash
sudo dnf install -y make
```

2. Verify the Make installation:
```bash
make --version
```

After completing these steps, you have successfully installed Docker, Docker Compose, Git, and Make tools on your Fedora system.

Make sure to execute these additional steps before proceeding with the Carrier installation to ensure that all the required tools are installed on your Fedora system.

### Carrier Installation Steps
> You need to use public IP to access Carrier
{: .prompt-info }

1. Сlone the carrier-io centry repository to the `/opt` directory:
```bash
git clone https://github.com/carrier-io/centry.git -b beta-1.0 /opt/centry
```

2. Navigate to the downloaded folder:
```bash
cd /opt/centry
```

3. Set the `CURRENT_IP` environment variable to the public IP of your Fedora system:
```bash
export CURRENT_IP=$(curl -s ifconfig.me)
```

4. Set the IP parameters in the `.env` and `Makefile` files:
```bash
sudo sed -i -e "s/\$DEV_IP/$CURRENT_IP/g" .env
sudo sed -i -e "s/\#DIRECT_IP=YOUR_IP_HERE/DIRECT_IP=$CURRENT_IP/g" Makefile
```

5. Update the installation path in the `.env` file:
```bash
sudo vi .env
# Update the CARRIER_PATH and VOLUMES_PATH variables with /opt/centos
```

        vi .env
        ....
        CARRIER_PATH=/opt/centry
        VOLUMES_PATH=/opt/centry/volumes
        ....

6. Export the Docker and Docker Compose timeouts:
```bash
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
```

7. Launch the Carrier installer:
```bash
sudo make up
```

    Expected Output:

    ```console
    Starting carrier-minio    ... done
    Starting carrier-redis    ... done
    Starting carrier-influx   ... done
    Starting carrier-postgres ... done
    Starting carrier-loki     ... done
    Creating carrier-vault    ... done
    Creating centry_traefik_1 ... done
    Creating carrier-rabbit   ... done
    Creating carrier-grafana  ... done
    Creating carrier-keycloak             ... done
    Creating carrier-interceptor          ... done
    Creating carrier-interceptor_internal ... done
    Creating carrier-pylon                ... done
    Creating carrier-pylon-auth           ... done
    ```

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
8. Once the installation is finished, open the following URL in a browser: `http://<public DNS or IP>`

9. Login for the first time to the system using the `admin/admin` credentials.

    ![Carrier login form](/assets/posts_img/login_screen.png)

    > You're all set, then! Excellent Work!
    {: .prompt-info }

## Next Step: Create a Project in Carrier

Once you have completed the installation steps, you can proceed to create your first project in Carrier. The project allows you to organize and manage your performance and security tests.

Follow the guide on [how to create a project in Carrier](http://getcarrier.io/posts/carrier-create-project/) to get started.


## Troubleshooting

1. Restart carrier-pylon container:
```bash
sudo docker restart carrier-pylon
sudo docker logs -f carrier-pylon
```

2. If something doesn't work as expected, check the logs of the following containers for any errors:
```bash
sudo docker logs -f carrier-keycloak
sudo docker logs -f centry_traefik_1
sudo docker logs -f carrier-pylon-auth
```

## Uninstall

If the root volume was used as the hard drive, use the following commands to stop containers and remove all required artifacts:
```bash
sudo docker-compose down
sudo docker volume prune
sudo docker network prune
```

If a mounted disk was used, manually delete all directories with images:
```bash
sudo docker-compose down
sudo rm -rf /opt/docker
```
