---
title: On-Premises Testing with Carrier Interceptors 
author: User
date: 2025-04-03 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, configuration, interceptor]
render_with_liquid: false
---

### Overview

This document provides a comprehensive guide on how to implement On-Premises Testing using Carrier Interceptors. This feature allows you to test applications behind a firewall, utilizing your own virtual machines (VMs) to test both private and public applications securely.

Carrier Interceptors are designed to manage worker-type services, ensuring secure and efficient performance testing by handling a variable number of tasks per server based on its capacity.

![Interceptor](/assets/posts_img/onpremise_interceptor.png)

### Benefits of On-Premises Testing

Implementing on-premises testing with Carrier Interceptors offers several advantages:
1. **Enhanced Security**: Keeps sensitive data within the organization's secure environment.
2. **Compliance and Regulatory Requirements**: Helps meet strict regulatory requirements for data handling and storage.
3. **Testing of Private Applications**: Enables thorough testing of internal applications without exposing them to external networks.
4. **Network Latency and Performance**: Provides more accurate performance metrics by eliminating external network variability.
5. **Resource Utilization**: Reduces the need for additional investments in cloud-based testing services.
6. **Flexibility**: Offers greater control and flexibility, ensuring optimal performance without relying on external service providers.

### Configure On-Premises Interceptor 

Before setting up Carrier Interceptors, ensure the following prerequisites are met:

- Carrier is installed and set up successfully.
- A project is created in Carrier.
- Installed [Docker](https://docs.docker.com/).

Follow these instructions to [Add Interceptor](https://getcarrier.io/docs/) to your Carrier installation. Steps to configure the interceptor:
1. Obtain Secrets Parameters from the Carrier Platform.
2. Run the Interceptor Docker Container.
3. Run the Rabbit Queue Checker Task.
4. Select Load configuration in a test.

Ensure that ports `3100`, `5672`, and `8086` are set to ALLOW OUT. These ports are necessary for:
- `3100` - Loki (used for logs aggregation)
- `5672` - RabbitMQ (task broker and queue)
- `8086` - InfluxDB (store time series test results)
  
### Next Steps

By configuring Carrier Interceptors, you can ensure that your performance testing is secure and efficient. This setup allows you to test applications within your own infrastructure, providing accurate performance metrics and maintaining compliance with regulatory requirements.