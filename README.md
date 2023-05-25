# Pawsense
This app is for helping pet parents better track their pets' behavior, mood and health, find solutions to any existing problems so their pets can live their best life.


## Approach
Since animals cannot communicate the way that we can, it is important for pet parents to regularly keep track of their pets behavior, mood and any other changes that could point to health problems. By the time something serious happens and a pet is taken to the vet, it is too late.  

Users will have the ability to track their pets behavior, mood and more so that they can better detect these serious illnesses later on before it's too late.

## Features and Functionality:
Once a user is authenticated

```mermaid
---
title: Get Details
---
...
{{< mermaid >}}
graph LR
  A((User)) -->|Clicks on a pet| B(Redirect to Pet Details Page)
  B --> C(Retrieve Pet Details from Server)
  C --> D(Show Pet Details)

{{< /mermaid >}}
```
