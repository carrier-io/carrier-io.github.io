---
title:  How to add buttons from design system
author: User
date: 2024-03-01 12:00:00 +0800
categories: [Performance, UI, fetchData]
tags: [ui, designSystem]
render_with_liquid: false
---

## Overview

This guide provides how to add buttons from design system.

1. Choose the desired button from the button section, copy the HTML code of the element and paste it in the desired place as follows:
   ![Tasks section](/assets/posts_img/ds_buttons.png)
2. In order to add an event to a click - bind it to the corresponding function in the vue.j methods
3. And for the appearance of a temporary spinner - add a display condition through v-if, and associate it with the value of the variable of data.
```bash
<button type="button"
    class="btn btn-basic d-flex align-items-center"
    @click="saveData"
>Save
  <i v-if="isLoading" class="preview-loader__white ml-2"></i>
</button>
...
deta() {
  return {
    isLoading: false,
  }
}
methods: {
  saveData() {
        this.isLoading = true;
    // some actions with server
        this.isLoading = false;
  }
}
```
