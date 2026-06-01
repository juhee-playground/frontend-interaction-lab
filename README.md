# Frontend Interaction Lab

React + TypeScript + Vite 기반 인터랙션 구현 연습용 모노레포입니다.

## Stack

- React
- TypeScript
- Vite
- pnpm workspace
- Tailwind CSS

---

# Folder Structure

```txt
frontend-interaction-lab/
├── apps/
│   ├── accordion/
│   ├── coupon/
│   ├── modal/
│   ├── tabs/
│   └── todo-app/
│
├── packages/
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Requirements

- Node.js >= 22
- pnpm

---

## Node Version

```
nvm use
```

or

```
nvm use 22
```

---

## Install

루트 경로에서 실행합니다.

```
pnpm install
```

---

## Run App

### Accordion

```
pnpm --filter accordion dev
```

### Coupon

```
pnpm --filter coupon dev
```

### Modal

```
pnpm --filter modal dev
```

Tabs

```
pnpm --filter tabs dev
```

## Create New App

루트 기준:

```
cd apps
pnpm create vite dropdown --template react-ts
```

생성 후 루트로 돌아와:

```
pnpm install
```

### Tailwind CSS Install

앱 폴더 기준:

```
cd apps/accordion
pnpm add -D tailwindcss @tailwindcss/vite
```

vite.config.ts

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## Workspace Commands

### Run Specific App

```
pnpm --filter accordion dev
```

### Install Dependency To Specific App

```
pnpm --filter accordion add axios
```

### Run Specific App

```
pnpm --filter accordion add -D eslint
```

---

## Notes

- 각 앱은 독립적인 Vite 프로젝트입니다.
- 공통 컴포넌트 및 유틸은 추후 packages/ 에서 관리합니다.
- 현재는 인터랙션 구현 및 React 구조 학습 목적의 저장소입니다.
