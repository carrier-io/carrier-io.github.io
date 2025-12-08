---
title: Test Suites guide
author: User
date: 2025-01-13 12:00:00 +0300
categories: [Performance, Tutorial]
tags: [performance, carrier, suites, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for configuration Test Suites in Carrier.
Test Suites help to make several simultaneous test runs with different parameters. This can be useful for example for testing under different load or different load generators.

### Prerequisites

Before you begin working with Suites, ensure that you have completed the following:

- Installed and set up Carrier successfully.
- Created a project in Carrier.
- Configured Backend and/or UI test.

> Note: You can find out how to create project in Carrier in the following [guide](https://carrier-io.github.io/posts/carrier-create-project/)
{: .prompt-info }

### Steps

Follow the steps below to know how to use Suites in Carrier:

### Step 1: Access the Carrier Web Interface

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

> Note: Make sure you have logged in using the appropriate user account that has all required accesses
{: .prompt-info }

### Step 2: Select the Project

1. From the project dropdown menu, select the desired project where you want to work with Suites.
![Select Project](/assets/posts_img/select_prj.png)
2. Click "Go!" to navigate to the project's configuration page.

### Step 3: Navigate to the Suite tab

1. Click on "Performance" in the dropdown.
![Navigate to Performance](/assets/posts_img/select_performance.png)

2. Click on "Suite" tab
![Suite Tab](/assets/posts_img/suite_tab.png)

### Step 4: Add new test Suite
1. Click on plus button on the Suite page.
![Suite Plus Button](/assets/posts_img/suite_plus_button.png)

2. Fill in the following fields, select tests, and press **Add Tests** button.
- Suite name.
- Suite type.
- Suite enviroment.
![Create Suite](/assets/posts_img/create_suite_config.png)

### Step 5: How to copy test Suite
1. You can copy selected tests by pressing copy buttons in the ACTIONS section.
![Copy Tests](/assets/posts_img/copy_tests.png)

2. Name your test copy and press **Add** button.
![Copy Tests Name](/assets/posts_img/copy_tests_name.png)

### Step 6: How to config test Suite
1. You can edit the load configuration and test parameters by pressing the button to the left of the test name.
![Suite Configuration](/assets/posts_img/suite_configuration.png)

2. In the following example we added test parameter VUSERS and set it to 5. Also don't forget to click **Save** button, to save test Suite.
![Change Suite Parameters](/assets/posts_img/change_suite_parameters.png)

### Step 7: Execute test Suite
1. To execute your test Suite click on the triangle button on the Suite page.
![Execute Test Suite](/assets/posts_img/execute_test_suite.png)

2. You could also change your test configuration before test run. If all parameters are correct - just click **Run** button.
![Test suite config before run](/assets/posts_img/test_suite_config_before_run.png)

3. The suite execution status will appear in the Reports section.
![Suite Status](/assets/posts_img/suite_status.png)

### Step 8: Suite results
1. To open Suite results, just click on the result name.
![Suite Results Name](/assets/posts_img/suite_results_name.png)

2. In the opened page, you could open each test result details
![Suite Results Tests](/assets/posts_img/suite_results_tests.png)

3. There are 4 charts below: **Avg. throughput**, **Error rate**, **Responce time** and **Page speed**. You could select **tests** for them, **backend agregation** and **UI metric** from a top dropdown. Also you could chose between **categorical** and **time** variations for graphs and **zoom** each of them using magnifying glass button.
![Suite Results Graphs](/assets/posts_img/suite_results_graphs.png)
Zoomed graph:
![Suite Graphs Zoom](/assets/posts_img/suite_graph_zoom.png)

4. Next you could see a large graph with metrics from all tests from Suite.
![Suite Large Graph](/assets/posts_img/suite_large_graph.png)

5. At the bottom of the page there are summary tables for backend and UI test results.
![Suite Summary](/assets/posts_img/suite_summary.png)
