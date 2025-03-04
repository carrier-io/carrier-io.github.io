---
title: How to Increase Backend Test Results Retention in Carrier
author: User
date: 2025-01-20 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, backend-test, configuration]
render_with_liquid: false
---

## Overview

By default, Carrier saves the results of backend (API) tests execution for 30 days. This guide provides step-by-step instructions on how to increase the retention period for backend test results in Carrier.

### Prerequisites

Before you begin, ensure that you have:

- Installed and set up Carrier successfully.
- Access to a project in Carrier.

### Steps

Follow the steps below to increase the retention period for backend test results:

### Step 1: Open Your Carrier Project

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.
3. From the project dropdown menu, select the desired project.
4. Click "Go!" to navigate to the project's configuration page.

### Step 2: Access the Configuration Section

1. At the top left corner, select "Configuration" from the dropdown menu.
![Select Configuration Dropdown](/assets/posts_img/select_configuration_dropdown.png)

### Step 3: Navigate to the Secrets Tab

1. Select the "Secrets" tab from the top menu.
![Secrets Option](/assets/posts_img/secrets_option.png)

### Step 4: Locate the Retention Setting

1. Look for the secret named `backend_performance_results_retention`.

### Step 5: Edit the Retention Value

1. Press the "edit" icon to the right of the secret name.
![Edit Secret](/assets/posts_img/edit_secret.png)
2. Type the numeric value in days for how long you would like Carrier to store historical data of backend tests execution.
3. Click the "Save" button.
![Save Secret](/assets/posts_img/save_secret.png)

### Step 6: Verify the Updated Value

1. Check that the value has been updated by clicking on the "eye" icon to the right of the secret name.
![View Secret](/assets/posts_img/view_secret.png)

By following these steps, you can increase the retention period for backend test results in Carrier, ensuring that historical data is stored for the desired duration.