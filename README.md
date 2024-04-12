# FC Online
Next.js와 Nexon Onpen API를 사용하여 만든 FC Online 검색 사이트입니다.<br />
FC Online 이용자를 위한 정보 검색 사이트입니다.<br/>

## 제작기간
2024-03 ~ 제작중

## 미리보기
썸네일이미지 넣을 예정

## 링크
[바로가기](https://fcon.vercel.com)

## 설치
<details>
<summary>Instail</summary>
npx create-next-app .<br/>
npm install sass<br/>
npm install axios<br/>
npm install @next/third-parties<br/>
npm install swiper<br/>
npm install mongodb<br/>
npm install mongoose<br/>
npm install next-auth<br/>
npm install bcrypt
</details>

## 기술 스택
Front-end<br>
<img src="https://img.shields.io/badge/nextdotjs-000000?style=flat-square&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/swiper-6332F6?style=flat-square&logo=swiper&logoColor=white">

Back-end<br>
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

Deploy<br>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> 

## 기능 소개
- Layout.js

- NextAuth
NextAuth를 통하여 Google회원가입을 구현했습니다.

- Header
페이지 이동을 할 수 있는 Nav가 있으며, 모바일 사이즈의 경우 햄버거 메뉴를 눌러서 나오는 화면에서 페이지이동을 할 수 있습니다.<br/>
회원관련 메뉴로는 로그인, 로그아웃이 있으며 회원가입을 진행한 경우 프로필 사진을 누르면 나오는 드롭다운메뉴에서 닉네임 변경과 회원탈퇴를 진행할 수 있습니다.

- Main
유저 닉네임을 검색하여 경기 타입별 결과를 조회하고 상세내역을 확인할 수 있으며,<br />
유저의 공식경기 등급 이미지를 확인할 수 있고 경기 타입별 최고등급도 확인할 수 있습니다.<br />
최근 등록된 공지사항글 5개를 불러옵니다.<br/>
선수를 판매할때 수수료 할인에 따라서 받을 수있는 BP를 미리 확인할 수 있습니다.

- User
localStorage

- Match

- Stats
선수의 포지션과 선수 아이디값을 선택하면 TOP 10,000 랭커가 최근 20경기에서 사용한 선수의 평균 스텟을 확인할 수 있습니다.<br />

## 구현 예정
