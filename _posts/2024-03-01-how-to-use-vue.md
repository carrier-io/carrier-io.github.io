---
title:  Guide how use vue.js
author: User
date: 2024-08-29 12:00:00 +0800
categories: [Performance, UI, guide]
tags: [ui, vue.js]
render_with_liquid: false
---

## Overview

This guide provides how to use vue.js in project by example how to run task at UI Performance plugin.

### Step 1: Add HTML components

At first need to add button which will be open modal dialog component.

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L98)

![guide](/assets/posts_img/guide_vue__1.png)
![guide](/assets/posts_img/guide_vue__2.png)

```bash
// file: ui_performance/static/js/components/UiResutsInfo.html
<div class="d-flex justify-content-end">
      // new button
      <button class="btn btn-secondary" data-toggle="modal" data-target="#RunTaskModal">
          Run task
      </button>
      ...
```

At Secondary need to add modal dialog with tasks lists and parameters. this part of the code should be added in the component file where the button above will be located:
   [more details about how modal windows work](https://getbootstrap.com/docs/4.6/components/modal)

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L242)
```bash
// file: ui_performance/static/js/components/UiResutsInfo.html
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
                                <button type="button"
                                    class="btn btn-basic d-flex align-items-center"
                                    @click="handleRunTask"
                                    >Run<i v-if="isLoadingRun" class="preview-loader__white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="section">
                            <div v-if="tasksList.length > 0">
                                <p class="font-h5 font-bold">Select task for run:</p>
                                <select id="selectResult"
                                    v-model="selectedTask"
                                    class="selectpicker bootstrap-select__b displacement-ml-4" data-style="btn">
                                    <option v-for="(task, index) in tasksList" :key="index" :value="task.task_id">{{ task.task_name }}</option>
                                </select>
                            </div>
                        </div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
```

>Note that the button is linked to the modal window by the attribute 'data-target="#RunTaskModal"' which matches the window id 'id="#RunTaskModal"'.

To add additional parameters to the selected task, use the global component "params_table_content". Which is passed to the component via the template and will be displayed in the right place via the slot.
   ![guide](/assets/posts_img/guide_vue__3.png)

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/templates/results/content.html#L6)

```bash
  // file: ui_performance/templates/results/content.html
  <ui-result
          @register="register"
          instance_name="ui-result"
          :test_data='{{ test_data | tojson }}'
          url="/api/v1/ui_performance/results/{{ tools.session_project.get() }}/{{ test_data['uid'] }}">
      // parameter component
      <template #test_parameters_run>
          {{ template_slot("params_table_content", payload={
          "caption": "Task Parameters",
          "modal_id": "RunTaskModal",
          "hidden_columns": []
      }) | safe }}
      </template>
  </ui-result>
```

```bash
// file: ui_performance/static/js/components/UiResutsInfo.html
  <div class="modal-body">
      ...
      <slot></slot>
  </div>
```
### Step 2: Add JS logic

When opening a modal window, we attach an event handler: when the window is shown - we fill the list with tasks previously received from the server.
We also add the default value of one of the parameters of any task that contains the report ID
A hook 'mounted' is used for this [more details about how the hook works](https://v3.ru.vuejs.org/ru/api/options-lifecycle-hooks.html)

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L20)

```bash
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

> '$('#selectResult').selectpicker('refresh')' - in order for the selector to correctly render the list of tasks, it needs to be redrawed in the home tree (this is due to the peculiarity of how bootstrap components work in Vue components).

To start the task we use the run button. Which we associate with the method "handleRunTask".
   If the data is successfully sent to the server, the modal window is closed and the parameter table is cleared
   [More about two-way binding vue](https://v1.vuejs.org/guide/syntax.html)

![guide](/assets/posts_img/guide_vue__4.png)
```bash
  <button type="button"
    class="btn btn-basic d-flex align-items-center"
    @click="handleRunTask"
    >Run<i v-if="isLoadingRun" class="preview-loader__white"></i>
  </button>
```

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L64)

```bash
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
To send a task with its parameters to the server, we use the native fetch method.
   (More details about the fetch method are described here - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

[github source](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResultInfo.js#L73)

```bash
   async runTask() {
     const resp = await fetch(`/api/v1/tasks/run_task/default/${getSelectedProjectId()}/${this.selectedTask}`,{
       method: 'POST',
       headers: {
       "Content-Type": "application/json",
       },
       body: JSON.stringify($("#RunTaskModal_test_params").bootstrapTable('getData')),
       })
     return resp.json();
   },
```
>$("#RunTaskModal_test_params").bootstrapTable('getData') - Allows you to get all the data from the parameter table (more about this - https://bootstrap-table.com/docs/api/methods/#getdata).
