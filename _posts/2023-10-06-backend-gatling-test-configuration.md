---
title: Configure Gatling Backend Test in Carrier
author: User
date: 2023-10-06 12:00:00 +0800
categories: [Performance, Performance Tutorial]
tags: [performance, carrier, backend-test, configuration]
render_with_liquid: false
---
## Overview

This guide provides step-by-step instructions for configuring a Gatling Backend test in Carrier. Backend tests are designed to simulate traffic to your application's backend services and measure their performance.

### Prerequisites

Before you begin configuring a Gatling Backend test in Carrier, ensure that you have completed the following:

- Installed and set up Carrier successfully
- Created a project in Carrier

### Steps

Follow the steps below to configure a Gatling Backend test in Carrier:

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
   ![Add Backend Test](/assets/posts_img/plus_btn_backen_planner.png)
2. Fill in the required details for the Backend test, including the test name, description, and test type.
3. Select the desired option to get Source code with test scripts. Options include `GIT`, `ARTIFACT` (upload archive), and `LOCAL` (path to test scripts on Carrier host).
4. For the `GIT` option, provide the credentials to the repository with test scripts if required.
5. Specify the entrypoint, which is the path to the test script to run.
   ![Configure Gatling Backend Test](/assets/posts_img/config_git_gatling.png)

> It is recommended to use Git integration to automatically update scripts.
{: .prompt-tip }

#### Step 5: Configure Gatling Backend Test Parameters

1. In the Backend test configuration page, set various parameters for your test:

   - **Test Name**: Enter the name of the Backend test. The test name should describe its purpose.
   - **Test Type**: Specify the type to group similar tests.
   - **Test Environment**: Specify the environment name to group related tests.
   - **Test Runner**: Select the tool to use for load generation. For example Gatling maven-3.7 or Gatling v3.7.
   - **Custom CMD**: Configure additional parameters for the test run if required. For example, Gatling simulation (-D variables).
   - **Load Configuration**: Specify the engine region and load profile. By default, the test will run on the Carrier host. CPU cores and memory are distributed for each parallel runner.
   - **Test Parameters**: Create additional parameters that can be changed in subsequent test runs. For example, the number of virtual users, duration, and ramp-up period.
   - **Integrations**: Configure integrations to compare test results with SLAs using `QualityGate`.
   - **Reporters**: Specify the reporters for test results. You can also set reporters in the Integrations section.
   - **Scheduling**: Create schedules for the test with different parameters.
   - **Advanced Parameters**: Configure additional parameters for the test runner, test data, and network settings.

    > It is recommended to define Test Execution Parameters and update test scripts to use them.
    {: .prompt-tip }

    ![Backend Test Parameters](/assets/posts_img/test_params_backend_gatling.png)

2. Adjust these parameters based on your specific test scenario and system under test requirements. Examples of test configurations under different test runners can be found in paragraph [Demo configurations examples](#demo-configurations-examples)

    ![Menu Configuration Backend](/assets/posts_img/menu_config_backend.png)

#### Step 6: Save and Run the Backend Test

1. After configuring all the necessary parameters and settings for the Backend test, click the "Save" button to save your changes.
   ![Saved Button Gatling](/assets/posts_img/save_button_gatling.png)
   ![Saved Gatling Backend Test](/assets/posts_img/saved_gatling_test.png)
2. To run the test, click the "Run" button.
   ![Run Gatling Backend Test](/assets/posts_img/run_test_gatling.png)
3. Configure test parameters and click the "Run Test" button.
    ![Parameters Gatling Test](/assets/posts_img/test_parameters_gatling.png)

    > You can also schedule the test to run at specific intervals or on a recurring basis using the scheduling options provided in the Carrier web interface.
    {: .prompt-tip }

#### Step 7: Monitor Test Execution and Results

1. Once the Backend test is running, you can monitor its execution and view the results. Select test to get access the test run details and performance metrics.
    ![Results Backend Test](/assets/posts_img/tests_results_gatling.png)
2. Key Metrics can be found at the top of the page.
    ![Test Run Details](/assets/posts_img/test_run_details_gatling.png)
3. You can set the results aggregation time.
    ![Test Aggregation Time](/assets/posts_img/test_agg_time_gatling.png)
4. Summary table for test metrics.
   ![Summary Table](/assets/posts_img/summary_table_gatling.png)
5. The errors panel can be found below the summary table.
   ![Errors Panel](/assets/posts_img/errors_panel_gatling.png)
6. The engine health panel can be found below the errors table.
   ![Engine Health Panel](/assets/posts_img/engine_health_gatling.png)
6. You can download .log file from artifacts panel at the buttom of the page
   ![Engine Health Panel](/assets/posts_img/artifacts_gatling.png)
    > Congratulations! You have successfully configured and run the Backend test in Carrier. You can now run and monitor the test to measure the performance of your backend services.
    {: .prompt-info }

### Demo configurations examples

#### Configuration with **Gatling v3.7** test runner:

   - **Test Name**: `Todos_Demo`
   - **Test Type**: `demo`
   - **Test Environment**: `demo`
   - **Test Runner**: `Gatling v3.7`
   - **Git Repo with Tests**: **HTTPS** `https://github.com/carrier-io/gatling_demo_scripts.git`
   - **Git Branch**: `java_v_3_7`
   - **Entrypoint**: `carrier.FloodIoJava`
![Gatling 3.7 config](/assets/posts_img/gatling_3_7_config.png)
Test parameters:
   - **apiUrl**: `https://training.flooded.io`
   - **ramp_users**: `5`
   - **ramp_duration**: `30`
   - **duration**: `35`
![Gatling 3.7 test parameters](/assets/posts_img/gatling_3_7_test_parameters.png)


#### Configuration with **Gatling maven-3.7** test runner:

   - **Test Name**: `Demo_Gatling_maven`
   - **Test Type**: `demo`
   - **Test Environment**: `demo`
   - **Test Runner**: `Gatling maven-3.7`
   - **Git Repo with Tests**: **HTTPS** `https://github.com/carrier-io/gatling_demo_scripts.git`
   - **Git Branch**: `mvn`
   - **Entrypoint**: `carrier.FloodIoMvn`
![Gatling 3.7 config](/assets/posts_img/gatling_mvn_3_7_config.png)
Test parameters:
   - **environment**: `https://training.flooded.io`
   - **ramp_users**: `5`
   - **ramp_duration**: `30`
   - **duration**: `35`
![Gatling 3.7 test parameters](/assets/posts_img/gatling_3_7_mvn_test_parameters.png)
## Next Steps

Once you have configured and executed your Gatling Backend test in Carrier, you may want to explore other testing capabilities and features offered by Carrier, such as Frontend testing, Security testing, and advanced reporting and analysis options.
Follow the guide on [how to analyze and compare test runs in Carrier](http://getcarrier.io/posts/backend-comparison/) to get started.