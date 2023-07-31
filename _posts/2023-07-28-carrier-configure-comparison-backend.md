---
title:  Carrier Builds Comparison
author: User
date: 2023-07-28 12:00:00 +0800
categories: [Performance, Tutorial, SLA, SLO, SLI, Thresholds, Comparison, Baseline, NFRs]
tags: [performance, backend, comparison, notifications, verification, validation, quality gate]
render_with_liquid: false
---

## Configuring Performance Thresholds and Baselines in Carrier - Step-by-Step Guide

To efficiently configure performance thresholds and baselines in Carrier for your performance tests, follow these easy-to-use steps. This will help reduce the time of analysis by getting email notifications with comparisons to baselines and thresholds. The build status is available inside the backend tests table in the Carrier UI.

> Note: You need to configure Email integration inside the project first. Carrier has default templates for email notifications that can be overridden. You can upload your own inside Carrier "Email" integrations.
{: .prompt-info }

### Options for Thresholds and Baselines

- **Thresholds**: Set thresholds for various performance metrics like throughput and response time. Define the threshold values based on your application's performance requirements and SLAs.

![Updated thresholds](/assets/posts_img/updated_thresholds.png)

1. All test `Error rate` threshold < 10 

> Note: Total error rate should be less than 10%. If more than 10 percent + deviation than build will fail.
{: .prompt-info }

2. Individual `Response Time` threshold value to be less than 3 

> Note: Every request's response time should be less than 3 seconds. If more than 3 seconds + deviation than build will fail.
{: .prompt-info }

3. All test `Throughput` > 3 requests per second 

> Note: Total throughput should be more than 3 requests per second. If less than 3 requests + deviation than build will fail.
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

1. Run "DemoWithTransactions" tests with parameters from "Step 0: Open Test Parameters".
2. Set the test run as a "Baseline".
   ![Set Baseline](/assets/posts_img/Set_baseline.png)
   ![Baseline](/assets/posts_img/baseline_1.png)
   ![Baseline](/assets/posts_img/baseline_2.png)

### Step 2: Enable Baseline QualityGate Checkbox

1. Open the "DemoWithTransactions" test "Settings".
2. Turn on the PROCESSING -> QualityGate checkbox if enabled.
3. Activate the Baseline checkbox.
4. Expand the PROCESSING -> ADVANCED SETTINGS section.
5. Activate the "Summary results" checkbox.
6. Activate the "Per request results" checkbox.
7. Set the "Check throughput" deviation value (e.g., 5).
   ![Enable Comparison](/assets/posts_img/enable_comparison.png)

> Note: Deviation boxes are used to specify the acceptable level of differences to not fail the build.
{: .prompt-info }

### Step 3: Start the Test Run

1. Click on the "Update And Start" button at the top of the page to start the test run.
2. Check the build status after the test.
   ![Build Status](/assets/posts_img/build_status.png)
3. Check the email notification.
   ![Status Email](/assets/posts_img/status_email.png)

### Step 4: Get Test Metrics

1. After the test run is completed, you will receive an email with the following test metrics comparison to the Baseline:
   - Ttl (total requests)
   - Thrghpt (throughput total), req/sec
   - Error rate, %
   - Pct95 (response by 95th percentile max), seconds
   ![Summary Comparison](/assets/posts_img/summary_comparison.png)
2. Inside the email, review the next metrics in comparison to the Baseline:
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
   ![Throughput Threshold](/assets/posts_img/throughput_threshold.png)
4. Fill in the data for the "Response Time" threshold:
   - Test: Enter the test name (e.g., "DemoWithTransactions").
   - Test Environment: Specify the environment (e.g., Testing).
   - Scope: Choose "Every" to apply the threshold to all virtual users.
   - Target: Choose the target metric - Response Time.
   - Aggregation: Set the aggregation method - "Percentile 95"
   - Comparison: Choose the comparison operator (e.g., <=).
   - Threshold Value: Set the threshold value for the target metric (e.g. 0.5).
   ![Response Time Threshold](/assets/posts_img/response_time_threshold.png)
5. Click the Save button.
   ![Thresholds](/assets/posts_img/thresholds.png)

### Step 6: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.

### Step 7: Check the Test Result

1. Once the test is finished, check the test result in the Carrier UI.
2. Verify the status in the UI and the status in the letter to assess if the test meets the configured thresholds and baseline expectations.
   - Email Summary
   ![Email Summary](/assets/posts_img/email_summary_1.png)
   - Build Status
   ![Build Status](/assets/posts_img/success_builds.png)
   - Report Status
   ![Report Status](/assets/posts_img/success_report.png)

### Step 8: Update Thresholds

1. Set the "Response Time" threshold value to be less than 3 

> Note: Every request's response time should be less than 3 seconds.  If more than 3 seconds + deviation than the build will fail.
{: .prompt-info }

2. Set the "Error rate" threshold < 10 

> Note: Total error rate should be less than 10%. If more than 10 percent + deviation than the build will fail.
{: .prompt-info }

3. Set the "Throughput" > 3 requests per second 

> Note: Total throughput should be more than 3 requests per second. If less than 3 requests + deviation than the build will fail.
{: .prompt-info }

   ![Updated Thresholds](/assets/posts_img/updated_thresholds.png)

### Step 9: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.
2. Validate results 
   ![Updated Thresholds](/assets/posts_img/validated_results.png)

### Step 10: Update Error Deviation

1. Open the "DemoWithTransactions" test "Settings".
2. Expand the PROCESSING -> ADVANCED SETTINGS section.
3. Set the "Check error rate" deviation value to 5
   ![Enable Comparison](/assets/posts_img/enable_comparison.png)

### Step 11: Start the Test Run Again

1. Click on the "Update And Start" button at the top of the page to start the test run again.
2. Validate results 
   ![Updated Thresholds](/assets/posts_img/updated_thresholds.png)

### Step 12: Check the Test Result

1. Once the test is finished, check the test result in the Carrier UI.
2. Verify the status in the UI and the status in the letter to assess if the test meets the configured thresholds and baseline expectations.
   - Report Status
   ![Report Status](/assets/posts_img/success_report.png)
   - Build Status
   ![Build Status](/assets/posts_img/success_builds.png)
