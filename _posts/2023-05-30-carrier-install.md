---
title: Carrier Installation Guide
author: User
date: 2023-05-30 12:00:00 +0800
categories: [Performance, Installation Tutorial]
tags: [performance, installation, ubuntu, centos]
render_with_liquid: false
pin: true
---

## Overview
Carrier is a powerful platform for performance and security testing.
This guide includes a table with hardware requirements, cloud provider recommendations, and software installation steps.
It also contains links to the specific installation guides for Ubuntu and Centos platforms.

> Please be aware that the instructions provided in this guide are specifically designed for setting up a Carrier platform using HTTP protocol. Configuring the platform for HTTPS require additional steps not covered here.
{: .prompt-info }

### Prerequisites

To install Carrier successfully, your Linux host must meet the following hardware requirements (CPU, RAM, Disk):

| Minimal Hardware requirements |                    |
|--------------------------------|--------------------|
| CPU                            | 4 (and more)        |
| RAM                            | 16 GB (and more)    |
| Disk                           | 100-500GB (root drive or mounted drive) |
| IP address or DNS              | Static              |
| Inbound ports                  | http – 80, ssh - 22, tcp - 3100, http - 5672(rabbitmq), http - 8086 (influxdb)|

> Mounted drive is better option as it gives possibility to move carrier data to other instance or not lose data in case if instance is terminated accidentally.
> Please find how to mount disk steps by the link: [how](#how-to-mount-disks)
{: .prompt-tip }

As a load generator it is recommended to use separate virtual machine:

| Load generator hardware minimal requirements  |                    |
|--------------------------------|--------------------|
| CPU                            | 2 (and more)       |
| RAM                            | 8 GB (and more)    |


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


> To prevent Docker restarts on Azure, it is recommended to disable daily updates.
{: .prompt-tip }


Follow the steps below to disable the daily updates:
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

> Please note that the specifications mentioned above are recommendations and can be adjusted based on your specific requirements and workload. Make sure to choose the appropriate instance types or virtual machine sizes that align with the Carrier instance requirements.
{: .prompt-info }

## Install on Ubuntu

For detailed instructions on installing Carrier on Ubuntu, refer to the [Ubuntu Installation Steps](https://carrier-io.github.io/posts/carrier-platform-ubuntu/).

## Install on CentOS

For detailed instructions on installing Carrier on CentOS, refer to the [CentOS Installation Steps](https://carrier-iogithub.io/posts/carrier-platform-centos/).


## Install on Fedora

For detailed instructions on installing Carrier on Fedora, refer to the [Fedora Installation Steps](https://carrier-iogithub.io/posts/carrier-platform-fedora/).


## Install on Debian

For detailed instructions on installing Carrier on Debian, refer to the [Debian Installation Steps](https://carrier-iogithub.io/posts/carrier-platform-debian/).


### Post-Installation Steps
> It is strongly advised to change the default Carrier admin user password and Keycloak user after installation.
{: .prompt-tip }

After installing Carrier, you may want to perform the following post-installation steps:

#### 1. Configure Carrier project

- Set up user accounts, roles, and permissions.
- Configure email notifications, integrations, and other settings.

#### 2. Secure Carrier

- Change default user passwords
- Enable HTTPS for secure communication with the Carrier web interface.
- Configure firewall rules to restrict access to Carrier ports.
- Follow best practices for securing your Debian 11 server.

#### 3. Set Up Projects and Tests

- Create projects in Carrier to organize your tests.
- Configure and run performance tests using the Carrier web interface.

### How to mount disks
1. Get the list of all available partitions on your system with the following command:
    ```bash
sudo fdisk -l
```

2. Make a new file system:
    ```bash
sudo mkfs -t ext4 /dev/nvme1n1
```

3. Add information about the new filesystem in the file system table by editing /etc/fstab:
    ```bash
sudo vi /etc/fstab
```

4. Add the following line at the end of the file:
    ```
/dev/nvme1n1    /opt   ext4    defaults     0        2
```

5. Mount the required file system to the existing /opt directory:
    ```bash
sudo mount /dev/nvme1n1 /opt
```

6. Mount Docker to the /opt folder:
    ```bash
cd /opt
sudo mkdir docker
sudo service docker stop
sudo mount --rbind /opt/docker /var/lib/docker
sudo service docker start
```
