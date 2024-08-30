---
title: Guide on how to add ui template for new plugin
author: User
date: 2024-08-29 12:00:00 +0800
categories: [Performance, UI, guide]
tags: [ui, vue.js]
render_with_liquid: false
---

## Overview

This guide provides instructions on how to add template (page) of new plugin.
### Step 1: Add basic files

To start add three files to the directory with the same name as specified in the web slot initialization as shown in the picture

![Guide Image](/assets/posts_img/guide_add_new_plugin.png)

1. In the file `content.html` place the main parent component that will represent the page.
2. Register it with a unique name for the main root component of the entire application using `@register="register"` and `instance_name='uniq_name'`
3. In the file `scripts.html`, write the connection path of the main component that you will create later.
4. The `styles.html` file is used for specific css styles. It is empty by default.

```html
<!-- file: ui_performance/templates/results/content.html -->
<ui-result
  @register="register"
  instance_name="ui-result">
</ui-result>
```

```html
<!-- file: ui_performance/templates/results/scripts.html -->
<script src="{{ url_for('ui_performance.static', filename='js/components/UiResult.js') }}"></script>
```

### Step 2: Add file which contains code of main component

1. Create a main component that will contain all the children at the path specified below. Moreover, the name of the component must match the one you specified in file `scripts.html`.
2. Also connect it to the main component using method `register_component` where the first part is `instance_name` and the second is the name of the component:
[github example](https://github.com/carrier-io/ui_performance/blob/59cb930a273e52b2c2c461fca4381a974d51c825/static/js/components/UiResult.js#L126)
![Guide Image](/assets/posts_img/guide_add_new_plugin_2.png)

```javascript
register_component('ui-result', UiResult)
```
- Now the new component is displayed in the list of registered components of the global component vue and will be displayed on the page.
![Guide Image](/assets/posts_img/guide_add_new_plugin_3.png)
