---
title: Analyze and Compare Test Runs in Carrier
author: User
date: 2023-06-01 12:00:00 +0800
categories: [Performance, Performance Tutorial]
tags: [performance, carrier, analysis, comparison]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to analyze and compare test runs in Carrier. By comparing test runs, you can gain insights into the performance of your application and identify any improvements or regressions.

### Prerequisites

Before you begin, make sure you have completed the following:

- Successfully executed test runs in Carrier
- Access to the Carrier web interface

### Steps

Follow the steps below to analyze and compare test runs in Carrier:

#### Step 1: Run a Test

1. Execute a test in Carrier following the steps outlined in the "Configure Backend Test in Carrier" guide.
2. Wait for the test run to complete.

![Test Run in Carrier](/assets/posts_img/test_run_fin_backend.png)

#### Step 2: Open the "Backend" Tab

1. Click on the "Backend" tab in the left menu.
![Select Backend Tab](/assets/posts_img/select_test_backend.png)

#### Step 3: Open the Test in the "Results" Table

1. Locate the test run you want to analyze in the "Results" table.
2. Click on the test name to open the detailed results page.

#### Step 4: Set the Test Run as a Baseline

1. In the detailed results page, click on the "Set as a Baseline" button.
![Set Baseline](/assets/posts_img/set_baseline_report_backend.png)

2. This will mark the selected test run as a baseline for future comparisons.

#### Step 5: Run the Same Test Again

1. Execute the same test again in Carrier.
2. Wait for the test run to complete.

#### Step 6: Open the "Analysis" Tab

1. Navigate to the "Analysis" tab in the Carrier web interface.
![Open Analysis Tab](/assets/posts_img/analysis_tab_backend.png)

#### Step 7: Select the Test in the "Test" Filter

1. In the "Test" filter section, select the name of the test you want to analyze from the dropdown menu.

#### Step 8: Select Two Tests to Compare

1. In the "Reports" section, select the two test runs you want to compare by clicking on the checkboxes next to their names.
![Select Tests to Compare](/assets/posts_img/compare_selec_backend.png)
2. Click on the "Compare" button to proceed.
![Comparison View](/assets/posts_img/comparison_view_backend.png)

#### Step 9: Navigate to the "Comparison Builder"

1. In the "Comparison Builder" section, find the "Data Filter" option.
2. Here, you will see comparison graphs based on the selected filter.

#### Step 10: Select Data to Compare in the "Data Filter" Section

1. In the "Data Filter" section, click on the "Add" button.
![Comparison View](/assets/posts_img/comparison_view_backend.png)
2. Select the specific data you want to compare, such as response time, throughput, or error rate.
3. Click "Apply" to save the data filter.
![Comparison Summary](/assets/posts_img/comparison_summary_backend.png)

#### Step 11: Select Metrics to Use for Comparison

1. In the "Metrics" section, select the metrics you want to use for the comparison.
2. You can choose multiple metrics to analyze.
3. Click "Apply" to save the selected metrics.

#### Step 12: Analyze the Data

1. The comparison results will be displayed in charts and tables in the "Analysis" tab.
2. Analyze the data to identify any performance improvements or regressions between the test runs.
3. You can further customize the analysis by adjusting the data filters, metrics, and visualization options.

> Congratulations! You have successfully analyzed and compared test runs in Carrier. Use the insights gained from the comparison to optimize the performance of your application.
{: .prompt-info }

## Next Steps

After analyzing and comparing test runs, you may want to take further actions based on the insights obtained. This can include fine-tuning your application, optimizing performance, or implementing fixes for any identified issues.
