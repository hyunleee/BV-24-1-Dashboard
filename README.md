## Prerequisites

### [Homebrew](https://brew.sh/) 설치

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install cask
brew update
```

### [Yarn](https://yarnpkg.com/) 설치

```
brew install yarn
```

### [Docker](https://docs.docker.com/get-started/overview/) 설치

- Mac용 Docker Desktop 어플리케이션: [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)

<br/>

## Getting Started

### 레포지토리 설치

```
git clone https://github.com/everGreenGH/BV-2024-Dashboard.git
cd BV-2024-Dashboard
yarn install
```

### 데이터베이스 설정 (설치 후 최초 1회만 실행)

```
docker-compose up -d
yarn prepare:prisma
yarn db:migrate:local
```

### 모든 어플리케이션 실행 (아래 사항을 모두 포함)

```
yarn start:all
```

### Docker service 실행

```
docker-compose up -d
```

### 클라이언트 실행

```
yarn start:client
```

### 서버 실행

```
yarn start:server
```
