# Smriti Frontend — Client for Notes Management API

This repository contains a minimal React-based client used to interact with the Smriti backend API.

The frontend exists to exercise backend authentication, session handling, search, and data lifecycle workflows.  
It is not intended to function as a standalone product.

---

## Purpose

- Validate backend authentication and token lifecycle
- Exercise note CRUD, archive, search, and export flows
- Simulate real client behavior against the API

All security and authorization decisions are enforced by the backend.

---

## Client Responsibilities

### Token Handling (Supporting Backend Design)
- Access tokens are stored in memory only
- Refresh tokens are managed via HttpOnly cookies (set by the backend)
- Automatic token refresh on `401 Unauthorized` responses
- Failed requests are retried after successful refresh

This follows the backend’s security model and does not introduce independent auth logic.

---

### API Interaction
- Centralized API service layer
- Automatic retry logic for expired access tokens
- Explicit handling of authorization failures

---

### Performance Considerations
- Debounced search requests to reduce backend load
- Client-side request throttling during rapid input changes
- Avoids unnecessary re-renders during API activity

---

## Technology Stack

- React
- React Router
- Context API
- Plain CSS (no UI framework)

---

