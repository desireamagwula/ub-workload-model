---
name: ub-workload-appscript
description: Work on the UB workload Apps Script project, preserving its auth model, Firebase data structure, and jQuery/Bootstrap front-end patterns. Use when editing authorized_users.gs, workload.gs, or index.html in this repository.
---

# UB Workload Apps Script

## Instructions

- Treat `authorized_users.gs` as the authority for:
  - Who is allowed to use the app (`AUTHORIZED_USERS.faculty`, `chairs`, `deans`).
  - Faculty–department mappings (`facultyMap`, `deanFacultyMap`).
  - Helper functions `isUserAuthorized`, `getUserRole`, `getUserName`, `getFacultyUnderUser`.
- When adding new backend features in `workload.gs`:
  1. Validate input and resolve the current user (`Session.getActiveUser().getEmail()`).
  2. Enforce role-based permissions with `isUserAuthorized` and `getUserRole`.
  3. Use the `safeEmail` + `semester` convention for keys and always set `lastUpdated`.
  4. Wrap Firebase access in `try/catch`, log errors, and return `{ success, message, data? }`.
- When editing `index.html`:
  - Keep using jQuery for event handling and DOM updates.
  - Follow the existing workload-entry pattern (category → subcategory → activity → conditional fields).
  - Wire new capabilities via `google.script.run` with explicit success and failure handlers.
  - Maintain the UB visual style: UB colors, card layout, summary tables.

## Examples

- **Adding a new role-restricted report**:
  - Create a function in `workload.gs` that:
    - Checks role: only `Dean` or `Super Admin` may call it.
    - Reads from `${BASE_URL}/workloads.json`.
    - Aggregates by department without double-counting faculty.
    - Returns `{ success: true, data: report }`.
  - Expose it in `index.html` via a button that calls `google.script.run.withSuccessHandler(renderReport)...`.

- **Adding a new workload activity type**:
  - Update `categoryOptions` (for simple activities) or the `updateSubcategories` / `updateActivities` logic (for complex, conditional fields).
  - Ensure `recalculateAllEntries()` reflects new rules for base and adjustment points.
  - Confirm that submissions still produce entries with `basePoints`, `adjustmentPoints`, and `totalPoints` populated.

