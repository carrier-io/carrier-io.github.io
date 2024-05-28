---
title:  Control-tower customisation
author: User
date: 2024-05-28 12:00:00 +0800
categories: [Performance, Tutorial]
tags: [carrier, cloud, instance-type, configuration]
render_with_liquid: false
---
 
## Overview
 
This guide outlines the steps required to change the instance type in Carrier's Control Tower, allowing for customization of resources to meet various performance and cost needs.
 
### Prerequisites
 
Before proceeding, ensure you have:
 
- Access to Carrier's GitHub repository.
- Administrative access to the Carrier installation platform.
 
### Step-by-Step Instructions
 
#### Step 1: Download Control Tower Configuration
 
Begin by downloading the latest `control-tower.zip` package from the official [Carrier repository](https://github.com/carrier-io/control_tower/blob/master/package/control-tower.zip).
 ![Download from git](/assets/posts_img/download_from_git.png)

#### Step 2: Extract the Package
 
After downloading, extract the `control-tower.zip` to a new folder. Once extraction is complete, delete the ZIP file to clean up your workspace.
 
![Download and Extract](/assets/posts_img/unzip_file.png)
 
#### Step 3: Modify Instance Type Configuration
 
1. Navigate to the extracted `control-tower` folder, then to the `\control_tower\cloud` directory.
![Navigate to folder](/assets/posts_img/navigate_to_folder.png)
2. Open the `aws.py` file and locate line 34.
3. Modify the `"InstanceType"` attribute to one of the following, depending on your requirements:
   - `t2.medium`
   - `t2.large`
   - `t2.xlarge`
   - `m5.large`
   - `m5.xlarge`
   - `m5.2xlarge`
   - `m5.4xlarge`
   - `m5.8xlarge`
   - `m5.12xlarge`
 
![Modify Instance Type](/assets/posts_img/aws_py.png)
 
#### Step 4: Repackage the Control Tower
 
Zip the `control-tower` folder again after making the necessary changes, preparing it for upload.
 ![Compress to ZIP](/assets/posts_img/compress_to_zip.png)
#### Step 5: Upload Modified Package
 
1. Navigate to the Carrier configuration portal at `https://${CARRIER_HOST}/-/configuration/artifacts/`.
2. Click **tasks**.
![Click tasks](/assets/posts_img/click_tasks.png)
3. Drag and drop the new `control-tower.zip` file into the appropriate section to upload it.
 
![Upload Configuration](/assets/posts_img/Drag_and_Drop.png)
 
#### Step 6: Deploy Changes
 
Deploy the new configuration through the Carrier portal to apply the changes.
 
#### Step 7: Run Your Tests
 
After deployment, run your tests to validate that the new instance type settings are functioning correctly.
 
 > You can use this [Carrier guide](https://getcarrier.io/posts/backend-test-configuration/#overview) to config yor first backend test
{: .prompt-info }
 
### Conclusion
 
By following these steps, you have successfully customized the instance type used by Carrier's Control Tower. This adjustment can lead to better performance and cost management based on your specific needs.
 
For further customization or troubleshooting, refer to the Carrier documentation or contact support.