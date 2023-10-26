---
title:  Carrier Configure Test Schedule
author: User
date: 2023-10-25 12:00:00 +0800
categories: [Performance, Tutorial, Schedule]
tags: [performance, backend, ui-test, configuration, notifications]
render_with_liquid: false
---

## Configuring schedules for tests - Step-by-Step Guide

This guide provides step-by-step instructions for configuring schedules for test in Carrier. Scheduled tests for performance testing allow us to simulate peak user load during specific times, providing insights on how the system responds and behaves under pressure, thus ensuring it can handle real-world conditions.

### Prerequisites

Before you begin configuring a Backend test in Carrier, ensure that you have completed the following:

- Installed and set up Carrier successfully
- Created a project in Carrier
- Configured UI or Beckend test (Please find useful guides about it here: [Performance Tutorial](https://getcarrier.io/categories/performance-tutorial/))

### Steps

Follow the steps below to configure schedules for tests in Carrier:

#### Step 1: Log in to Carrier

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

> Note: Make sure you have logged in using the appropriate user account that has access to the project where you want to configure schedule for performance test.
{: .prompt-info }

#### Step 2: Select the Project

1. From the project dropdown menu, select the desired project where you want to configure schedule for performance test.
2. Click "Go!" to navigate to the project's configuration page.

#### Step 3: Navigate to the "Performance" Tab

1. In the project configuration page, click on the "Performance" tab located in the left menu.
![Performance Dropdown](/assets/posts_img/performance_dropdown.png)
2. Select test type tab (`Backend` or `UI`, depends on which test you configured before).
![Navigate to Performance](/assets/posts_img/backend_and_ui_tab.png)

#### Step 4: Configure schedule for Performance Test

1. Open test settings, click on the 3 dotted icon and next click "Settings" tab.
![Test settng](/assets/posts_img/how_to_open_test_settings.png)
2. In the Update Test menu, scroll down to the bottom of the page and press the `Add schedule` button.
![Add schedule button](/assets/posts_img/add_schedule_button.png)
3. In the menu that appears, enter the name of the schedule, for example `DemoSchedule`
![Demo Schedule](/assets/posts_img/schedule_name.png)
4. You can set when tests will run using 4 ready-made options: Daily, Weekly, Monthly, Yearly. In this case, your current time will be selected as the test start time.
![Time set](/assets/posts_img/time_set_daily.png) 
5. If you want to configure the test with a different schedule, you need to choose Custom option and use the crontab expression. For example, if you want to run tests every 4 hours, you should use `0 */4 * * *` crontab expression. You can learn more about the crontab expressions by the [link](https://crontab.guru/). 
![Crontab expression](/assets/posts_img/crontab_exp.png)
6. To add parameters to a scheduled test, click the Add parameters button.
![Add schedule parameter](/assets/posts_img/add_schedule_parameter.png)
![Test parameters schedlue](/assets/posts_img/test_parameters_schedlue.png)
7. To disable running scheduled tests, click on the slider in the upper right corner.
![Slider disables schedule](/assets/posts_img/disable_running_scheduled_tests.png)
8. If you want to delete the test schedule you can click the recycle bin icon.
![Delete test schedule](/assets/posts_img/delete_test_schedule.png)
9. If you want to save the test schedule you can click the Update button.
![Update schedule test](/assets/posts_img/update_schedule_test.png)

> Congratulations! You have successfully configured scheduled performance test in Carrier.
{: .prompt-info }