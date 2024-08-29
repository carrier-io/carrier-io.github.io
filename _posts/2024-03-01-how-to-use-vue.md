---
title: Guide on How to Use Vue.js in Carrier UI
author: User
date: 2024-08-29 12:00:00 +0800
categories: [Performance, UI, guide]
tags: [ui, vue.js]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to use Vue.js in a Carrier project. The example focuses on how to run a task in the UI Performance plugin.
> We also recommend that you familiarize yourself with the list of documentation for the frameworks and libraries used in this project [here](https://getcarrier.io/posts/Preconditions-and-Learning-Materials/).
### Step 1: Add HTML Components

First, add a button that will open the modal dialog component.

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L98)

![Guide Image](/assets/posts_img/guide_vue__1.png)
![Guide Image](/assets/posts_img/guide_vue__2.png)

```html
<!-- file: ui_performance/static/js/components/UiResutsInfo.html -->
<div class="d-flex justify-content-end">
<!-- New button -->
  <button class="btn btn-secondary" data-toggle="modal" data-target="#RunTaskModal">
      Run task
  </button>
  ...
</div>
```

Next, add the modal dialog with the task list and parameters. This part of the code should be added to the component file where the button is located:

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L242)

```html
<!-- file: ui_performance/static/js/components/UiResutsInfo.html -->
<div class="modal fixed-left fade shadow-sm" tabindex="-1" role="dialog" id="RunTaskModal">
    <div class="modal-dialog modal-dialog-aside" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex justify-content-between w-100">
                    <p class="font-h3 font-weight-bold">Tasks</p>
                    <div class="d-flex gap-2">
                        <button type="button" class="btn mr-2 btn-secondary" data-dismiss="modal" aria-label="Close">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-basic d-flex align-items-center" @click="handleRunTask">
                            Run<i v-if="isLoadingRun" class="preview-loader__white"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="section">
                    <div v-if="tasksList.length > 0">
                        <p class="font-h5 font-bold">Select task for run:</p>
                        <select id="selectResult" v-model="selectedTask"
                                class="selectpicker bootstrap-select__b displacement-ml-4" data-style="btn">
                            <option v-for="(task, index) in tasksList" :key="index" :value="task.task_id">{{
                                task.task_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</div>
```

> **Note**: The button is linked to the modal window by the attribute `data-target="#RunTaskModal"` which matches the modal window's id `id="#RunTaskModal"`.

To add additional parameters to the selected task, use the global component `params_table_content`. This is passed to the component via the template and will be displayed in the correct place via the slot.

![Guide Image](/assets/posts_img/guide_vue__3.png)

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/templates/results/content.html#L6)

```html
<!-- file: ui_performance/templates/results/content.html -->
<ui-result
  @register="register"
  instance_name="ui-result"
  :test_data='{{ test_data | tojson }}'
  url="/api/v1/ui_performance/results/{{ tools.session_project.get() }}/{{ test_data['uid'] }}">
  <!-- Parameter component -->
  <template #test_parameters_run>
      {{ template_slot("params_table_content", payload={
        "caption": "Task Parameters",
        "modal_id": "RunTaskModal",
        "hidden_columns": []
      }) | safe }}
  </template>
</ui-result>
```

```html
<!-- file: ui_performance/static/js/components/UiResutsInfo.html -->
<div class="modal-body">
  ...
  <slot></slot>
</div>
```

### Step 2: Add JS Logic

When opening a modal window, attach an event handler: when the window is shown, fill the list with tasks previously received from the server. Also, add the default value of one of the parameters of any task that contains the report ID.

A hook `mounted` is used for this.

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L20)

```javascript
// file: ui_performance/static/js/components/UiResutsInfo.html
mounted() {
  ApiFetchTasks().then(data => {
    this.tasksList = data.rows;
  });
  $('#RunTaskModal').on('show.bs.modal', () => {
    this.$nextTick(() => {
      $("#RunTaskModal_test_params").bootstrapTable('append', [{
        "name": "report_id",
        "default": this.result_test_id,
        "description": "",
        "type": "",
        "action": "",
      }]);
      $('#selectResult').selectpicker('refresh');
    })
  })
}
```

> **Note**: `$('#selectResult').selectpicker('refresh')` is used to correctly render the list of tasks in the selector, which needs to be redrawn in the DOM tree (due to the peculiarities of how Bootstrap components work in Vue components).

To start the task, use the "Run" button. This button is associated with the method `handleRunTask`. If the data is successfully sent to the server, the modal window is closed, and the parameter table is cleared.

![Guide Image](/assets/posts_img/guide_vue__4.png)

```html
<button type="button" class="btn btn-basic d-flex align-items-center" @click="handleRunTask">
  Run<i v-if="isLoadingRun" class="preview-loader__white"></i>
</button>
```

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L64)

```javascript
// file: ui_performance/static/js/components/UiResutsInfo.html
methods: {
  handleRunTask() {
    this.isLoadingRun = true;
    this.runTask().then(() => {
      $('#RunTaskModal').modal('hide');
      this.resetParams();
    }).finally(() => {
      this.isLoadingRun = false;
    })
  }
}
```

To send a task with its parameters to the server, use the native `fetch` method.

[GitHub Source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L73)

```javascript
async runTask() {
  const resp = await fetch(`/api/v1/tasks/run_task/default/${getSelectedProjectId()}/${this.selectedTask}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify($("#RunTaskModal_test_params").bootstrapTable('getData')),
  });
  return resp.json();
}
```

> **Note**: `$("#RunTaskModal_test_params").bootstrapTable('getData')` allows you to get all the data from the parameter table.

