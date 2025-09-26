# m3ters-pay-gnosis

A project integrating **M3tering Protocol** with **Gnosis** and **Safe** (Multi-Sig wallet).  
Leverages smart contracts to make power purchases on the m3tering protocol.

## Table of Contents

- [Features](#features)
- [Architecture / Components](#architecture--components)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

-
-

## Architecture / Components

This repo is structured roughly as:

- **public/** — static assets
- **src/** — frontend / integration logic
- **.env.example** — sample environment variables
- **vite.config.ts, tsconfig** — TypeScript + Vite setup

## Getting Started

### Prerequisites

- Node.js (≥ version compatible with your setup)
- Yarn or npm or bun

### Installation

```bash
# Clone the repo
git clone https://github.com/michaelchristwin/m3ters-pay-gnosis.git
cd m3ters-pay-gnosis

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Configuration

Copy .env.example to .env and populate with your credentials. For example:

```bash
VITE_PROJECT_ID="your_project_id"
```

### Running locally

```bash
npm run dev
# or
yarn dev
# or
bun run dev
```
