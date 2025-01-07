# Caring

## 기술 스택

- **언어**: TypeScript
- **모바잉 애플리케이션 프레임워크**: React Native
- **CSS 프레임워크**: Tailwind CSS
- **상태 관리**: zustand

---

## 프로세스

0. **caring-?-? 레포지토리 Fork**
1. **Jira 확인 및 변경**: 담당 이슈 확인 후, 이슈 번호 및 세부 내용 파악 후 스프린트 배정 및 워크플로 *진행 중*으로 변경
2. **Github 이슈 생성**: 이슈 생성 후 브랜치 생성
3. **해당 브랜치에 PR 및 Merge(개발 중)**: 개인 레포지토리에서 개발 후, 해당 브랜치에 Merge (PR rules & Template 미적용)
4. **develop 브랜치 PR 생성 및 리뷰(개발 후)**: 해당 기능 개발 완료 후, Main 브랜치에 PR 생성 (PR rules & Template 적용)
5. **develop Merge(리뷰 해결 후)**: 팀원의 리뷰들 해결 후, approve 후에 Merge

**주의할 점: 개발 중 develop 브랜치와 다를 수 있기에 개발 시작 전, `git pull` 을 항상 할 것**
demo-app 레포지토리는 develop 브랜치가 없음. main과 develop 브랜치가 동일 기능

## Git Branch 전략

### Issue 생성

![image](https://github.com/user-attachments/assets/c903eb5f-569a-4dec-b29e-3fcdcdbb90f0)

- 이슈 템플릿 지정
  ![image](https://github.com/user-attachments/assets/cfe0a2a2-7cb1-4469-adf1-50ec692da909)
- 이슈 템플릿 작성, 할당자, 라벨 등록 (개발 예상 계획을 수립, 이슈 이름: [CARE-?] 해당 기능 설명)
  ![image](https://github.com/user-attachments/assets/9688c3e4-fcb5-4f0a-85b7-f88d1ca2ec6e)
- 브랜치 생성
  - 저 동그라미(Create a branch)를 통해 브랜치를 만들어주세요!
  - 브랜치 이름: **업무종류/이슈번호**
  - ex. feature/CARE-? : feature, fix, docs 등등 상황에 맞게 지정
  - Checkout locally 선택
    ![Untitled](https://github.com/user-attachments/assets/0a536f80-7342-44c8-9d4e-b8c6e841e36e)
- 브랜치 작업 명령어 복사 후, 터미널에서 작업

  ![Untitled (1)](https://github.com/user-attachments/assets/f79ba9a4-eff1-4c10-9541-073e00e125a0)

- **주의할 점**
  - **새 브랜치가 뻗어나갈 브랜치에서 브랜치를 만들어줘야 한다는 것**
  - **develop 브랜치가 개발 중심 브랜치**
  - 항상 develop 브랜치와 기능 개발 브랜치(feature/CARE-12)와 같아야 함.

### Branch Rule

![KakaoTalk_20250107_182656021](https://github.com/user-attachments/assets/ca691855-0851-41d6-bdcf-a04209bcfe1f)

1. **main** 브랜치에서 시작
2. 동일한 브랜치를 **develop**에도 생성 후 개발자들이 **develop** 브랜치에서 개발을 진행
3. 기능 개발이 필요한 경우 **develop 브랜치에서 feature 브랜치 생성** 후 기능 구현
   - (참고) 원격 저장소의 branch 가져오기: `git checkout -t origin/develop`
   - 방법: `git checkout -b <생성할 브랜치 이름> <분기할 브랜치 이름>`
     - 예) `git checkout -b feature/login develop`
   - branch 이름 규칙
     - `해당 작업 유형/작업 이름` ex) feature/login
     - feature : 새로운 기능 개발
     - fix : 버그 수정
     - refactor : 리팩토링
     - docs : 문서수정
     - chore : 빌드 업무 수정, 패키지 매니저 수정 등
     - test : 테스트 코드
4. 완료된 feature/CARE-? 브랜치는 PR을 거쳐 **develop 브랜치에 merge**
5. 모든 기능 개발이 완료되면 develop 브랜치로부터 release 브랜치로 merge
6. 배포 진행
7. 배포 후 미처 발견하지 못한 버그 발생 시 hotfixes 브랜치를 만들어 긴급 수정 후 main 브랜치에 merge 및 배포 (PR rules 미작용으로 신중하게 사용 권장)

### Commit Rule

- **커밋 메시지만 봐도 내용을 알 수 있게 적어야 한다.**
- 작업은 다음의 규칙에 따라 구분한다.
- `[코드 번호]: 작업 내용` ex) [CARE-12]: 아이디 포함 각 항목 정규식 구현

### Pull Request Rule

1. PR을 생성한다.
   - PR 생성 시 내용에 관련 이슈 번호를 꼭 입력한다.
   - **close 키워드** 사용 시 merge 시 자동으로 issue가 닫힌다.

![Untitled (3)](https://github.com/user-attachments/assets/f2f76840-2493-40d0-8159-ec13898a2a59)

2. Reviewers에 reviewers를 지정한다.(PM 포함함)
3. Labels을 지정한다.
4. 코드 리뷰를 진행한다.
5. merge 시 **Squash and Merge**를 진행한다.

![Untitled (4)](https://github.com/user-attachments/assets/404724bb-c737-46b6-9769-e68ad6236d32)

### [유의사항] merge시 상황에 따른 전략 선택

- **feature → develop Merge 시 Squash and Merge**가 유용하다**.**
  feature 브랜치에서 기능을 개발하기 위한 지저분한 커밋 내역을 하나의 커밋으로 묶어 develop 브랜치에 병합하면서, develop에는 기능 단위로 커밋이 추가되도록 정리할 수 있다.
  또한 feature 브랜치는 develop 브랜치에 병합 후 제거되므로, Merge Commit을 남길 필요가 없다.
- **develop → main Merge 시에는 Rebase And Merge**가 적합하다.
  main 브랜치는 지금까지 작업한 모든 기능을 배포할 때 병합한다. develop 브랜치를 Squash and Merge하게 되면 커밋 이력이 모두 사라져, 특정 기능에서 문제가 생겼을 때 롤백할 수 없게 된다. main 브랜치 또한 Merge Commit을 남길 필요가 없다. 따라서 **Rebase And Merge**가 적합하다.
