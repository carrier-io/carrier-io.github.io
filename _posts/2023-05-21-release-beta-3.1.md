---
title: Release beta-3.1
author: User
date: 2023-05-21 12:00:00 +0800
categories: [Carrier, Release Notes]
tags: [carrier, releases, notes]
render_with_liquid: false
pin: true
---

## New Features & Enhancements

### Ticket Management Improvements

- Added ability to filter tickets by tag and by assignee.
- Added Board ID details in the UI for better traceability.
- Added default start and end dates for new tickets.
- Added ability to close individual ticket details in Engagement Ticket Tab.
- Added start date, end date, and delete button to Carrier Ticket View Edit.
- Added absolute links to tickets in Carrier Engagements.
- Enabled direct opening of reports from artifacts.
- Restricted Board Mapping Field to Status to prevent invalid mappings.
- Hid statistics panel on Engagement Config Page for a cleaner UI.
- Created user flow diagram for Carrier usage to help with onboarding.

### System & Process Enhancements

- Added timeout handling for Postprocessor and Container Tasks.
- Masked sensitive data in error table inside backend reports.

## Bug Fixes

### Ticket & Board Fixes

- Fixed issue where new tickets did not appear in the board.
- Fixed ticket status mismatch between Tickets UI and Board view.
- Fixed end date change issue in Carrier Ticket Details view.
- Fixed pagination issue in Tickets View in Engagements.
- Fixed issue where filter by status was not working in Tickets Tab.
- Fixed issue with creating or deleting boards from Tickets tab.
- Fixed issue where empty assignee list was shown when no assignee was selected.
- Fixed issue where risk ticket could be created without title.
- Fixed issue where engagement assignee could not be changed for created tickets.
- Fixed engagements module issues (general bug fixes).

### UI & Display Fixes

- Fixed misspelling of "In progress" on Board.
- Fixed incorrect status shown in "Tickets" view inside Engagement tab.
- Fixed incorrect summary view in Engagement Overview.
- Fixed incorrect month format display.
- Fixed bug where styled title saved with extra text.
- Fixed Board UI ticket column status override issue on Kanban board.

### Miscellaneous Fixes

- Fixed issue with removing uploaded attachment from created tickets.
- Fixed issue with building Docker containers for performance tests.