---
title: Configure Email Notifications in Carrier with SendGrid
author: User
date: 2024-07-17 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, carrier, email, notifications, sendgrid]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions for configuring email notifications in Carrier using SendGrid. Email notifications help you stay informed about test results and other important updates.

### Prerequisites

Before you begin, ensure that you have the following:

- A Carrier account with the necessary permissions
- A SendGrid account (create one if you don't have it)

### Steps

Follow the steps below to set up email notifications in Carrier with SendGrid:

#### Step 1: Open SendGrid and Log In

1. Open the [SendGrid](https://sendgrid.com/) page.
2. Log in using your credentials. If you don’t have a Twilio account, go to the sign-up page and create a new account.

   <p align="center"> <img src="https://github.com/user-attachments/assets/999ebbd7-9b10-45d8-a0f8-6ef059abf79b" width="400"> </p>

#### Step 2: Create Sender Identity

1. Click on the "Create sender identity" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/e52475f9-b7b3-4b85-a1f7-62ae178b7c1d" width="800"> </p>

#### Step 3: Fill Required Fields

1. Fill in all the required fields and click on the "Create" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/a4897abd-8a50-49df-b1b9-4974de459adc" width="450"> </p>

#### Step 4: Verify Sender Identity

1. After submitting the sender's details, a verification email will be sent. Click on the "Verify Single Sender" button.
2. Check if the sender verification was successful.

   <p align="center"> <img src="https://github.com/user-attachments/assets/5616eeca-96f7-4381-8948-e55ed9689e1a" width="800"> </p>

#### Step 5: Configure SMTP Relay

1. Open the Integration Guide page on SendGrid.
2. Click on the "SMTP Relay" option.

   <p align="center"> <img src="https://github.com/user-attachments/assets/b8b23883-e381-4ba5-8482-93c1963abc2e" width="800"> </p>

#### Step 6: Create API Key

1. Add an API key name and click on the "Create Key" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/5756f739-d18a-4a5f-b40c-6f5be6ddf98a" width="800"> </p>

#### Step 7: Save API Key

1. Save the value of the created API key.
2. Click on the "I’ve updated my settings" checkbox and then click on the "Next: Verify Integration" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/f68207e1-e2f0-4ed8-9a4f-3d90779756e6" width="800"> </p>

#### Step 8: Configure Carrier Email Integration

1. Open the Integrations tab in Carrier and scroll down to the Email configuration section.
2. Click on the "Add Email" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/62d0ab5f-0151-41da-984c-69923c3745f4" width="700"> </p>

#### Step 9: Fill in Carrier Email Configuration

1. Fill in all the required fields, including the password and sender information, and click on the "Update" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/17c946cf-7e03-45f9-8329-92630c9cdce0" width="400"> </p>

#### Step 10: Test Email Integration

1. Run a test by adding the configured Email integration and recipients.
2. Once the post-processing has started, return to SendGrid and click on the "Verify Integration" button.

   <p align="center"> <img src="https://github.com/user-attachments/assets/29fd235e-a3f9-498f-8139-f44bebd52d1f" width="600"> </p>
   <p align="center"> <img src="https://github.com/user-attachments/assets/8de74720-e000-4aba-8abe-5cad15fc1ef1" width="600"> </p>

If everything is done correctly, the integration is configured, and you will receive an email notification.

<p align="center"> <img src="https://github.com/user-attachments/assets/6b259ca6-5ee7-4c29-9dac-69b9e584e45b" width="600"> </p>

## Next Steps

Explore other integrations and configurations in Carrier to enhance your performance testing workflows.
