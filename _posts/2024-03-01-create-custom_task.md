
---
title:  Create Custom Tasks (AWS Lambdas) and Execute Using Carrier Platform
author: User
date: 2024-03-01 12:00:00 +0800
categories: [Performance, Tutorial, Tasks]
tags: [performance, backend, tasks, reporting]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to create custom tasks (AWS Lambdas) and execute them using Carrier Platform. With custom tasks, you can add additional functionality for processing and reporting test results. Additional information about Lambdas can be found [here](https://github.com/carrier-io/docker-lambda).

### Entrypoint and Parameters for Task

The Lambda function handler is the method in your function code that processes events. When your function is invoked, Lambda runs the handler method. Your function runs until the handler returns a response, exits, or times out. You can use the following general syntax when creating a function handler in Python:

```bash
def handler_name(event, context):
    ...
    return some_value
```

The Lambda function handler name specified when creating a Task in Carrier is derived from:

- The name of the file where the Lambda handler function is located.

- The name of the Python handler function.

A function handler can have any name; however, the default name in the Lambda console is 'lambda_function.lambda_handler'. This function handler name reflects the function name (lambda_handler) and the file where the handler code is stored (lambda_function.py).

The first argument for lambda handler is the event object. It contains all the parameters that you have specified for the task during task creation. An event is a JSON-formatted document that contains data for a Lambda function to process. The Lambda runtime converts the event to an object and passes it to your function code. It is usually of the Python dict type. It can also be list, str, int, float, or the NoneType type.

To read parameters from the event object in your function, you can use:

```bash
report_id = event.get("report_id")
project_id = event.get("project_id")
token = event.get("token")
some_parameter = event.get("some_parameter")
```

### Additional Requirements and Packaging

The official documentation from AWS you can find [here](https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-create-dependencies)

If your function requires non-standard Python libraries you need to specify them in requirements.txt file. Example you can find [here](https://github.com/carrier-io/control_tower/blob/master/package/requirements.txt). After that, you can build your Lambda function as a zip archive using instruction from official AWS documentation. Also, you can create a bash script to build lambda function using docker container + zip utility as shown below:

```bash
#!/bin/bash

mkdir lambda
# build all dependencies from requirements.txt
docker run --rm -v "$PWD":/var/task lambci/lambda:build-python3.7 pip install -r requirements.txt -t /var/task/lambda
# copy some additional code required by lambda function
cp -r perfreporter lambda/perfreporter
# copy template for email notification
cp -r templates lambda/templates
# copy lambda handler
cp post_processing.py lambda/post_processing.py
cd lambda
# create zip archive
zip jtl_to_excel.zip -r .
cp jtl_to_excel.zip ../
cd ..
rm -rf lambda
```

> **Note**: If you plan to use **Interceptor** ([Carrier Agent to the Carrier Platform](https://getcarrier.io/posts/add-interceptor)), you must set **CPU_CORES=2** in the interceptor configuration.
>
>This is essential because one CPU core will be allocated for running the performance test, and the other core will be used for post-processing. If only one core is allocated, the test will start, but the post-processing phase won't. Ensure that both cores are available for smooth task execution.
>
>Make sure that the interceptor version matches across configurations (e.g., `getcarrier/interceptor:latest` or another version you have installed). Mismatched versions, such as `getcarrier/interceptor:beta-1.0` and `getcarrier/interceptor:latest`, could cause inconsistencies in behavior and task execution.


### Create Task in Carrier

Follow these steps to create a Lambda task in Carrier Platform:

1. **Go to Configuration > Tasks Section**
   ![Tasks section](/assets/posts_img/tasks_section.png)

2. **Click the "+" Button** to start creating a new task.
   ![Tasks add_button](/assets/posts_img/tasks_add_button.png)

3. **Set Task Name and select Runtime**
   ![Tasks creation_part1](/assets/posts_img/tasks_creation_part1.png)

4. Upload your zip file with lambda function and specify lambda handler
   ![Tasks creation_part2](/assets/posts_img/tasks_creation_part2.png)

> **Note**: If you need to update an existing task with a new zip file, follow these steps:
>
> 4.1. Open 'Artifacts' tab, scroll down and find 'Bucket tasks'.
>
> 4.2. Drag and drop the updated zip archive with the same name. The 'Last update' date will change once the update is successful.
   ![Tasks creation_part4_1](/assets/posts_img/tasks_creation_part4_1.png)

5. **Add Parameters for your Task**
   ![Tasks creation_part3](/assets/posts_img/tasks_creation_part3.png)

  If using parameters from 'Secrets', follow these steps:

  5.1. Go to the 'Secrets' tab.

  5.2. Copy the parameter name.
![Tasks creation_part5_2](/assets/posts_img/tasks_creation_part5_2.png)

5.3. Paste it into the 'DEFAULT VALUE' column and add '*secret.*' before it.
![Tasks creation_part5_3](/assets/posts_img/tasks_creation_part5_3.png)

> **Note**: The parameters values shouldn't contain unnecessary spaces.

6. **Click 'Save' to create the Task**
   ![Tasks creation_part4](/assets/posts_img/tasks_creation_part4.png)

### Execute Task

To execute the task:

**Select the Task from the List** and click the Play button.
![Tasks execution_part1](/assets/posts_img/tasks_execution_part1.png)

**Check Logs in Runtime** at the bottom of the page.
![Tasks execution_part2](/assets/posts_img/tasks_execution_part2.png)
