import React from 'react';

export const metadata = () => ({
  title: `FCON.KR 개인정보 처리방침 - FC 온라인 전적 검색 FCON.KR`,
});

export default function page() {
  return (
    <main id="main" role="main">
      <div className="container policies">
        <div className="policies__header">
          <h2>FCON.KR 개인정보 처리방침</h2>
        </div>

        <div className="policies__cont">
          <div className="cont">
            <h3>개인정보 처리방침</h3>
            <p>
              FCON.KR은 고객님의 개인정보를 중요시하며, &quot;정보통신망 이용촉진 및 정보보호&quot;에 관한 법률을 준수하고 있습니다.
              <br />
              FCON.KR은 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              <br />
              FCON.KR은 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
            </p>
          </div>

          <div className="cont">
            <h3>수집하는 개인정보 항목</h3>
            <p>FCON.KR은 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
            <ol>
              <li>수집항목 : 구글로부터 제공되는 이메일 주소, 이름, 프로필 사진</li>
              <li>개인정보 수집방법 : 홈페이지(Google 회원가입)</li>
            </ol>
          </div>

          <div className="cont">
            <h3>개인정보의 수집 및 이용목적</h3>
            <p>FCON.KR은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ol>
              <li>
                회원 관리
                <ol>
                  <li>회원제 서비스 이용에 따른 본인확인 및 개인 식별 확인</li>
                  <li>접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                </ol>
              </li>
            </ol>
          </div>

          <div className="cont">
            <h3>개인정보의 보유 및 이용기간</h3>
            <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 FCON.KR은 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
            <ol>
              <li>보존 항목 : 이메일 , 이름, 프로필 사진</li>
              <li>보존 근거 : 신용정보의 이용 및 보호에 관한 법률</li>
              <li>보존 기간 : 3년</li>
            </ol>
          </div>

          <div className="cont">
            <h3>개인정보의 파기절차 및 방법</h3>
            <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 FCON.KR은 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
            <ol>
              <li>
                파기절차
                <ol>
                  <li>회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.</li>
                </ol>
              </li>
              <li>
                파기방법
                <ol>
                  <li>전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                </ol>
              </li>
            </ol>
          </div>

          <div className="cont">
            <h3>개인정보 제공</h3>
            <p>FCON.KR은 회원님의 개인정보를 외부(타사)에 제공하지 않습니다. 아래의 경우에는 제공할 수 있습니다.</p>
            <ol>
              <li>이용자들이 사전에 동의한 경우</li>
              <li>사이버수사대나 경찰서에서 요청한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ol>
          </div>

          <div className="cont">
            <h3>수집한 개인정보의 위탁</h3>
            <p>FCON.KR은 고객님의 동의없이 고객님의 정보를 외부 업체에 위탁하지 않습니다. 향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다.</p>
          </div>

          <div className="cont">
            <h3>이용자 및 법정대리인의 권리와 그 행사방법</h3>
            <p>
              [회원가입 시스템을 이용한 경우]
              <br />
              이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.<br/>
              이용자 혹은 만 14세 미만 아동의 개인정보 조회/수정을 위해서는 ‘개인정보변경’(또는 ‘회원정보수정’ 등)을 가입해지(동의철회)를 위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
              혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.<br/>
              FCON.KR은 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 “FCON.KR가 수집하는 개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
            </p>
          </div>

          <div className="cont">
            <h3>개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</h3>
            <p>FCON.KR은 귀하의 정보를 수시로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 운용합니다. 쿠키란 FCON.KR의 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. FCON.KR은 다음과 같은 목적을 위해 쿠키를 사용합니다.</p>
          </div>

          <div className="cont">
            <h3>쿠키 등 사용 목적</h3>
            <p>
              회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공
              <br />
              귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
            </p>
          </div>

          <div className="cont">
            <h3>쿠키 설정 거부 방법</h3>
            <p>쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.</p>
            <ol>
              <li>Internet Explorer : 웹브라우저 상단의 [도구] → [인터넷 옵션] → [개인정보] → [고급] 메뉴를 통해 설정</li>
              <li>Chrome : 웹브라우저 우측 상단의 [ ⋮ ] → [설정] → [개인정보 및 보안] → [사이트 설정] → [쿠키 및 사이트 데이터] 메뉴를 통해 설정</li>
            </ol>
          </div>

          <div className="cont">
            <h3>개인정보에 관한 민원서비스</h3>
            <p>FCON.KR은 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.</p>
            <ul>
              <li>개인정보관리책임자</li>
              <li>FCON 개발팀</li>
              <li>fcon@outlook.kr</li>
            </ul>
          </div>

          <div className="cont">
            <p>
              귀하께서는 FCON.KR의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다.<br/>
              FCON.KR은 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
            </p>
            <ol>
              <li>공고일자 : 2024년 04월 14일</li>
              <li>시행일자 : 2024년 04월 14일</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}