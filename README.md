# FC Online
<img style="width: 100%" src="https://fcon.kr/images/meta/meta.webp" alt="fcon.kr" />
<br/>
FC Online 검색 사이트 FCON.KR은 Next.js와 Nexon Open API를 기반으로 구축되었습니다.<br/>
주요 기능은 FC 온라인 이용자를 위한 검색 기능으로, FC 온라인의 전적 및 선수 검색을 API를 활용하여 제공합니다.<br/>
또한 MongoDB를 이용하여 공지사항 게시판을 구현하였으며, 이를 통해 운영자가 공지사항을 작성하고 사용자들에게 알릴 수 있습니다.<br/>
선수를 판매할 때 발생하는 수수료를 미리 확인할 수 있는 계산기도 구현되어 있어 사용자들이 편리하게 이용할 수 있습니다.<br/>
이를 통해 FC 온라인 이용자들에게 유용한 검색 및 정보 제공 서비스를 제공합니다.

## 제작기간
2024-03-25 ~ 2024-04-14

## 링크
[바로가기](https://fcon.kr)

## 개인작업
|윤영식|
|:---:|
|<img width="150px" src="https://avatars.githubusercontent.com/u/144635640?v=4" />|

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
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white">

Back-end<br>
<img src="https://img.shields.io/badge/Mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

Deploy<br>
<img src="https://img.shields.io/badge/Vercel-000000?st yle=for-the-badge&logo=vercel&logoColor=white"> 

## 기능 소개
- Layout.js<br/>
Header와 Footer 컴포넌트를 사용하여 전체 페이지에서 동일하게 적용되도록 하였고, Google Anlytics는 '@next/third-parties/google'를 사용하여 연동시켰습니다.<br/>
DataProvider와 SessionProvider Context를 통하여 필요한 페이지에서 사용될 Data와 Session을 관리합니다.

      [페이지 메타데이터 설정]
      metadata 객체를 사용하여 페이지의 제목, 설명, 키워드, 작성자 등의 메타데이터를 설정합니다.
      Open Graph 및 Twitter 카드와 관련된 추가 메타데이터도 포함됩니다.

      [외부 리소스 및 스크립트 로드]
      Google Analytics 스크립트를 가져와서 페이지 추적을 위한 ID를 설정합니다.
      구글 애드센스 스크립트도 포함되어 있습니다.

      [레이아웃 구성]
      <Header />와 <Footer /> 컴포넌트를 사용하여 상단 헤더와 하단 푸터를 구성합니다.
      {children}을 통해 페이지의 실제 컨텐츠가 들어갈 자리를 만듭니다.
      DataProvider 및 SessionProvider 컨텍스트를 사용하여 데이터 및 세션을 관리합니다.

- 회원가입<br/>
NextAuth를 사용하여 Google회원가입을 구현했습니다.

      [인증 프로바이더 설정]
      GoogleProvider를 사용하여 Google OAuth를 통한 로그인을 설정합니다. 클라이언트 ID 및 클라이언트 시크릿은 환경 변수에서 가져옵니다.

      [콜백 설정]
      session 콜백은 사용자 세션을 처리합니다. 사용자 세션에 사용자의 추가 정보를 추가하고자 데이터베이스에 연결하여 해당 사용자를 찾아옵니다. 찾은 사용자가 있다면 세션에 사용자 ID와 역할을 추가합니다.
      signIn 콜백은 사용자 로그인을 처리합니다. 사용자가 로그인하려고 시도할 때 데이터베이스에 연결하여 해당 사용자가 이미 존재하는지 확인하고, 존재하지 않는 경우 새로운 사용자를 생성합니다.

      [핸들러 설정]
      NextAuth 함수를 사용하여 이러한 설정을 핸들러에 적용합니다. 이 핸들러는 GET 및 POST 요청 모두에서 사용됩니다.

      [Mongodb]
      회원가입이 될 때 Mongodb의 User스키마에 회원정보를 생성합니다.

- Header

      [Header]
      로고, 네비게이션, 검색기능, 로그인을 진행한 경우 프로필사진을 누르면 간단한 프로필창이 나타납니다.
      useSession 훅을 사용하여 로그인 여부를 확인 하고사용자가 로그인하지 않은 경우 로그인 버튼, 로그인하면 프로필 사진이 표시됩니다.
      사이트에서 사용되는 닉네임은 Mongodb에서 가져온 닉네임이 표시되며 프로플 사진을 누르면 나타나는 드롭다운 메뉴에서 닉네임 변경, 로그아웃 및 회원탈퇴를 진행할 수 있습니다.
      검색창은 usePathname을 사용하여 "pathName !== '/' && 검색창" 메인페이지가 아닌경우에만 표시되도록 제작했습니다.

      [Nav]
      사용자가 페이지 내에서 이동할 때 마다 usePathname을 사용하여 "pathName === item.href ? 'active' : ''"으로 메뉴 active를 구현하였습니다.
      모바일 환경에서는 햄버거 메뉴가 나타나도록 하였으며, useSessio훅을 통하여 로그인 여부를 확인하고 사용자가 로그인한 경우 네비게이션 메뉴에 로그아웃 버튼을 제공하고, 로그인하지 않은 경우에는 로그인 버튼을 제공합니다.

- Main [바로가기](https://fcon.kr)<br/>
메인화면에는 슬라이더, 게임유저 검색창, 최신 공지사항글, 수수료 계산기를 표시하고 있습니다.
      
      [슬라이더]
      Slider컴포넌트는 Swiper 라이브러리를 사용하여 슬라이드를 구현하였습니다.
      Swiper 컴포넌트 안에는 여러 개의 SwiperSlide가 포함되어 있으며 각 슬라이드는 mainSlider 배열에서 가져온 정보를 기반으로 생성됩니다.

      메인 슬라이더의 각 슬라이드는 다음과 같은 구성으로 되어 있습니다:

      next/link 사용하여 슬라이드를 클릭하면 slider.link로 이동합니다.
      슬라이드 내에는 slider.desc 배열의 내용을 화면에 표시합니다.
      슬라이드 내에는 slider.src에 지정된 이미지를 표시합니다.
      또한, Swiper의 Pagination, Autoplay, Navigation 모듈이 사용되었습니다. Pagination 모듈은 페이지 번호를 나타내는 동그라미 형태의 버튼을 표시하고, Autoplay 모듈은 자동 슬라이드 재생 기능을 제공하며, Navigation 모듈은 이전/다음 슬라이드로 이동할 수 있는 화살표를 제공합니다.

      [검색]
      검색바는 input 요소와 검색 버튼으로 구성되어 있습니다. 사용자는 input 요소에 구단주명을 입력하고, Enter 키를 누르거나 검색 버튼을 클릭하여 검색을 실행할 수 있습니다. 이 검색 컴포넌트 Header에서 사용됩니다.

      useState를 사용하여 name 상태를 정의합니다. name은 검색 입력 필드의 값을 저장합니다.
      useRouter를 사용하여 Next.js의 라우터를 가져옵니다. 이를 통해 검색 이벤트 발생 시 페이지를 이동할 수 있습니다.
      handleSearch 함수는 검색 버튼을 클릭하거나 Enter 키를 눌렀을 때 호출됩니다. 이 함수는 현재 입력된 구단주명에 따라 해당하는 페이지로 이동합니다.

      [최신공지사항]
      useState를 사용하여 allPosts와 loading 상태를 정의합니다. allPosts는 서버에서 가져온 모든 공지사항을 저장하고, loading은 데이터를 가져오는 중인지를 나타냅니다.

      useEffect 훅을 사용하여 컴포넌트가 마운트될 때 서버에서 공지사항 데이터를 가져오는 비동기 함수를 호출합니다. 데이터를 가져오는 동안에는 loading을 true로 설정하고, 데이터를 가져온 후에는 allPosts 상태를 업데이트하고 loading을 false로 설정합니다.

      loading이 true인 경우 로딩 중을 나타내는 UI를 렌더링합니다.

      loading이 false인 경우, 서버에서 가져온 공지사항 데이터를 사용하여 화면에 공지사항을 표시합니다. allPosts 배열을 공지사항의 최신 순서대로 정렬하고, 최신 5개의 공지사항만을 가져와서 화면에 표시합니다.

      각 공지사항은 공지사항의 제목, 작성일, 조회수, 작성자 등의 정보를 포함하고 있으며, 이를 화면에 표시합니다. 공지사항의 제목은 클릭하면 해당 공지사항의 상세 페이지로 이동할 수 있도록 Link 컴포넌트로 감싸져 있습니다.

      [수수료계산기]
      useState 훅을 사용하여 판매 금액(sell), 할인 쿠폰(discount), 프리미엄 PC방 할인 여부(togglePcBox), TOP CLASS 할인 여부(toggleTopBox)를 관리합니다.

      handleTogglePcBox 함수와 handleToggleTopBox 함수를 사용하여 프리미엄 PC방 할인 여부와 TOP CLASS 할인 여부를 토글합니다.

      각각의 할인 금액을 계산합니다. 프리미엄 PC방 할인 금액은 togglePcBox가 true이면 0.3, TOP CLASS 할인 금액은 toggleTopBox가 true이면 0.2입니다.

      판매 금액과 할인 쿠폰, 각종 할인 여부에 따라 최종 수수료와 받는 금액을 계산하여 화면에 표시합니다.

      결과는 수수료와 받는 금액을 BP 단위로 표시합니다. 수수료는 판매 금액의 40%에서 각종 할인 금액을 차감한 금액입니다. 받는 금액은 판매 금액에서 최종 수수료를 차감한 금액입니다.

      계산 결과는 화면에 실시간으로 표시되며, 판매 금액이나 할인 쿠폰을 변경할 때마다 결과가 업데이트됩니다.

- User [바로가기](https://fcon.kr/user/이름)<br/>
사용자 정보를 화면에 표시하고, 전적 갱신 버튼을 누르면 handleUpdate 함수를 호출하여 사용자 정보를 업데이트합니다. 또한, 사용자의 최고 등급에 따라 랭크 이미지를 표시하고, 사용자의 전적과 광고를 표시합니다.

      [기본정보]
      useState 훅을 사용하여 사용자 정보(data), 로딩 상태(loading), 마지막 업데이트 시간(lastUpdate), 버튼 비활성화 상태(btnDisabled)를 관리합니다.

      useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 name props가 변경될 때마다 사용자 정보를 가져오는 fetchData 함수를 호출합니다.

      fetchData 함수에서는 먼저 캐시에서 사용자 정보를 가져오고, 캐시에 정보가 없으면 API를 통해 정보를 가져와 캐시에 저장합니다. 그 후, 데이터 상태와 마지막 업데이트 시간을 설정합니다.

      handleUpdate 함수는 사용자 정보를 최신 상태로 업데이트합니다. 마지막 업데이트 시간과 현재 시간을 비교하여 일정 시간이 지났으면 fetchData 함수를 호출하고, 아니면 버튼을 비활성화합니다.

      data.maxdivision.find((item) => item.matchType === 50 && isAchievementDateThisYear(item.achievementDate)) ? &lt;span&gt;Unranked&lt;/span&gt;
      공식경기(50)의 날짜가 올해인지 isAchievementDateThisYear 함수를 통해서 확인하고 올해가 아닌 경우 Unranked를 표시하고 올해인경우

      &lt;Image src={`/images/rank/ico_${divisionImg(data.maxdivision.find((item) =&gt; item.matchType === 50 && isAchievementDateThisYear(item.achievementDate)).division)}.webp`} width={100} height={100} alt="디비전 랭크" /&gt;

      사용자정보에서 랭크정보를 가져와 랭크점수를 divisionImg 함수에 전달해서 점수에 따라 디비전 랭크 이미지를 반환합니다.

      [최근 전적]
      useEffect 훅을 사용하여 refresh와 name props가 변경될 때마다 fetchData 함수를 호출하여 데이터를 가져옵니다.

      fetchData 함수는 axios를 사용하여 API를 호출하여 사용자의 경기 정보를 가져옵니다. 이때, 가져온 데이터는 캐싱된 경우에만 setData를 호출하여 데이터를 업데이트합니다.

      useEffect 훅을 사용하여 data와 searchName이 변경될 때마다 승률을 계산합니다. 경기 정보에서 각 경기의 결과를 분석하여 승, 무, 패의 개수를 세고, 이를 이용하여 승률을 계산합니다.

      로딩이 끝나면 승, 무, 패의 개수와 승률을 표시합니다. 로딩 중일 때는 로딩 아이콘이 표시됩니다.

- Match<br/>
사용자의 경기 정보를 화면에 표시하고, 경기 타입을 선택할 수 있는 탭을 제공합니다. 또한, 더 많은 경기 정보를 볼 수 있는 더보기 버튼도 제공됩니다.

      [전적]
      useState 훅을 사용하여 사용자의 경기 정보(data), 로딩 상태(loading), 경기 타입(matchType), 오프셋(offset), 한 번에 보여지는 경기 수(limit), 세부 정보 활성화 여부(detailActive), 세부 정보 인덱스(showDetailIndex)를 관리합니다.

      useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 refresh, name, matchType, limit가 변경될 때마다 fetchData 함수를 호출하여 사용자의 경기 정보를 가져옵니다.

      fetchData 함수에서는 먼저 캐시에서 사용자의 경기 정보를 가져오고, 캐시에 정보가 없으면 API를 통해 정보를 가져와 캐시에 저장합니다.

      handleMore 함수는 더보기 버튼을 클릭할 때마다 limit 값을 증가시켜 더 많은 경기 정보를 표시합니다.

      handleDetail 함수는 경기 상세 정보를 토글합니다. 클릭한 경기의 인덱스를 받아서 해당 인덱스의 세부 정보를 활성화하거나 비활성화합니다.

      [상세정보]
      DetailInfo 컴포넌트는 match와 detailActive props를 받아서 팀별로 경기 정보를 표시합니다.

      팀별로 골, 슛, 유효슛, 공격 성공률, 패스 성공률, 점유율, 코너킥, 태클, 파울, 경고, 퇴장, 부상 등의 정보를 표시합니다. 이 정보는 각 팀의 matchInfo와 matchDetail에서 가져옵니다.

      상세 정보를 테이블 형식으로 표시하고, detailActive 값이 'info'일 때만 활성화됩니다.

      [라인업]
      팀의 선수 정보를 테이블 형식으로 표시합니다.
      각 행은 선수의 이미지, 이름, 포지션, 득점/도움, 경고/퇴장, 유효슛/슈팅, 패스성공/시도, 드리블성공/시도, 블락성공/시도, 태클성공/시도, 선방 순으로 표시됩니다.
      선수 이미지는 PlayerImage 컴포넌트를 사용하여 표시됩니다.
      선수 이름은 링크로 구성되어 있으며, 클릭 시 해당 선수의 상세 정보 페이지로 이동합니다.
      각 항목은 세부 정보와 함께 표시됩니다. 예를 들어, 득점/도움은 득점 수와 도움 수를 표시하고, 경고/퇴장은 경고 카드 수와 퇴장 카드 수를 표시합니다.
      각 항목의 성공률은 해당 행의 마지막 열에 표시됩니다.
      

- Stats [바로가기](https://fcon.kr/stats)<br/>
선수의 포지션과 선수 아이디값을 선택하면 TOP 10,000 랭커가 최근 20경기에서 사용한 선수의 평균 스텟을 확인할 수 있습니다.<br />

      [stats]
      TOP 10,000 랭커 유저가 사용한 선수의 20경기 평균 스탯을 조회할 수 있습니다.
      사용자는 포지션1(포지션)과 포지션2(포지션의 상세 포지션)를 선택하여 선수들을 필터링할 수 있습니다.
      사용자는 선수 이름으로 검색하여 선수를 필터링할 수 있습니다.
      각 선수의 기본 정보, 포지션, 사용 횟수, 득점/도움, 유효슛/슈팅, 패스 성공/시도, 드리블 성공/시도, 블락, 태클 등을 표시합니다.

- Notice [바로가기](https://fcon.kr/notice)<br/>
공지사항 목록을 불러오고, 검색 기능을 제공합니다. 또한, 관리자 권한을 가진 사용자에게는 글쓰기 버튼을 표시합니다. 페이지네이션을 통해 여러 페이지의 공지사항을 볼 수 있습니다.

      [목록]
      NoticeList는 각 공지사항의 제목, 작성일, 조회수, 작성자 등을 표시합니다. 검색된 결과가 있을 경우에는 검색된 결과를, 그렇지 않을 경우에는 모든 공지사항을 표시합니다.

      Notice는 공지사항 페이지의 주요 컴포넌트입니다. 공지사항 목록을 불러오고, 검색 기능을 제공합니다. 또한, 관리자 권한을 가진 사용자에게는 글쓰기 버튼을 표시합니다. 페이지네이션을 통해 여러 페이지의 공지사항을 볼 수 있습니다. 페이지 상단의 광고를 표시하고, 스크롤 이벤트를 통해 두 번째 광고를 제어합니다.

      [페이지네이션]
      페이지네이션을 구현하는 컴포넌트입니다. 이 컴포넌트는 현재 페이지(page)와 전체 페이지 수(count)를 받아와서 페이지네이션을 표시합니다.

      totalPage는 전체 페이지 수를 계산합니다. 전체 게시물 수를 한 페이지에 표시되는 게시물 수로 나누어 올림하여 구합니다.
      changePage는 페이지를 변경하는 함수입니다. useRouter를 사용하여 해당 페이지로 push합니다.

      컴포넌트는 현재 페이지가 1보다 크면 이전 페이지로 이동하는 버튼을 표시하고, 현재 페이지부터 전체 페이지까지의 숫자 버튼을 표시합니다. 현재 페이지는 활성화된 상태로 표시됩니다. 또한 현재 페이지가 전체 페이지 수보다 작으면 다음 페이지로 이동하는 버튼을 표시합니다.

      [상세보기]
      공지사항의 상세보기 페이지를 구성하는 컴포넌트입니다. 이 페이지는 특정 공지사항의 내용을 보여주고, 수정 및 삭제 기능을 제공합니다.

      특정 공지사항의 내용을 보여주는 컴포넌트입니다. 해당 공지사항의 제목, 작성일, 조회수, 작성자 등의 정보를 표시하고, 내용을 확인할 수 있습니다.
      로그인한 사용자가 해당 공지사항의 작성자인 경우에는 수정 및 삭제 버튼이 표시됩니다.

      fetchNotice 함수는 페이지가 로드될 때 특정 공지사항의 정보를 서버에서 상세정보를 가져옵니다.
      handleDelete 함수는 공지사항 삭제를 처리하는 함수입니다. 사용자가 확인을 선택하면 해당 공지사항을 삭제하고 목록 페이지로 이동합니다.
      handleEdit 함수는 공지사항 수정 페이지로 이동하는 함수입니다.

      [수정]
      공지사항을 수정하는 페이지를 표시하는 컴포넌트입니다. postId를 props로 받아서 해당하는 공지사항을 가져와 수정할 수 있습니다.

      useRouter라는 Next.js의 라우터 훅을 사용하여 수정이 완료되면 공지사항 목록으로 push합니다.
      useState를 사용하여 post에 수정할 공지사항의 제목과 내용을 저장합니다. submitting 상태는 공지사항을 수정하는 중인지를 나타냅니다.
      useEffect를 사용하여 컴포넌트가 렌더링될 때 postId에 해당하는 공지사항의 정보를 가져오는 비동기 함수를 호출합니다.
      updatePost는 공지사항을 수정하는 함수로, 제목과 내용을 서버로 전송하여 수정합니다. 만약 postId가 없다면 알림 메시지를 표시합니다.
      Form 컴포넌트는 공통적으로 사용되는 공지사항 입력 폼 컴포넌트입니다. type, post, setPost, submitting, handleSubmit props를 받습니다. 여기서는 수정을 위한 폼으로 사용되며 작성할때도 사용됩니다.

      [작성]
      공지사항을 작성하는 페이지를 표시하는 컴포넌트입니다.

      useEffect를 사용하여 컴포넌트가 렌더링될 때, useSession의 세션정보에서 로그인한 사용자의 role이 'admin'인지 확인 후 'admin'이 아니면 useRouter를 사용하여 공지사항 목록으로 push합니다.
      useState를 사용하여 post에 작성한 공지사항의 제목과 내용을 저장합니다. submitting 상태는 공지사항을 작성하는 중인지를 나타냅니다.
      createPost는 공지사항을 작성하는 함수로, 제목과 내용을 서버로 전송하여 저장합니다. 성공적으로 저장되면 공지사항 목록 페이지로 이동합니다.
      Form은 공통적으로 사용되는 공지사항 입력 폼 컴포넌트입니다. type, post, setPost, submitting, handleSubmit props를 받습니다. 여기서는 작성을 위한 폼으로 사용됩니다.

## 구현 예정
