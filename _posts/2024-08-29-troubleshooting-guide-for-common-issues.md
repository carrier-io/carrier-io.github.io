---
title: Troubleshooting guide for common issues
author: User
date: 2024-08-29 12:00:00 +0800
categories: [Performance, UI, guide]
tags: [ui, issues]
render_with_liquid: false
---

## Overview

The troubleshooting guide for common issues encountered during development.
> We also recommend that you familiarize yourself with the list of documentation for the frameworks and libraries used in this project [here](https://getcarrier.io/posts/Preconditions-and-Learning-Materials/).
### Debugging with vue devtools

[link to download the plugin](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?pli=1)

![vue devtools](/assets/posts_img/debug_tools.png)

This plugin helps to remember what data was not passed to the component via prop views.
You can also track the work of events that are passed from the child to the parent component.
Next, add the modal dialog with the task list and parameters. This part of the code should be added to the component file where the button is located:

## Vue vs Bootstrap 4.6

One of the features of the combination of bootstrap and vue is to observe the sequence of rendering of elements in the browser. Since bootstrap components inserted into vue components are not reactive, they must be forcibly rerendered after changing their state using bootstrap methods in the following stack of event loop.
For this, we can use `$nextTick`.

See the example below, where the `selectpicker` is forced to redraw after receiving new data from the server:

```html
<select id='selector_integration' class="selectpicker bootstrap-select__b bootstrap-select__b-sm" data-style="btn">
    <option
        v-for="integration in projectIntegrations"
        :value="get_integration_value(integration)"
        :title="getIntegrationTitle(integration)"
        :key="integration"
    >
        {{ getIntegrationTitle(integration) }}
    </option>
</select>
```

```javascript
async fetchS3Integrations() {
  const res = await fetch(`${api_url}/${this.$root.project_id}${params}`, {
    method: 'GET',
  })
  if (res.ok) {
    this.projectIntegrations = await res.json()
    this.selectedIntegration = this.get_integration_value(this.default_integration)
    this.$nextTick(() => {
      $('#selector_integration').val(this.selectedIntegration)
      $('#selector_integration').selectpicker('refresh')
    })
  } else {
    console.warn('Couldn\'t fetch S3 integrations. Resp code: ', res.status)
  }
}
```

> **Note**: This especially applies to the cells of the `bootstrap-table`.
