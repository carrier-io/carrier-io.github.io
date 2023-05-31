---
title: Changing the default passwords
author: User
date: 2023-05-31 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, project, configuration]
render_with_liquid: false
---

## Overview
This guide provides step-by-step instructions for setting the admin passwords for Carrier platform and Keycloak admin users.
By following these steps, you can update the default credentials to enhance the security of your Carrier installation.

> Please find the default `KEYCLOAK_USER` and `KEYCLOAK_PASSWORD` values in the `.env` file.
{: .prompt-info }

```bash
cat /opt/centry/.env | grep KEYCLOAK
```

## Updating Carrier Admin

1. Open a web browser and navigate to the following URL: `http://<public DNS or IP>/auth`

    ![Keycloak Login](/assets/posts_img/keycloak_panel_auth.png)

2. Click on "Administration Console".

    ![Keycloak Admin Console Login](/assets/posts_img/login_keycloak.png)

3. Log in to the Keycloak application using the `KEYCLOAK_USER` account.

    ![Keycloak Admin Console](/assets/posts_img/after_login_keycloak.png)

4. Select "Users" from the sidebar menu.

    ![Keycloak Users](/assets/posts_img/keycloak_users.png)

5. Click on "View all users".

6. Select the "Edit" button for the "admin" user.

    ![Keycloak Edit User](/assets/posts_img/admin_keycloak.png)

8. Navigate to the "Credentials" tab.

    ![Keycloak Credentials](/assets/posts_img/admin_cred_keycloak.png)

9. Set a strong and secure password for the admin account and click "Reset Password".

    ![Keycloak Reset Password](/assets/posts_img/reset_pwd_keycloak.png)

11. Ensure it is updated successfully.

    ![Keycloak Password Updated](/assets/posts_img/pwd_updated_keycloak.png)

## Updating Keycloak Admin

1. Access the Keycloak admin console using the `KEYCLOAK_USER` account.

2. Navigate to the admin user profile.

    ![Keycloak Admin User Profile](/assets/posts_img/manage_account_keycloak.png)

3. Select "Manage Account" to update the password and click on it.

    ![Keycloak Admin User Menu](/assets/posts_img/menu_admin_keycloak.png)

4. Select "Passwords".

    ![Keycloak Change Password](/assets/posts_img/change_pwd_keycloak.png)

5. Set a new password for the admin account.

6. Save the changes and verify that the admin password is successfully updated.

    ![Keycloak Admin Password Changed](/assets/posts_img/changed_admin_pwd_keycloak.png)

> Congratulations! You have successfully changed the default passwords!
{: .prompt-info }
