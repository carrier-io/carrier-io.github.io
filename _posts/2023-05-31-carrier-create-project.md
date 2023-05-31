---
title: Create a Project in Carrier
author: User
date: 2023-05-31 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, project, configuration]
render_with_liquid: false
---

## Overview

This guide will walk you through the process of creating a project in Carrier. Follow the steps below to get started.

### Step 1: Log in to Carrier

Once you have accessed the Carrier platform, you will be greeted with a page indicating that no projects have been created yet.

![Carrier Login Page](/assets/posts_img/main_page.png)

### Step 2: Add a Project

Click on the plus sign icon to add a new project. In the dialog box that appears, enter the name of your project and click "Create".

![Add Project](/assets/posts_img/plus_project.png)

Set a name for your project and provide an email address for the new user (e.g., `noreply@noreply.com`). Then, click "Create" to proceed.

![Set Project Name](/assets/posts_img/set_name_prj_new.png)

### Step 3: Project Creation

Wait for the project creation process to complete.

![Project Creation](/assets/posts_img/created_test.png)

> To check for any errors during the creation process, monitor the `carrier-pylon` logs.
{: .prompt-info }

```bash
$ docker logs -f carrier-pylon
```

### Step 4: Log Out

Once the project has been successfully created, you can log out of the current session. Click on the user icon and select "Logout".

![Logout](/assets/posts_img/logout_admin.png)

### Step 5: Log in with New User Credentials

Log in again using the email address specified during project creation (e.g., `noreply@noreply.com`) and the temporary password `11111111`.

### Step 6: Set New Password

Set a new password for the user account. Enter the desired password and click "Submit".

![Set New Password](/assets/posts_img/set_pwd.png)

### Step 7: Select the Project

After logging in, select the desired project from the dropdown menu and click "Go!".

![Select Project](/assets/posts_img/select_prj.png)

### Step 8: Project Configuration

Once you have selected the project, you will be redirected to the project configuration page. Here, you can access various settings and configurations for your project.

![Project Configuration](/assets/posts_img/home_page.png)

### Step 9: Navigate to Performance

To start configuring performance tests, navigate to the "Performance" tab.

![Navigate to Performance](/assets/posts_img/select_performance.png)

### Step 10: Performance Test Runs

In the performance section, you will see the latest test runs and performance metrics.

![Performance Test Runs](/assets/posts_img/performance_screen.png)

### Step 11: Add a New Test

To add a new test, select the "Backend" tab.

![Add New Test](/assets/posts_img/backend_view.png)

> Congratulations! You have successfully created a project in Carrier and can now begin configuring and running tests.
{: .prompt-info }

## Next Step: Changing the Default Passwords

Follow the guide on [how to change default Admin passwords in Carrier and Keycloak](http://getcarrier.io/posts/change-passwords/) to get started.

### Additional: Creating a Project for Carrier Admin User

1. Log in as the "admin" user.
2. Create a new project and set the email

 as "admin@centry.user" (the default admin email).

   ![Create Admin Project](/assets/posts_img/created_admin_project.png)

   ![Admin Project](/assets/posts_img/craeted_admin_2.png)

3. Once the project is created, switch to "Project" mode.

   ![Switch to Project Mode](/assets/posts_img/admin_select_prj.png)

4. You will be redirected to the project configuration page.

   ![Admin Project Configuration](/assets/posts_img/demo_prj.png)

