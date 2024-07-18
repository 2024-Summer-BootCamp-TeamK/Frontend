# node 이미지 기반 Docker 이미지
from node

# 작업 디렉토리 설정
WORKDIR /app

# package.json 작업 디렉토리에 복사
COPY package.json .

# 의존성 설치
Run npm install

COPY . ./

# npm start 스크립트 실행
CMD ["npm","run","dev"]