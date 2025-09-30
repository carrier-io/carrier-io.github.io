---
title: Running Performance Tests with Control-Tower
author: User
date: 2025-09-30 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, control-tower, jmeter, gatling, docker]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for running performance tests using the Control-Tower container in Carrier. You can execute JMeter and Gatling tests, override test parameters, and retrieve JUnit reports using Docker.

### Prerequisites

Before you begin, ensure you have:
- Installed Docker on your machine
- Access to Carrier and a valid project
- Project secrets: `project_id`, `galloper_url`, and `token`
- Created a test in Carrier's test planner

## Running JMeter Tests

To run a JMeter test using Control-Tower, use the following command:

```zsh
docker run -e project_id=${project_id} -e galloper_url=https://platform.getcarrier.io -e token=some_token -d getcarrier/control_tower:latest --test_id=${test_id} -e '{"cmd": "-JVUSERS=7 -JDURATION=60"}'
```

**Override JMeter Parameters:**
- Use the `-e '{"cmd": "-J<param>=<value> ..."}'` format to override test parameters.
- Example: `-JVUSERS=7 -JDURATION=60` sets the number of users and test duration.

## Running Gatling Tests

To run a Gatling test using Control-Tower, use the following command:

```zsh
docker run -e project_id=${project_id} -e galloper_url=https://platform.getcarrier.io -e token=${token} -d getcarrier/control_tower:latest --test_id=${test_id} -e '{"GATLING_TEST_PARAMS": "-Dtest_type=custom_type -Denv_type=custom_env -DvUsers=10 -Dduration=90"}'
```

**Override Gatling Parameters:**
- Use the `-e '{"GATLING_TEST_PARAMS": "-D<param>=<value> ..."}'` format to override test parameters.
- Example: `-DvUsers=10 -Dduration=90` sets the number of users and test duration.

## Retrieving JUnit Reports

To get a JUnit report after test execution, mount a local folder to the container:

```zsh
docker run -v /reports:/tmp/reports -e project_id=${project_id} -e galloper_url=https://platform.getcarrier.io -e token=${token} -d getcarrier/control_tower:latest --test_id=${test_id} -e '{"GATLING_TEST_PARAMS": "-Dtest_type=custom_type -Denv_type=custom_env -DvUsers=10 -Dduration=90"}'
```

- The `/reports` folder on your host will contain the JUnit report after the test completes.
- Use the same approach for JMeter tests if you need to collect reports.

## Tips
- You can override any test parameter using the appropriate format for JMeter (`-J`) or Gatling (`-D`).
- Make sure your test is properly configured in Carrier's test planner before running.

---
For troubleshooting and advanced configuration, see other guides in the Performance category.
