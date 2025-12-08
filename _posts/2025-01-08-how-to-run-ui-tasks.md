---
title: How to run Tasks for UI tests in Carrier
author: User
date: 2025-01-08 12:00:00 +0200
categories: [Performance, Performance Tutorial]
tags: [performance, carrier, ui-test, configuration]
render_with_liquid: false
---
## Overview
This guide provides step-by-step instructions for executing Tasks for UI tests in Carrier. Tasks can extend test results processing capabilities, e.g. to generate reports in different formats or send emails. Tasks can be configured to suit your needs.

### Prerequisites
Before you begin executing Tasks for UI tests in Carrier, ensure that you have completed the following:
- Installed and set up Carrier successfully
- Created a project in Carrier
- Configured UI test
- Executed UI test test and got a results
- Created Task

> Note: You can find how to create a Task in the following [guide](https://carrier-io.github.io/posts/create-custom_task/).
{: .prompt-info }

### Steps
Follow the steps below to execute Tasks for UI tests:

#### Step 1: Access the Carrier Web Interface
1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

> Note: Make sure you have logged in using the appropriate user account that has all required accesses
{: .prompt-info }

#### Step 2: Select the Project
1. From the project dropdown menu, select the desired project where you want to run AI Analysis task.
![Select Project](/assets/posts_img/select_prj.png)
2. Click "Go!" to navigate to the project's configuration page.

#### Step 3: Navigate to the Performance Section
1. In the project configuration page, click on the "Performance" tab located in the left menu.
![Performance Dropdown](/assets/posts_img/performance_dropdown.png)
2. This will open the Performance section where you can click UI tab to define and manage your UI tests.
![UI Page](/assets/posts_img/ui_tab.png)

#### Step 4: Open UI Test
1. Click on the test name on the Results tab.
![UI Results Tab](/assets/posts_img/ui_results.png)
2. In the opened test results, click on the **Run Task** button.
![Run Task Button](/assets/posts_img/run_task_button.png)

#### Step 5: Run Task
1. In the opened menu click on the dropdown to select a task.
![Run Task](/assets/posts_img/run_task.png)

> Note: Please keep in mind that parameter **result_id** will automatically taken from your test and pasted into **report_id** as a default value.
{: .prompt-info }

2. After you chose the Task, you can edit some parameters or just click Run button.
![Run Task Button](/assets/posts_img/run_task_button_params.png)

#### Step 6: Check task execution
1. You can check task execution by navigate back to the Configuration page.
![Select Configuration Dropdown](/assets/posts_img/select_configuration_dropdown.png)
2. Click Tasks section.
![Tasks section](/assets/posts_img/tasks_section.png)
3. Select your task from tasks list. Here you can watch execution logs from task
![bp ai analysis](/assets/posts_img/bp_ai_analysis.png)
