FROM node:20-alpine 

# 컨테이너 내부 작업 디렉토리를 /app/frontend로 설정
WORKDIR /app/frontend

# package.json과 package-lock.json을 복사 (dependencies를 설치하기 위함)
COPY package*.json ./

# package.json에 있는 dependencies를 설치
RUN npm install

RUN npm build

# /app/frontend에 있는 모든 파일들을 복사 (소스 코드)
COPY . .

# 개발 서버를 실행하는 명령어
CMD ["npm", "run", "dev"]

EXPOSE 5173