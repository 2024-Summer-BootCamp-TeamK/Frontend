FROM node:20-alpine 

# 컨테이너 내부 작업 디렉토리를 /app/frontend로 설정
WORKDIR /app/frontend

# 필수 시스템 라이브러리 설치
RUN apt-get update && apt-get install -y \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpixman-1-dev \
    && rm -rf /var/lib/apt/lists/*


# package.json과 package-lock.json을 복사
COPY package*.json ./

# package.json에 있는 dependencies를 설치
RUN npm install

# /app/frontend에 있는 모든 파일들을 복사 (소스 코드)
COPY . .

# 빌드를 실행하는 명령어
RUN npm run build

# 노출할 포트 번호
EXPOSE 5173
