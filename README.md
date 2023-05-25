# Pawsense
This app is for helping pet parents better track their pets' behavior, mood and health, find solutions to any existing problems so their pets can live their best life.


## Approach
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
