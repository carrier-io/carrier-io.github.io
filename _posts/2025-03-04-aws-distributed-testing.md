---
title: Distributed Testing using AWS in Carrier
author: User
date: 2025-03-04 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, aws, distributed-testing, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for performing distributed testing using AWS in Carrier. Distributed testing allows you to run tests across multiple AWS instances, enabling you to simulate a larger load and achieve more comprehensive performance testing results.

### Prerequisites

Before you begin with distributed testing using AWS in Carrier, ensure that you have completed the following:

- [Installed and set up Carrier](https://carrier-io.github.io/posts/carrier-install) successfully or you have a Carrier account with the necessary permissions
- [Created a project in Carrier](https://carrier-io.github.io/posts/carrier-create-project)
- [Configured AWS integration](https://carrier-io.github.io/posts/configure-aws-integration)
- Configured backend test

### Steps

Follow the steps below to perform distributed testing using AWS in Carrier:

### Step 1: Access the Carrier Web Interface

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

### Step 2: Open Performance Backend Tab

1. From the project dropdown menu, select the desired project where you want to perform distributed testing.
![Select Project](/assets/posts_img/select_prj.png)
2. Click `Go!` to navigate to the project's configuration page.
3. Click on the `Performance` tab located in the left menu.
![Dropdown](/assets/posts_img/performance_dropdown.png)
4. Select the `Backend` tab to define and manage your Backend tests.
![Backend Page](/assets/posts_img/backend_page.png)

### Step 3: Open Run Test

1. Click on `Test Run` button.
![Test Run Button](/assets/posts_img/run_test_gatling.png)

### Step 4: Specify AWS Runners Details

1. In the `Run Backend Test` configuration window, specify the details for AWS runners.
2. Enter the number of AWS instances you want to use for distributed testing.
![Distributed Testing Runners](/assets/posts_img/distributed_testing_runners.png)
3. Configure additional parameters such as instance type, region, and any other relevant settings.
4. Configure the `vUsers` parameter.
![Distributed Testing vUsers](/assets/posts_img/distributed_testing_vusers.png)
> Note: The specified value will be multiplied by the number of runners in the final test results (e.g., 1 vUser with 2 runners results in 2 vUsers).

### Step 5: Run Test

1. After specifying the AWS runners details, click the `Run` button to start the distributed test.

### Step 6: Verify the Runners Number

1. Once the test is running, verify the number of instances in logs.
![Distributed Testing Logs](/assets/posts_img/distributed_testing_logs.png)
> Note: The specified value will be multiplied by the number of runners in the final test results (e.g., 2 runners results in 3 instances).

2. Verify that instances are ready and testing has started.
![Distributed Testing Logs2](/assets/posts_img/distributed_testing_logs2.png)

### Next Steps

Distributed testing was successfully conducted using AWS in Carrier, enabling the simulation of larger loads and leading to more comprehensive performance testing results.
