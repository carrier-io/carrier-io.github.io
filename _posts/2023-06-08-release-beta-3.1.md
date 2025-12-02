---
title: Release beta-3.1
author: User
date: 2023-06-08 12:00:00 +0800
categories: [Carrier, Release Notes]
tags: [carrier, releases, notes]
render_with_liquid: false
pin: true
---

# Release beta-3.1

## New Features & Enhancements

### Ticket Management & Kanban Boards

1. Added ability to filter tickets by tag and assignee.
2. Introduced export and import functionality for boards between projects.
3. Added Board ID details in the UI for better traceability.
4. Implemented a button to close individual ticket details in the Engagement Ticket Tab.
5. Added absolute links to tickets in Carrier Engagements for easier navigation.
6. Added default values for assignee, start date, and end date fields in new tickets.
7. Added ability to filter tables on backend and UI performance test pages.

### Performance Testing & Reporting

1. Enabled direct opening of reports from artifacts.
2. Added timeout handling for postprocessor and container tasks.
3. Updated JMeter listener to store request body in error logs.
4. Added ability to get JMeter log file in perfmeter.
5. Added additional tag to test report if it runs as control tower container.

### Scheduling & Automation

1. Improved test execution to trigger only by schedule.
2. Fixed schedule execution to align with cron timers in test configurations.

## Bug Fixes

### Ticket & Board Issues

1. Fixed issue where new tickets did not appear on the board.
2. Resolved problem with changing assignee for created tickets.
3. Fixed end date change issue in Carrier Ticket Details View.
4. Corrected status mismatches between Tickets UI and Board.
5. Fixed pagination for tickets view in Engagements.
6. Fixed UI ticket column status override issue on Kanban Board.
7. Fixed bug where risk ticket could be created without a title.
8. Fixed empty assignee list when none is selected.
9. Fixed inability to create board from Tickets tab and delete boards.
10. Fixed title bug where styled text saved with additional text.
11. Fixed inability to remove uploaded attachments in created tickets.
12. Fixed incorrect month format in date fields.
13. Fixed filter by status not working in Tickets Tab.
14. Fixed bug with engagements and board mapping field restrictions.

### Performance Test & Reporting

1. Fixed issues with building Docker containers for performance tests.
2. Fixed missing errors in performance test reports.
3. Fixed issue with test logs after test completion.
4. Fixed control-tower JUnit reporter and ensured report availability in pipeline.
5. Fixed control-tower container to not create a report if there are no workers.
6. Fixed bug where Control Tower could get stuck indefinitely during API calls.
7. Investigated and addressed potential memory leak in Pylon container.
