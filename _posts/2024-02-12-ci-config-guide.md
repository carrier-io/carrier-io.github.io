---
title:  Carrier Configure CI
author: User
date: 2024-02-12 12:00:00 +0800
categories: [Performance, Tutorial, CI]
tags: [performance, backend, ui-test, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to configire CI for execution tests in Carrier. By running your test in CI you can check performance of your application and identify any improvements or regressions.

### Prerequisites

Before you begin, make sure you have completed the following:

- Installed and set up Carrier successfully
- Created a project in Carrier (Please find the configuration guides by following the [link](https://getcarrier.io/categories/performance-tutorial/#page-category))

### Steps

Follow the steps below to run tests in CI using Carrier:

#### Step 1: Log in to Carrier

1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.

> Note: Make sure you have logged in using the appropriate user account that has access to the project where you want to configure the CI.
{: .prompt-info }

#### Step 2: Select the Project

1. From the project dropdown menu, select the desired project for which you want to configure the CI.
2. Click "Go!" to navigate to the project's configuration page.
![Select Project](/assets/posts_img/select_prj.png)

#### Step 3: Navigate to the "Performance" Tab

1. In the project configuration page, click on the "Performance" tab located in the left menu.
![Performance Dropdown](/assets/posts_img/performance_dropdown.png)
2. Select test type tab (`Backend` or `UI`, depends on which test you configured before).
![Navigate to Performance](/assets/posts_img/backend_and_ui_tab.png)

#### Step 4: Click on the more options button

1. In your configurated test, click on the more options button (3 dots menu) tab located in the right of the test section.
![3 Dots Menu](/assets/posts_img/3_dots_menu.png)

#### Step 5: Click on the Docker command button

1. Move the cursor to "Integrate with" option.
2. Click on the Docker command button.
![Docker Command Button](/assets/posts_img/docker_command_btn.png)

#### Step 6: Click on the Copy Command button

1. In the menu that appears, click on the Copy Command button
![Docker Command](/assets/posts_img/docker_command.png)

> Congratulations! Now you can use the copied command in your .yml files.
{: .prompt-info }

#### Step 7: Using Docker Command in .yml files

1. Template of .yml file for **GitHub Actions** (Put your Docker Command on the line 31):

```yml
name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - uses: actions/checkout@v3
      # Run the performance test using Carrier Docker container with the provided parameters
      - name: Performance_Test
        run: |
                # Intercept test break to reset folder chmod
                trap "sudo chmod -R 777 $GITHUB_WORKSPACE" SIGINT SIGTERM SIGKILL
              
                # PUT YOUR DOCKER COMMAND ON THE LINE 31 BELOW \/ \/ \/
                               
                sudo chmod -R 777 $GITHUB_WORKSPACE
```
2. Template of .yml file for **AzureDevOps Pipelines** (Put your pool name on the line 7 and your Docker Command on the line 28):

```yml
trigger:
- main

stages:
  - stage: Server_Side
    pool:
      name:  #PUT YOUR POOL NAME HERE
    dependsOn: []
    displayName: Performance_Test

    jobs:
      - job: PerfTest
        variables:
        timeoutInMinutes: 810 # Set a timeout of 810 mins to cancel the job automatically if it exceeds the limit
        displayName: PerfTest

        steps:
          # Run the performance test using Carrier Docker container with the provided parameters
          - task: Bash@3
            displayName: Run Test
            inputs:
              targetType: 'inline'
              script: |
                # Intercept test break to reset folder chmod
                trap "sudo chmod -R 777 $(Build.SourcesDirectory)" SIGINT SIGTERM SIGKILL
              
                # PUT YOUR DOCKER COMMAND ON THE LINE 28 BELOW \/ \/ \/          
                
                sudo chmod -R 777 $(Build.SourcesDirectory)
```
3. Template of .yml file for **GitLab Pipelines** (Put your Docker Command on the line 13):

```yml
stages:
  - test

lint-test-job:
  stage: test
  image: docker:19.03.12  # Use an image that has Docker installed
  services:
    - docker:19.03.12-dind  # Enable Docker-in-Docker
  before_script:
    - docker info  # Verify Docker was correctly installed
  script:
    - trap "sudo chmod -R 777 ${CI_PROJECT_DIR}" SIGINT SIGTERM SIGKILL
    - # PUT YOUR DOCKER COMMAND HERE
    - chmod -R 777 "${CI_PROJECT_DIR}"
```