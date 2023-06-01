---
title: Configure Backend Test in Carrier
author: User
date: 2023-06-01 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, backend-test, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for configuring a Backend test in Carrier. Backend tests are designed to simulate traffic to your application's backend services and measure their performance.

### Prerequisites

Before you begin configuring a Backend test in Carrier, ensure that you have completed the following:

- Installed and set up Carrier successfully
- Created a project in Carrier

### Steps

Follow the steps below to configure a Backend test in Carrier:

#### Step 1: Access the Carrier Web Interface

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

> Note: Make sure you have logged in using the appropriate user account that has access to the project where you want to configure the Backend test.
{: .prompt-info }

#### Step 2: Select the Project

1. From the project dropdown menu, select the desired project where you want to configure the Backend test.
2. Click "Go!" to navigate to the project's configuration page.

#### Step 3: Navigate to the Backend Section

1. In the project configuration page, click on the "Backend" tab located in the left menu.
2. This will open the Backend configuration section where you can define and manage your Backend tests.


#### Step 4: Add a New Backend Test

1. Click on the "Add Backend Test" button.
![Carrier Login Page](/assets/posts_img/plus_btn_backen_planner.png)
2. Fill in the required details for the Backend test, including the test name, description, and test type.
3. Select the desired option to get Source code with test scripts. Options include `GIT`, `ARTIFACT` (upload archive), and `LOCAL` (path to test scripts on Carrier host).
4. `Git` option includes HTTP and SSH. If required, provide the credentials to repository with test scripts.
5. Specify Entrypoint - path to the test script to run.
![Carrier Login Page](/assets/posts_img/config_git.png)

> It is recommended to use Git integration to have ability automatically update scripts
{: .prompt-tip }

#### Step 5: Configure Backend Test Parameters

1. In the Backend test configuration page, you can set various parameters for your test, such as:

   - `Test Name`: Enter the name of the backend Test. `Test Name` describes the purpose of your test
   - `Test Type`: Specify the type to group tests.
   - `Test Environment`:  Specify env name to group tests.
   - `Test runner`:  Tool to use for load generation, such as JMeter or Gatling.
   - `Custom CMD`: Configure additional parameters for test run if your backend test requires it. JMeter script (-J variables) or Gatling simulation (-D variables).
   - `LOAD CONFIGURATION`: Specify engine region and load profile (by default will run on Carrier host). CPU Cores and Memory are distributed for each parallel runner
   - `TEST PARAMETERS`: You may also create additional parameters with ability to change them in subsequent test runs. For example, number of virtual users, duration, ramp up period etc.
   - `Integrations`: Ability to compare test results with SLAs using `QualityGate`
   - `REPORTERS`: Specify reporters. You may also set reporters in Integrations
   - `SCHEDULING`: You can create several schedules of this test with different parameters
   - `ADVANCED PARAMETERS`: Configure parameters for test runner, test data and network setting

    > It is recommended to use define Test Execution Parameters and update tests scripts to use them
    {: .prompt-tip }
    > Duration: Set the duration of the test run.

    > Load Profile: Define the load profile for the test, such as constant, ramp-up, or custom.

    > Concurrent Users: Specify the number of concurrent users for the test.

    > Think Time: Set the think time between requests if applicable.

    ![Carrier Login Page](/assets/posts_img/test_params_backend.png)

2. Adjust these parameters based on your specific test scenario and system under test requirements.

     ![Carrier Login Page](/assets/posts_img/menu_config_backend.png)

#### Step 6: Save and Run the Backend Test

1. After configuring all the necessary parameters and settings for the Backend test, click the "Save" button to save your changes.
    ![Carrier Login Page](/assets/posts_img/saved_test_backend.png)
2. To run the test, click the "Run" button.
    ![Carrier Login Page](/assets/posts_img/run_test.png)

>  You can also schedule the test to run at specific intervals or on a recurring basis by using the scheduling options provided in the Carrier web interface.
{: .prompt-tip }

#### Step 7: Monitor Test Execution and Results

1. Once the Backend test is running, you can monitor its execution and view the results.
2. In the Carrier web interface, navigate to the "Performance" tab to access the test run details and performance metrics.
      ![Carrier Login Page](/assets/posts_img/monitor_1.png)
3. You can find test progress and logs in the bottom of the page
      ![Carrier Login Page](/assets/posts_img/monitor_2.png)
4. You can set "autoupdate" and results aggregation time
      ![Carrier Login Page](/assets/posts_img/monitor_3.png)
5. Analyze the test results to evaluate the performance of your backend services.
      ![Carrier Login Page](/assets/posts_img/monitor_4.png)
6. Errors panel can be found below graphs
      ![Carrier Login Page](/assets/posts_img/errors_panel.png)
7. Summary table
      ![Carrier Login Page](/assets/posts_img/summary_table.png)

>Congratulations! You have successfully configured and run Backend test in Carrier. You can now run and monitor the test to measure the performance of your backend services.
{: .prompt-info }

## Next Steps

Once you have configured and executed your Backend test in Carrier, you may want to explore other testing capabilities and features offered by Carrier, such as Frontend testing, Security testing, and advanced reporting and analysis options.
