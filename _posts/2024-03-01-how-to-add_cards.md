---
title:  How to add cards from design system
author: User
date: 2024-03-01 12:00:00 +0800
categories: [Performance, UI, card]
tags: [ui, designSystem]
render_with_liquid: false
---

## Overview

This guide provides how to add cards from design system.

1. To change the color, you should change the class 'card-green' on 'card-blue' or other.
   ![Cards](/assets/posts_img/ds_cards.png)

2. Class 'grid-column-5' means: 1 row consists 5 cards

3. Each color card has the following code.

```bash
  <div class="d-grid grid-column-5 gap-3">
      <div class="card card-sm card-green">
          <div class="card-header">card-sm</div>
          <div class="card-body">card-green</div>
      </div>
      ...
  </div>
```

