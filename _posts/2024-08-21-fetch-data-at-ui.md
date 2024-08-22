---
title:  Fetch data from server by Vue.js and jQuery
author: User
date: 2024-08-21 12:00:00 +0800
categories: [Performance, UI, fetchData]
tags: [performance, backend, tasks, reporting]
render_with_liquid: false
---

## Overview

This guide provides step-by-step instructions on how to create get data from server by Vue.js & jQuery.

### Entrypoint and parameters for task

Example how to create button which by click filling dropdown with new data by Vue.js component:

1. There are button and dropdown
   ![Tasks section](/assets/posts_img/get_data_for_dropdown.png)

```bash
const ListComponent = {
    data()  {
        return {
            list: [],
            loading: false,
        }
    },
    template: `
        <button @click="updateList">
            Update list
            <i class="spinner-loader" v-if="loading"></i>
        </button>
        <select class="selectpicker" data-style="btn">
            <option
                v-for="(item, index) in list"
                :value="item"
                :key="index"
            >
                {{ item }}
            </option>
        </select>
    `,
    methods: {
        updateList() {
            this.loading = true;
            ApiFetchItems().then(data => {
                this.list = data;
            }).finally(() => {
                this.loading = false;
            })
        }
    },
}


const ApiFetchItems = async () => {
    const api_url = V.build_api_url('pluginName', 'fileName')
    const res = await fetch(`${api_url}/${getSelectedProjectId()}`, {
        method: 'GET',
    })
    return res.json();
}
```

Example how to create button which by click filling dropdown with new data by jQuery:
```bash
<!doctype html>
<html lang="en">
<head>
</head>
<body>
    <button onclick="updateList()">
        Update list
        <i  id="loading" class="spinner-loader d-none"></i>
    </button>
    <select id="selectList" class="selectpicker" data-style="btn">
    </select>
</body>
<script>
    const updateList = () => {
        $('#loading').show();
        ApiFetchItems().then(data => {
            const $select = $('#selectList');
            $select.empty();
            data.forEach(item => {
                const option = `<option value="${item}">${item}</option>`;
                $select.append(option);
            });
            $select.selectpicker('refresh');
        }).finally(() => {
            $('#loading').hide();
        })
    }

    const ApiFetchItems = async () => {
        const api_url = V.build_api_url('pluginName', 'fileName')
        const res = await fetch(`${api_url}/${getSelectedProjectId()}`, {
            method: 'GET',
        })
        return res.json();
    }
</script>
</html>
```
