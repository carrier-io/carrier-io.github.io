---
title: Create a Project in Carrier
author: User
date: 2023-05-30 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [performance, project, configuration]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to create a project in Carrier.
It includes screenshots to help you navigate through the process and highlights key steps to follow.

## How to Create a Project in Carrier

1. Once you log in to Carrier, you will see a page indicating that there are no projects created yet.

    ![Carrier after login](/assets/posts_img/main_page.png)

2. Click on the person logo in the top right corner and select "Administration" to switch to Administration mode and create your first project.

    ![Carrier select admin](/assets/posts_img/select_admin.png)

3. Click on the plus sign to add the project. Set the name of your project and click "Create".

    ![Carrier plus btn](/assets/posts_img/plus_project.png)

    Set the name for your project in the dialog box and click "Create".

    ![Carrier set name](/assets/posts_img/set_name_prj_new.png)

4. Your project will be created. It might take around 1 minute. You can track the process of project creation in the carrier-pylon logs to ensure that there are no errors. Open a terminal and run the following command:

    ```bash
    $ docker logs -f carrier-pylon
    ```

5. Once the project is created, you can switch back to Project mode.

    ![Carrier project mode](/assets/posts_img/project_mode.png)

    You will be redirected to the Project configuration page.

    ![Carrier demo](/assets/posts_img/demo_prj.png)

6. To start configuring tests, navigate to the required sections, either Performance or Security, using the left menu dropdown list.

    ![Carrier menu](/assets/posts_img/dropdown.png)

    In the Performance section, you can configure performance tests.

    ![Carrier performance](/assets/posts_img/perf_screen.png)

---

