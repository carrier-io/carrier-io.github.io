---
title:  Carrier Builds Comparison
author: User
date: 2023-07-28 12:00:00 +0800
categories: [Performance, Tutorial, SLA,SLO, SLI, Thresholds, Comparison, Baseline, NFRs]
tags: [performance, backend, comparison, notifications, verification, validation, quality gate]
render_with_liquid: false
---

## Configuring Performance Thresholds and Baselines in Carrier - Step-by-Step Guide

To efficiently configure performance thresholds and baselines in Carrier for your performance tests, follow these easy-to-use steps. 
Helps to reduct time of analysis by getting email notification with comparison to baseline and thresholds. 
Build status available inside backend tests table in Carrier UI. 

> Note: You need to configure Email integration inside the project first. Carrier has default templates for email notificaitons that can me overrided. You can upload youre own inside carrier "Email" integrations.
{: .prompt-info }


### Options for Thresholds and Baselines

- **Thresholds**: You can set thresholds for various performance metrics like throughput and response time. Define the threshold values based on your application's performance requirements and SLAs.

![Updated thresholds](/assets/posts_img/updated_thresholds.png)

1. All test `Error rate` threshold < 10 

> Note: Total error rate should be less than 10%. If more than 10 percent + deviation than build will be failed 
{: .prompt-info }


2. Individual `Response Time` threshold value to be less than 3 

> Note: Every requests resposne time should be lesss than 3 seconds.  If more than 3 seconds + deviation than build will be failed,
{: .prompt-info }

3. All test `Throughput` > 3 requests per seconds 

> Note: Total throughput should be more than 3 requests per seconds. If lesss than 3 requests + deviation than build will be failed  
{: .prompt-info }

- **Baseline**: Setting baselines allows you to compare test results against a predefined performance standard. Choose the appropriate baseline for your test to assess deviations from expected performance.

By following these steps and configuring thresholds and baselines, you can easily track the performance of your application and identify areas for improvement to deliver optimal user experiences.


### Step 0: Open Test Parameters

1. Open your test "Settings" with the desired name (e.g., "DemoWithTransactions").
2. Set or collect the following test parameters:
   - Test Type: Choose the appropriate test type (e.g., Validation).
   - Environment: Specify the environment for the test (e.g., Testing).
   
   ![Add Backend Test](/assets/posts_img/test_types_config.png)
   
   - VUSERS: Set the number of virtual users for the test.
   - EMAIL: Set the email REPORTERS -> Email -> Recipients addresses for the test
   
   ![Add Backend Test](/assets/posts_img/emial_recipients.png)


### Step 1: Set the baseline for comparison

1. Run "DemoWithTransactions" tests with parameters from the "Step 0: Open Test Parameters"
2. Set test run as a "Baseline"

   ![Add Backend Test](/assets/posts_img/Set_baseline.png)
   ![Add Backend Test](/assets/posts_img/baseline_1.png)
   ![Add Backend Test](/assets/posts_img/baseline_2.png)

### Step 2: Enable Baline QualityGate Checkbox

1. Open "DemoWithTransactions" test "Settings"
2. Turn on the PROCESSING -> QualityGate checkbox if enabled.
3. Activate Baseline checkbox
4. Expand the PROCESSING -> ADVANCED SETTINGS section.
5. Activate the "Summary results" checkbox.
6. Activate the "Per request results" checkbox.
7. Set "Check throughput"the deviation value (e.g., 5).
   ![Add Backend Test](/assets/posts_img/enable_comparison.png)

> Note: Deviation boxes used to specify acceptable level of differences to not fail the build.
{: .prompt-info }

### Step 3: Start the Test Run

1. Click on the "Update And Start" button at the top of the page to start the test run.
2. Check build status after the test 

   ![Add Backend Test](/assets/posts_img/build_status.png)

3. Check email notification 

   ![Add Backend Test](/assets/posts_img/status_email.png)


### Step 4: Get Test Metrics

1. After the test run is completed, you will receive an email with following test metrics comparison to Baseline:
   - Ttl (total requests)
   - Thrghpt (throughput total), req/sec
   - Error rate, %
   - Pct95 (response by 95th percentile max), seconds
   ![Chart Email](/assets/posts_img/summary_comparison.png)

2. Inside email review next metrics in comparison to Baseline:
   - Success Rate
   - RPS/TPS Rate (throughput)
   ![Chart Email](/assets/posts_img/chart_email.png)

### Step 5: Configure Thresholds

1. Navigate to the "Thresholds" panel in the Backend tab.
2. Click the "+" button to add a new threshold.
3. Fill in the data for the "Throughput" threshold:
   - Test: Enter the test name (e.g., "DemoWithTransactions").
   - Test Environment: Specify the environment (e.g., Testing).
   - Scope: Choose "All" to apply the threshold to all virtual users.
   - Target: Choose the target metric - Throughput.
   - Aggregation: Set the aggregation method - Maximum.
   - Comparison: Choose the comparison operator (e.g., >=)
   - Threshold Value: Set the threshold value for the target metric (e.g. 1).
   ![Throughput time](/assets/posts_img/throughput_threshold.png)
4. Fill in the data for the "Response Time" threshold:
   - Test: Enter the test name (e.g., "DemoWithTransactions").
   - Test Environment: Specify the environment (e.g., Testing).
   - Scope: Choose "Every" to apply the threshold to all virtual users.
   - Target: Choose the target metric - Response Time.
   - Aggregation: Set the aggregation method - "Percentile 95"
   - Comparison: Choose the comparison operator (e.g., <=).
   - Threshold Value: Set the threshold value for the target metric (e.g. 0.5).
   ![Response time](/assets/posts_img/response_time_threshold.png)
5. Click Save button
   ![Thresholds](/assets/posts_img/thresholds.png)

### Step 6: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.

### Step 7: Check the Test Result

1. Once the test is finished, check the test result in the Carrier UI.
2. Verify the status in the UI and the status in the letter to assess if the test meets the configured thresholds and baseline expectations.
   - Email summary
   ![Thresholds](/assets/posts_img/email_summary_1.png)
   - Build status
   ![Vuild](/assets/posts_img/build_status0.png)
   - Report status
   ![Vuild](/assets/posts_img/build_status1.png)

### Step 8: Update Thresholds

1. Set "Response Time" threshold value to be less than 3 

> Note: Every requests resposne time should be lesss than 3 seconds.  If more than 3 seconds + deviation than build will be failed,
{: .prompt-info }

2. Set "Error rate" threshold < 10 

> Note: Total error rate should be less than 10%. If more than 10 percent + deviation than build will be failed 
{: .prompt-info }

3. Set "Throughput" > 3 requests per seconds 

> Note: Total throughput should be more than 3 requests per seconds. If lesss than 3 requests + deviation than build will be failed  
{: .prompt-info }
   ![Updated thresholds](/assets/posts_img/updated_thresholds.png)

### Step 9: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.
2. Validate results 
   ![Updated thresholds](/assets/posts_img/updated_thresholds.png)


### Step 10: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.
2. Validate results 
   ![Updated thresholds](/assets/posts_img/validated_results.png)

### Step 11: Update Deviation

1. Open "DemoWithTransactions" test "Settings"
2. Expand the PROCESSING -> ADVANCED SETTINGS section.
3. Set "Check error rate"the deviation value to 5
   ![Add Backend Test](/assets/posts_img/enable_comparison.png)

### Step 12: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.
2. Validate results 
   ![Updated thresholds](/assets/posts_img/updated_thresholds.png)


### Step 13: Check the Test Result

1. Once the test is finished, check the test result in the Carrier UI.
2. Verify the status in the UI and the status in the letter to assess if the test meets the configured thresholds and baseline expectations.
   - Report status
   ![Vuild](/assets/posts_img/success_report.png)
      - Build status
   ![Vuild](/assets/posts_img/success_builds.png)