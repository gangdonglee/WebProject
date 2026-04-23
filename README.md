# zero_point_three

세로형 모바일 하이퍼캐주얼 반응속도 게임 프로토타입입니다.

## 실행

정적 파일만으로 구성되어 있습니다.

1. `d:\Project`에서 `python -m http.server 4173` 실행
2. 브라우저에서 `http://localhost:4173` 열기

파일 직접 열기보다 로컬 서버 실행을 권장합니다.

## MVP 포함 사항

- Title / Game / Result 화면
- Chaos Mode 01
- 규칙 3종
  - 빨간 도형이면 탭
  - 파란 도형이면 탭
  - 네모면 탭
- 5점마다 규칙 전환
- 5점마다 반응시간 0.05초 감소
- 최소 반응시간 0.35초
- 오답 입력 또는 정답 미입력 시 게임오버
- 최고 점수 로컬 저장
- 규칙 전환 연출, 타이머 바, 간단한 시각 효과

## 구조

- `src/managers/GameManager.js`
- `src/managers/RuleManager.js`
- `src/managers/StimulusManager.js`
- `src/managers/InputManager.js`
- `src/managers/UIManager.js`
- `src/managers/SaveManager.js`
- `src/data/gameData.js`

규칙과 자극은 데이터 기반으로 확장 가능하도록 분리되어 있습니다.
