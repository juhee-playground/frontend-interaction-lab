# Accordion 구현 TODO

매일 30분씩, 하나의 미션을 완료하세요.
체크박스를 채워가며 진행 상황을 추적하세요.

---

## Day 1: Compound Component 패턴으로 API 리팩토링

**목표:** 하드코딩된 구조를 아래 API 형태로 바꾸기

```tsx
<Accordion type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

**할 일:**

- [x] `AccordionContext` 생성 (열린 상태 + toggle 함수 제공)
- [x] `AccordionItemContext` 생성 (각 아이템의 `value`를 하위에 전달)
- [x] `Accordion` 컴포넌트: Context Provider + 상태 관리
- [x] `AccordionItem` 컴포넌트: 자기 value를 ItemContext로 제공
- [x] `AccordionTrigger` 컴포넌트: Context에서 toggle 꺼내서 클릭 핸들러 연결
- [x] `AccordionContent` 컴포넌트: 열린 상태 확인 후 렌더링
- [x] `App.tsx`에서 새 API로 사용해보기

**힌트:**

- `React.createContext` + `useContext`
- Accordion이 상태의 주인, 나머지는 Context를 통해 읽기만 함
- 파일 분리는 나중에 해도 됨. 일단 한 파일에 다 만들어도 OK

---

## Day 2: single / multiple 모드 구현

**목표:** `type="single"` vs `type="multiple"` 동작 분기

**할 일:**

- [ ] `type` prop 타입 정의 (`"single" | "multiple"`)
- [ ] single: 상태를 `string | null`로 관리 (하나만 열림)
- [ ] multiple: 상태를 `string[]`로 관리 (여러 개 동시 열림)
- [ ] toggle 로직 분기
  - single: 같은 값 → 닫기, 다른 값 → 교체
  - multiple: 배열에 있으면 제거, 없으면 추가
- [ ] 두 모드 모두 테스트해보기

**힌트:**

- toggle 함수 내부에서 `type`에 따라 분기하면 됨
- 타입스크립트 유니온 타입 활용: props 자체를 `SingleProps | MultipleProps`로 나눌 수도 있음

---

## Day 3: disabled 상태 + defaultValue 지원

**목표:** 특정 아이템 클릭 불가 + 초기 열림 상태 설정

**할 일:**

- [ ] `AccordionItem`에 `disabled` prop 추가
- [ ] disabled일 때 클릭 무시 처리
- [ ] disabled 스타일 적용 (opacity 낮추기, cursor 변경 등)
- [ ] `Accordion`의 `defaultValue` prop으로 초기 열림 상태 설정
- [ ] defaultValue가 single일 때, multiple일 때 각각 동작 확인

**힌트:**

- disabled 체크는 `AccordionTrigger`의 onClick 안에서 하면 됨
- ItemContext에 disabled 값을 넣어두면 Trigger/Content 모두 접근 가능
- defaultValue는 `useState`의 초기값으로 넣으면 끝

---

## Day 4: 키보드 접근성 (ArrowUp/Down, Enter, Space)

**목표:** 키보드만으로 아코디언 조작 가능하게 만들기

| Key       | 동작           |
| --------- | -------------- |
| Enter     | 열기/닫기      |
| Space     | 열기/닫기      |
| ArrowDown | 다음 헤더 이동 |
| ArrowUp   | 이전 헤더 이동 |

**할 일:**

- [ ] `AccordionTrigger`를 `<button>` 태그로 변경 (Enter/Space 자동 지원)
- [ ] `Accordion` 레벨에서 `onKeyDown` 핸들러 추가
- [ ] trigger ref 배열 관리 (각 trigger의 DOM 참조 수집)
- [ ] ArrowDown: 다음 trigger로 focus 이동
- [ ] ArrowUp: 이전 trigger로 focus 이동
- [ ] disabled 아이템은 포커스 이동 시 건너뛰기

**힌트:**

- `useRef`로 trigger 배열 관리하거나, Context를 통해 register/unregister 패턴 사용
- 현재 포커스된 요소의 인덱스를 찾고, ±1 해서 다음 요소에 `.focus()` 호출
- 처음/끝에서 순환할지 말지는 자유 (순환 추천)

---

## Day 5: ARIA 속성 적용

**목표:** 스크린 리더가 아코디언 구조를 이해할 수 있게 만들기

**할 일:**

- [ ] `AccordionTrigger`에 `aria-expanded={isOpen}` 추가
- [ ] `AccordionTrigger`에 `aria-controls={panelId}` 추가
- [ ] `AccordionContent`에 `role="region"` 추가
- [ ] `AccordionContent`에 `aria-labelledby={triggerId}` 추가
- [ ] `AccordionContent`에 `id={panelId}` 추가
- [ ] `AccordionTrigger`에 `id={triggerId}` 추가
- [ ] id 생성 규칙 통일 (예: `accordion-trigger-{value}`, `accordion-panel-{value}`)

**힌트:**

- id는 `value` 기반으로 만들면 고유성 보장됨
- `useId()` (React 18+) 써도 좋지만, value 기반이 더 직관적

---

## Day 6: 열림/닫힘 애니메이션

**목표:** 콘텐츠가 부드럽게 열리고 닫히기

**할 일:**

- [ ] 콘텐츠를 조건부 렌더링 대신 항상 DOM에 유지
- [ ] `data-state="open" | "closed"` 속성 추가
- [ ] CSS transition 적용 (방법 택 1)
  - 방법 A: `grid-template-rows: 0fr → 1fr`
  - 방법 B: `max-height: 0 → auto` (JS로 높이 계산 필요)
  - 방법 C: CSS `@starting-style` + `interpolate-size` (최신 브라우저)
- [ ] `overflow: hidden` 처리
- [ ] 열릴 때 / 닫힐 때 모두 자연스러운지 확인

**힌트:**

- 가장 간단한 건 grid 트릭:
  ```css
  .content-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
  }
  .content-wrapper[data-state="open"] {
    grid-template-rows: 1fr;
  }
  .content-inner {
    overflow: hidden;
  }
  ```
- 닫힐 때 바로 unmount하면 애니메이션이 안 보임. 항상 렌더링하되 높이만 조절!

---

## Day 7: Controlled / Uncontrolled 지원

**목표:** 외부에서 상태를 주입할 수도 있고, 내부에서 알아서 관리할 수도 있게

```tsx
// Uncontrolled (내부 상태 관리)
<Accordion type="single" defaultValue={["item-1"]} />

// Controlled (외부 상태 주입)
<Accordion type="single" value={value} onValueChange={setValue} />
```

**할 일:**

- [ ] `value` prop 추가 (controlled 모드용)
- [ ] `onValueChange` prop 추가 (상태 변경 콜백)
- [ ] controlled 판별 로직: `value !== undefined`이면 controlled
- [ ] controlled일 때: 내부 setState 대신 `onValueChange` 호출
- [ ] uncontrolled일 때: 기존처럼 내부 상태 사용
- [ ] 두 모드 모두 동작 확인

**힌트:**

- `useControllableState` 커스텀 훅으로 추상화하면 깔끔:
  ```ts
  function useControllableState<T>(
    controlledValue: T | undefined,
    defaultValue: T,
    onChange?: (v: T) => void,
  ) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internal;
    const setValue = (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };
    return [value, setValue] as const;
  }
  ```

---

## 보너스: 완성 후 체크리스트

- [ ] 모든 모드 조합 테스트 (single + controlled, multiple + uncontrolled 등)
- [ ] 키보드로만 전체 조작 가능한지 확인
- [ ] 크롬 개발자도구 → Accessibility 탭에서 트리 구조 확인
- [ ] 코드 정리 및 파일 분리 (Accordion/, index.ts, 각 서브컴포넌트)
- [ ] README에 사용법 예시 추가
