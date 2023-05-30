---
title: Ubuntu Installation Steps
author: User
date: 2023-05-20 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, installation, ubuntu]
render_with_liquid: false
---

## Installation
This guide provides step-by-step instructions for installing Carrier on Ubuntu operating systems.
Carrier is a powerful platform for performance and security testing.

> **INFO** Please find the hardware requirements and prerequisites by following the [link](http://getcarrier.io/posts/carrier-install/#prerequisites).
>>

### Steps
1. Using root user clone the carrier-io [centry](https://github.com/carrier-io/centry/blob/beta-1.0/Makefile) repository to the `/opt` directory:
```bash
$ cd /opt
$ git clone https://github.com/carrier-io/centry.git -b beta-1.0
```

2. Navigate to the downloaded folder:
```bash
$ cd /opt/centry
```
> You need to use public IP to access Carrier

3. Get the `public IP` of your system and set the `CURRENT_IP` variable to the defined value:
For example, using next cmd:
```bash
$ CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com | grep 'address ' | cut -d ' ' -f 4)
```

4. Set parameters in `.env` and `Makefile` file


    10.1 Set IP (change `DEV_IP` and `DIRECT_IP` to `CURRENT_IP`):

        $ sed -i -e "s/\#DIRECT_IP=FORCE_SET_IP_HERE/DIRECT_IP=$CURRENT_IP/g" Makefile
        $ sed -i -e "s/\$DEV_IP/$CURRENT_IP/g" .env



    10.2 Set installation path in for `CARRIER_PATH` and `VOLUMES_PATH` in `.env`:

        $ vi .env
        ....
        CARRIER_PATH=/opt/centry
        VOLUMES_PATH=/opt/centry/volumes
        ....

5. Review list of default plugins in config file:
```bash
$ cat config/pylon.yml
```

6. Launch the Carrier installer:
```bash
$ make up
```
> Please note that installation of the Carrier installer takes from 5 to 10 minutes.

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
    Verify that main container is started:
    > Packages downloading process takes ~5-10 minutes


    ```bash
    $ docker logs -f carrier-pylon
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
    $ docker ps -a
    ```

7. Once the installation is finished, open the following URL in a browser: `http://<public DNS or IP>`

8. Login for the first time to the system using the `admin/admin` credentials.

    ![Carrier login form](/assets/posts_img/login_screen.png)

    > You're all set, then! Excellent Work!
