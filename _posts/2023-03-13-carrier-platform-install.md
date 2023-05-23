---
title: Carrier Installation
author: Developer
date: 2023-03-13 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, installation]
render_with_liquid: false
---

> This tutorial will guide you how to instal Carrier platform.

## Hardware requirements:
system_requirements, hardware, installation

### Carrier instance requirements:
- 4 cpu (and more)
- 16 GB RAM (and more)
- 100-500GB SSD (root drive or mounted drive)
    * Mounted drive is better option as it gives possibility to move carrier data to other instance or not lose data in case if instance is terminated accidentally.
- Static IP or public DNS

### Load generator:
- 2 cpu (and more)
- 8 GB ram (and more)

## Prerequisites
- instance launched in accordance with hardware requirements with root permissions
- the following inbound ports are open (security group for cloud):
    * http – 80
    * ssh - 22
    * tcp - 3100, 5672, 8086
- all daily updates that might trigger docker restart or termination should be disabled

| Prerequisites                  |                                                                    |
|--------------------------------|--------------------------------------------------------------------|
| Instance launched with         | Hardware requirements with root permissions.                      |
| Inbound ports                  | http – 80, ssh - 22, tcp - 3100, 5672, 8086                         |
| Daily updates                  | All daily updates that might trigger docker restart or termination should be disabled. |

| Carrier instance requirements: |                    |
|--------------------------------|--------------------|
| CPU                            | 4 (and more)        |
| RAM                            | 16 GB (and more)    |
| SSD                            | 100-500GB (root drive or mounted drive) |
| IP address or DNS              | Static              |

| Load generator:                |                    |
|--------------------------------|--------------------|
| CPU                            | 2 (and more)        |
| RAM                            | 8 GB (and more)     |


| Distribution | Instructions                                                                                                          |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| Ubuntu       | Check if you have any daily services enabled using the following command:                                          |
|              | `$ sudo systemctl list-timers`                                                                                          |
|              | ![img-description](/assets/img/ubuntu_inst.png)                                                                   |
|              | The following services should be stopped/disabled: `apt-daily-upgrade.service`, `apt-daily.service`                    |
|              |                                                                                                                       |
|              | `$ sudo systemctl stop apt-daily-upgrade.timer`                                                                          |
|              | `$ sudo systemctl disable apt-daily-upgrade.timer`                                                                       |
|              | `$ sudo systemctl stop apt-daily.timer`                                                                                  |
|              | `$ sudo systemctl disable apt-daily.timer`                                                                               |
|              | `$ sudo systemctl daemon-reload`                                                                                         |
|              |                                                                                                                       |
|              | After disabling ensure that disabled services are not running anymore using the following command:                    |
|              | `$ sudo systemctl list-timers`                                                                                          |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| Debian       | The same as Ubuntu                                                                                                    |
| Centos       | In the default Centos image, there shouldn't be any timer services enabled, but better to ensure using the command: |
|              | `$ sudo systemctl list-timers`                                                                                          |
|              |                                                                                                                       |
|              | Disable timer services if required:                                                                                    |
|              | `$ sudo systemctl stop $service_name`                                                                                    |
|              | `$ sudo systemctl disable $service_name`                                                                                 |
|              | `$ sudo systemctl daemon-reload`                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| Fedora       | In the default Fedora image, there shouldn't be any timer services enabled, but better to ensure using the command: |
|              | `$ sudo systemctl list-timers`                                                                                          |
|              |                                                                                                                       |
|              | Disable timer services if required:                                                                                    |
|              | `$ sudo systemctl stop $service_name`                                                                                    |
|              | `$ sudo systemctl disable $service_name`                                                                                 |
|              | `$ sudo systemctl daemon-reload`                                                                                         |


### Ubuntu
- Check if you have any daily services enabled using the following command:

```bash
$ sudo systemctl list-timers
```
![img-description](/assets/img/ubuntu_inst.png) 
The following services should be stopped/disabled: apt-daily-upgrade.service, apt-daily.service

![img-description](/assets/img/ununtu1_inst.png) 
The following services should be stopped/disabled: apt-daily-upgrade.service, apt-daily.service

```bash
$ sudo systemctl stop apt-daily-upgrade.timer
$ sudo systemctl disable apt-daily-upgrade.timer
$ sudo systemctl stop apt-daily.timer
$ sudo systemctl disable apt-daily.timer
$ sudo systemctl daemon-reload 
```


## Procedure
Installation guide demonstrates installation process for Ubuntu OS (latest version).
1.	Switch to a root user
```bash
sudo su
```
2.	Install docker

| Distro  | Update Command | Installation Commands |
|---------|----------------|-----------------------|
| Ubuntu  | `apt update`    | `apt install docker.io -y` |
| Debian  | `apt update`    | `apt install docker.io -y` |
| CentOS  | `sudo yum install -y yum-utils` | `sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`<br> `sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin` |
| Fedora  | `sudo dnf -y install dnf-plugins-core` | `sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo`<br> `sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin` |


3.	Install docker-compose

| Distro  | Installation Commands |
|---------|-----------------------|
| Ubuntu  | `apt install docker-compose` |
| Debian  | `apt install docker-compose` |
| CentOS  | Check the current release by the link https://github.com/docker/compose/releases and if necessary, update it in the command below:<br><br> `sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`<br><br>`sudo chmod +x /usr/local/bin/docker-compose`<br><br>Create a symbolic link for docker-compose in /usr/bin/docker-compose file:<br><br>`sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose` |
| Fedora  | Check the current release by the link https://github.com/docker/compose/releases and if necessary, update it in the command below:<br><br> `sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`<br><br>`sudo chmod +x /usr/local/bin/docker-compose`<br><br>Create a symbolic link for docker-compose in /usr/bin/docker-compose file:<br><br>`sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose` |


4.	If hardware drive is not root drive, then mount disk to /opt directory.

| Step No. | Command |
|----------|---------|
| 4.1      | Get the list of all available partitions on your system with the following command:<br>`fdisk -l`<br><br>Make a new file system:<br>`mkfs -t ext4 /dev/nvme1n1`<br><br>Add information about new filesystem in file system table by editing /etc/fstab:<br>`vi /etc/fstab`<br><br>Add the following line in the end of the file:<br>`/dev/nvme1n1    /opt   ext4    defaults     0        2`<br><br>Mount required file system to existent /opt directory:<br>`mount /dev/nvme1n1 /opt` |
| 4.2      | Mount docker to /opt folder<br>`cd /opt`<br><br>`mkdir docker`<br><br>`service docker stop`<br><br>`mount --rbind /opt/docker /var/lib/docker`<br><br>`service docker start` |


4.2. Mount docker to /opt folder
``` bash
$ cd /opt
$ mkdir docker
$ service docker stop
$ mount --rbind /opt/docker /var/lib/docker
$ service docker start
```
5.	Install Git

- Check if Git is installed using the following command:
```bash
git --version
```

- Otherwise install it:

| OS      | Command              |
|---------|----------------------|
| Ubuntu  | sudo apt install git |
| Debian  | sudo apt install git |
| Centos  | sudo yum install git |
| Fedora  | sudo dnf install git |


6.	Clone carrier-io centry repository to /opt directory.
```bash
$ cd /opt
$ git clone https://github.com/carrier-io/centry.git
```
7.	Switch to next branch in century repository.
```bash
cd centry
git checkout next
```
8.	Get public IP of your system and set CURRENT_IP variable to defined value:

| OS      | Command                                                                                             |
|---------|-----------------------------------------------------------------------------------------------------|
| Ubuntu  | CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com `\\\|` grep 'address ' `\|` cut -d ' ' -f 4)       |
| Debian  | CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com `\\\|` grep 'address ' 
`\|` cut -d ' ' -f 4)       |
| Centos  | yum install bind-utils && CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com 
`\|` grep 'address ' `\|` cut -d ' ' -f 4) |
| Fedora  | dnf install bind-utils && CURRENT_IP=$(host myip.opendns.com resolver1.opendns.com `\|` grep 'address ' `\|` cut -d ' ' -f 4) |


9.	In .env file change DEV_IP to CURRENT_IP:
```bash
$ cd /opt/centry
$ sed -i -e "s/\$DEV_IP/$CURRENT_IP/g" .env
```
10.	Launch Carrier installer:
``` bash 
docker-compose up -d
```
Installation process downloads all required images from docker hub, launches images and downloads all required plugins.
Primary container is carrier-pylon. 
Once carrier-pylon container is created:

![img-description](https://karenflorykian.github.io/) 

it is good to track installation process reading its logs using the following command:
```bash
$ docker logs -f carrier-pylon
```
 

Some connection errors might appear in the log as it tries to connect to rabbitmq while rabbit is not started yet. Due to the internal process of retry once rabbit is started errors will go away.

During installation process carrier-pylon clones all required git repos with required plugins and install dependencies.

Installation process takes ~5-10 minutes.  

The following message indicates the end of installation process:
UTC -     INFO - pylon.core.tools.server - Starting WSGI server

11.	Once installation is finished open the following URL in browser:
`http://< public DNS or IP>`

You should see the following page that indicates successful installation of Carrier.
 


12.	Login first time in the system using admin/admin credentials.

How to create project in Carrier
13.	Once you login you will see the following page that indicates that there are no projects created yet.
 

14.	Click to the person logo in right top corner and select Administration to switch to Administration mode and create your first project:
 

15.	Click to plus to add the project. 

Set the name of your project and click Create.
 

Your project is created. It might take ~1 minute. The process of project creation you can track in carrier-pylon logs to make sure that there are no any errors.

16.	Once project is created you can get back to Project mode
 

You will get to Project configuration page.

 

17.	Now your project is setup and you can navigate to required sections either Performance or Security to start configuring tests using left menu in dropdown list.


##  Troubleshooting

If something doesn’t work as expected check logs of the following containers if there are some errors:
```bash
$ docker logs -f carrier-keycloak
$ docker logs -f centry_traefik_1
$ docker logs -f carrier-pylon-auth
```

##  Uninstall

If root volume was used as hard drive then use the following commands to stop containers and all required artifacts.
```bash
$ docker-compose down
$ docker volume prune
$ docker network prune
```

If mounted disk was used then all directories with images should be deleted manually:
```bash
$ docker-compose down
$ rm -f /opt/docker
```


