---
title: Release beta-3.1
author: User
date: 2023-05-21 12:00:00 +0800
categories: [Carrier, Release Notes]
tags: [carrier, releases, notes]
render_with_liquid: false
pin: true
---

# Release beta-3.1

## Engagement Improvements
- Fixed issue: Cannot change assignee for created ticket
- Corrected misspelling: "In progress" on Engagements Board

## Ticket Management Enhancements
- [Tickets] Fixed End Date Change Issue in Carrier Ticket Details View
- Corrected status display in "Tickets" view inside Engagement "Tickets" tab
- Resolved issue: New Tickets now appear in Board
- Fixed Bug: Ticket Status now consistent in Tickets UI and Board
- Added documentation about closed tickets not appearing on board
- [Scroll] Fixed Board UI Ticket Column Status Override Issue on Kanban Board
- [Ticket Detail] Added Start Date, End Date, and Delete Button in Carrier Ticket View Edit
- Fixed Pagination for Tickets View in Engagements
- Added Board Id details in UI
- Developed Web UI Button to Close Individual Ticket Details in Engagement Ticket Tab
- Fixed "Filter by Status" functionality in Tickets Tab
- Resolved title bug: styles no longer save with additional text
- Added Absolute Links to Tickets in Carrier Engagements
- Corrected Summary view in Engagement Overview
- Fixed: Can now remove uploaded Attachment in Created Ticket
- Corrected month format
- Added ability to filter tickets by tag
- Fixed bug: Risk Ticket created without title
- Added ability to filter by assignee
- Fixed empty assignee list when assignee is not selected
- Made end_date in ticket optional
- Implemented ability to Delete Board
- Removed Non-Activity Ticket Types from Engagements Board
- Restricted Board Selection to Engagements
- Restricted Board Mapping Field to Status
- Hidden Statistics Panel on Engagement Config Page
- Added Ability to Export and Import Boards Between Projects

## User Experience Improvements
- Created User Flow Diagram for Carrier Usage
- Added Default Value for Assignee Field: 'Not Assigned'
- Added Default Start and End Dates for New Tickets

## Performance and Build Improvements
- Fixed Issue with Building Docker Containers for Performance Tests

This release brings significant improvements to ticket management, engagement handling, and overall user experience. It addresses various bugs and introduces new features to enhance the functionality and usability of the Carrier platform.