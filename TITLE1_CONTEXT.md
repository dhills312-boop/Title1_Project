# Project: School Supply Donation Hub

## Problem Statement
Title 1 schools rely on individual teacher Amazon Wishlists for classroom supplies.
Donors want to help but lack an easy way to:
- Donate at scale
- Distribute supplies fairly
- Support school-wide initiatives

## Core Users
- Teachers (wishlist providers)
- School administrators
- Donors (individuals, organizations)

## Core Capabilities (MVP)
- Input and store Amazon Wishlist links
- Extract item metadata into SQL database
- Donor-facing interface to:
  - Select items
  - Donate items in bulk to multiple classrooms
  - Donate money to a school
- Distribution logic that:
  - Allocates items/funds evenly across classrooms

## Explicit Non-Goals (MVP)
- No AI-driven recommendations
- No autonomous purchasing
- No background scraping without user action
- No donor profiling

## Constraints
- Budget-conscious
- Transparent allocation logic
- Compliant with nonprofit / school expectations
- Maintainable by small teams