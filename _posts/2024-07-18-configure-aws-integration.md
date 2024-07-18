---
title: Configure AWS Integration in Carrier
author: User
date: 2024-07-18 10:00:00 +0800
categories: [Performance, Tutorial, AWS, Integration]
tags: [performance, carrier, aws, configuration]
render_with_liquid: false
---

## Overview
This guide provides step-by-step instructions for configuring AWS integration in Carrier. AWS integration allows you to leverage Amazon Web Services for your performance testing needs.

### Prerequisites
Before you begin configuring AWS integration in Carrier, ensure that you have completed the following:
- [Installed and set up Carrier](https://getcarrier.io/posts/carrier-install) successfully or you have a Carrier account with the necessary permissions
- [Created a project in Carrier](https://getcarrier.io/posts/carrier-create-project)
- Have valid AWS access keys (direct link to the relevant section of the AWS documentation: [Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
> Note. Access keys consist of two parts: an `Access Key ID` (for example, AKIAIOSFODNN7EXAMPLE) and a `Secret Access Key` (for example, wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY). Below you must use both the Access Key ID and Secret Access Key together to authenticate your requests.

### Steps
Follow the steps below to configure AWS integration in Carrier:

#### Step 1: Access the Carrier Web Interface
1. Open a web browser and enter the URL of your Carrier installation.
2. Log in to the Carrier web interface using your credentials.
> Note: Make sure you have logged in using the appropriate user account that has access to the project where you want to configure AWS integration.

#### Step 2: Create AWS Secret Access Key in Secrets Section
1. Navigate to **Configuration** > **Secrets**.
2. Create a new secret with the name `<aws_secret_access_key>` and use the AWS `Secret Access Key` that you created/received at the stage of preparation for the implementation of these steps.

![Create AWS Secret](/assets/posts_img/aws_secret.png)

#### Step 3: Integrate with Amazon in the Clouds Block
1. Navigate to **Integrations** > **Clouds**.
2. Select integration with Amazon.

![Amazon Integration](/assets/posts_img/aws_integration.png)

#### Step 4: Fill in Required Fields and Update
1. Fill in the required fields such as
   - **`Access Key`** (insert `Access Key ID`),
   - **`Secret Access Key`** (insert secret with the name `<aws_secret_access_key>` wich was created in step 2),
   - **`Region`** (see below AWS Codes for Major Regions).
3. Click ‘Update’.
> Note: An orange status of “Check Connection” is acceptable if you specified the correct ‘Secret Access Key’ in the Secrets and ‘Access Key’.

![Check Connection](/assets/posts_img/aws_check_connection.png)

#### AWS Codes for Major Regions
- US East (N. Virginia): us-east-1
- US East (Ohio): us-east-2
- US West (N. California): us-west-1
- US West (Oregon): us-west-2
- Africa (Cape Town): af-south-1
- Asia Pacific (Mumbai): ap-south-1
- Asia Pacific (Seoul): ap-northeast-2
- Asia Pacific (Singapore): ap-southeast-1
- Asia Pacific (Sydney): ap-southeast-2
- Asia Pacific (Tokyo): ap-northeast-1
- Canada (Central): ca-central-1
- Europe (Frankfurt): eu-central-1
- Europe (Ireland): eu-west-1
- Europe (London): eu-west-2
- Europe (Paris): eu-west-3
- Europe (Stockholm): eu-north-1
- Middle East (Bahrain): me-south-1
- South America (Sao Paulo): sa-east-1
> Note: If no security group is specified, the instance will automatically be assigned a default security group.

![Connection Created](/assets/posts_img/aws_connection_created.png)

#### Step 5: Create or Use Existing Test Plan
1. Create a new test plan or use an existing one.
2. Open the test plan settings.

![Test Plan Settings](/assets/posts_img/test_plan_settings.png)

#### Step 6: Configure Load Settings
1. In the **Load configuration** block, select `Engine location`, `Type`, and `Instance type`.
2. Check other parameters of the test plan.
3. Click ‘Update’ or ‘Update And Start’.

![Load Configuration](/assets/posts_img/aws_load_configuration.png)

#### Step 7: Verify Settings in Debug Mode
1. Check in debug mode using control-tower to ensure all settings are correct.
2. Copy the execution config and run it from a local Linux machine with Docker installed.

![Docker Command](/assets/posts_img/docker_command_btn.png)

![Docker Command](/assets/posts_img/docker_command.png)

A link to the running test will appear in the results panel.
> Note: Verify that all settings have been made correctly to avoid any issues during the test run.

![Test Results Link](/assets/posts_img/test_results_link.png)

## Next Steps
Once you have configured AWS integration in Carrier, you can proceed to run your performance tests leveraging AWS resources.
