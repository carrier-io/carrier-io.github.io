---
title: Perfmeter Guidelines
author: User
date: 2023-05-23 12:00:00 +0800
categories: [Performance, Toolset]
tags: [performance, jmeter, distribution, report, Docker]
render_with_liquid: false
---

# Introduction
Carrier customized JMeter container

## Extensions made:
* InfluxDB Listener automatically added to test for reporting
* Failed requests automatically reported to Loki and displayed in Grafana dashboard
* Post processing of execution logs issues into Jira/ReportPortal (Include failed requests, performance degradation compare to the baseline and missed thresholds)
* Post processing of execution metrics automatically logs aggregated states for build-to-build comparison
* Support of masterless distributed tests execution using control-tower and interceptor
* Grafana dashboard for jMeter and Comparison
* Docker tags and versioning

getcarrier/perfmeter:1.0 - Carrier PerfMeter release version 1.0
getcarrier/perfmeter:latest - bleeding edge, not recommended for production

## Quick start
These simple steps will run jMeter test against your application and generate html and jtl report.

1. Install docker
2. Start container and pass the necessary config options to container:
Example docker invocation:

```bash
docker run --rm -u 0:0 \
       -v <your_local_path_to_tests>:/mnt/jmeter/ \
       -v <your_local_path_to_config/config.yaml>:/tmp/ #optional
       -v <your_local_path_ to_reports>:/tmp/reports \   #optional
       -e "env=<env>" \  #optional, default - 'demo'
       -e "test_type=<test_type>" \  #optional, default - 'demo'
       -e "loki_host={{ http://loki }}" # loki host or IP
       -e "loki_port=3100" # optional, default 3100
       getcarrier/perfmeter:1.0 \
       -n -t /mnt/jmeter/<test_name>
       -q /mnt/jmeter/<properties_file> \    #optional
       -j /tmp/reports/jmeter_$(date +%s).log \   #optional
       -l /tmp/reports/jmeter_$(date +%s).jtl -e \  # optional
       -o /tmp/reports/HtmlReport_$(date +%s)/    #optional
```
where the following properties are available:
```bash
your_local_path_to_reports - path on your local filesystem where you want to store reports from this run
your_local_path_to_tests - path on your local filesystem where you store jMeter tests
test_type - optional tag, used to filter test results
env - optional tag, used to filter test results
loki_host - loki host or IP, used to report failed requests to Loki
loki_port - optional, default 3100
test_name - name of the JMeter test file that will be run
properties_file - properties file name (described below)
your_local_path_to_config/config.yaml - config.yaml file with InfluxDB, Jira, Loki and Report Portal parameters (described below)
```

```bash
your_local_path_to_reports - path on your local filesystem where you want to store reports from this run
your_local_path_to_tests - path on your local filesystem where you store jMeter tests
test_type - optional tag, used to filter test results
env - optional tag, used to filter test results
loki_host - loki host or IP, used to report failed requests to Loki
loki_port - optional, default 3100
test_name - name of the JMeter test file that will be run
properties_file - properties file name (described below)
your_local_path_to_config/config.yaml - config.yaml file with InfluxDB, Jira, Loki and Report Portal parameters (described below)

3. Open test report
Report is located in your your_local_path_to_reports folder

## Configuration
Tests can be configured using properties_file file.
Config file example (parameters.txt):

```bash
influx.port=8086
influx.db=jmeter
influx.host=carrier_influx
comparison_db=comparison
lg.id=debug
DURATION=20
VUSERS=5
RAMP_UP=1
test_name=test
project.id=demo
test.type=demo
env.type=demo
```
You can also pass parameters from the command line with the -J option. For example :
```bash
... -t /mnt/jmeter/<test_name> -JVUSERS=1 -JRAMP_UP=1 ...
```
