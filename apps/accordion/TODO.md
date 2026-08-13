# Accordion --- Week 1 TODO

## 이번 주 목표

**Accordion 하나를 반복해서 이해하고 직접 구현한다.**

이번 주에는 기능 욕심을 줄인다.

- 기본 상태 흐름
- Compound Component
- Context
- single / multiple
- defaultValue / disabled
- 기본 접근성

`controlled / uncontrolled`, animation, 테스트는 다음 단계로 넘긴다.

---

## Day 1 --- 기존 코드 기억 복구 ✅

### 목표

기존 Accordion 코드를 수정하기 전에
**상태가 어디에 있고 어떻게 흐르는지 다시 이해한다.**

### 확인할 것

- [x] `openValue`는 어디에 있는가?
- [x] 누가 열린 상태를 소유하는가?
- [x] `toggle` 함수는 어디에 있는가?
- [x] 클릭하면 결국 어떤 함수가 호출되는가?
- [x] `AccordionContext`에는 무엇이 들어가는가?
- [x] `AccordionItemContext`에는 무엇이 들어가는가?
- [x] Context가 왜 2개인가?
- [x] Trigger → Content까지 상태 흐름을 설명할 수 있는가?

### 종료 조건

코드 없이 아래 흐름을 설명할 수 있다.

Trigger 클릭
→ toggle(itemValue)
→ Accordion의 openValue 변경
→ Content가 openValue 확인
→ 화면 변경

---

## Day 2 --- Context 없이 기본 Accordion 다시 만들기

### 목표

기존 Accordion을 최대한 보지 않고
**가장 단순한 상태 흐름부터 직접 만든다.**

### 제한

- Context ❌
- Compound Component ❌
- single / multiple 구분 ❌
- 접근성 확장 ❌

### 할 일

- [ ] Item 3개 만들기
- [ ] 열린 Item을 표현할 state 직접 결정하기
- [ ] Header 클릭 → Content 열기
- [ ] 같은 Header 클릭 → 닫기
- [ ] 다른 Header 클릭 → 기존 Content 닫고 새 Content 열기

### 생각할 질문

- 열린 상태에는 무엇을 저장해야 할까?
- `boolean` 하나면 충분할까?
- 여러 Item 중 누가 열렸는지는 어떻게 구분할까?
- Header 클릭이 어떻게 Content 변경까지 이어질까?

### 종료 조건

Context 없이 아래 흐름을 직접 구현하고 설명한다.

Header 클릭
→ state 변경
→ 해당 Content 표시

---

## Day 3 --- Compound Component + Context로 변경

### 목표

Day 2에서 만든 코드를 아래 API로 바꾼다.

```tsx
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

### 할 일

- [ ] 컴포넌트를 역할별로 분리
- [ ] props drilling이 어디서 생기는지 확인
- [ ] AccordionContext 만들기
- [ ] openValue, toggle 전달
- [ ] AccordionItemContext 만들기
- [ ] itemValue 전달
- [ ] Trigger에서 필요한 Context 읽기
- [ ] Content에서 필요한 Context 읽기

### 생각할 질문

- Context 없이 만들었을 때 무엇이 불편했나?
- openValue와 toggle은 누구의 값인가?
- itemValue는 누구의 값인가?
- 왜 Context를 2개로 나누는가?

### 종료 조건

Context를 단순히 `“필요하니까”` 넣는 게 아니라 어떤 props 전달 문제를 해결했는지 설명할 수 있다.

---

## Day 4 --- single / multiple 상태 설계

### 목표

UI보다 **상태 모델링과 toggle 로직**에 집중한다.

### 구현 전에 먼저 적기

```text
single
같은 값을 누르면?
다른 값을 누르면?

multiple
배열에 이미 있으면?
배열에 없으면?
```

### 상태 모델

```text
single
→ string | null

multiple
→ string[]
```

### 할 일

- [ ] `type: "single" | "multiple"` 정의
- [ ] single 상태 구조 결정
- [ ] multiple 상태 구조 결정
- [ ] single: 같은 Item 클릭 → 닫기
- [ ] single: 다른 Item 클릭 → 교체
- [ ] multiple: 닫힌 Item 클릭 → 추가
- [ ] multiple: 열린 Item 클릭 → 제거
- [ ] 두 모드 직접 테스트

### 종료 조건

코드를 보지 않고 위 4가지 경우의 다음 state가 무엇이 되어야 하는지 말할 수 있다.

---

## Day 5 --- defaultValue + disabled

### 목표

props가 초기 상태와 사용자 인터랙션에 어떤 영향을 주는지 이해한다.
Accordion의 기본 기능을 마무리한다.

#### defaultValue

- 초기 열린 상태 설정
- single에서 확인
- multiple에서 확인

#### 생각할 질문

- `defaultValue`와 현재 `openValue`는 무엇이 다른가?
- 왜 `if (disabled) return`보다 `<button disabled>`가 좋은가?
- disabled 정보는 Trigger까지 어떻게 전달할까?
- defaultValue는 언제 사용되는가?

#### disabled

- AccordionItem에 disabled 추가
- disabled를 Trigger까지 전달
- <button disabled> 적용
- disabled Item 클릭 방지
- disabled 스타일 확인

#### 생각할 것:

- disabled는 Accordion 전체의 값인가?
- Item의 값인가?
- 어느 Context에 있어야 할까?

#### 기본 접근성

- Trigger가 <button>인지 확인
- Enter 동작 확인
- Space 동작 확인
- Tab focus 확인
- aria-expanded 적용
- aria-controls 적용
- Trigger / Content id 연결

### 할 일

- [ ] `defaultValue`로 초기 열린 상태 설정
- [ ] single의 `defaultValue` 확인
- [ ] multiple의 `defaultValue` 확인
- [ ] `AccordionItem`에 `disabled` 추가
- [ ] Trigger에 실제 `<button disabled>` 적용
- [ ] disabled Item이 클릭되지 않는지 확인
- [ ] disabled Item의 스타일 표현

### 종료 조건

`defaultValue`와 `disabled`가 각각 **상태 초기화 / 인터랙션 제한**이라는
차이를 설명할 수 있다.

---

## 이번 주 회고

- State 소유자를 찾을 수 있는가?
- Context가 필요한 이유를 설명할 수 있는가?
- Context를 어떤 범위로 나눌지 판단할 수 있는가?
- single / multiple의 상태 차이를 설명할 수 있는가?
- 가장 많이 막힌 부분은 무엇인가?
- React 개념 때문이었나?
- JavaScript / TypeScript 문법 때문이었나?

## Day 6 --- 기본 접근성 + 키보드

### 목표

마우스 없이 Accordion을 사용할 수 있게 만든다.

### 먼저 확인

`AccordionTrigger`가 `<button>`이라면:

- Enter → 기본 지원
- Space → 기본 지원
- Tab → 기본 focus 이동

따라서 중복 구현하지 않는다.

### 할 일

- [ ] Trigger가 `<button>`인지 확인
- [ ] `aria-expanded` 적용
- [ ] `aria-controls` 적용
- [ ] Trigger / Content 연결용 id 적용
- [ ] Content에 적절한 ARIA 관계 설정
- [ ] ArrowDown으로 다음 Trigger focus
- [ ] ArrowUp으로 이전 Trigger focus
- [ ] disabled Trigger를 어떻게 건너뛸지 생각하기

### 생각할 질문

- 브라우저가 이미 해주는 키보드 동작은 무엇인가?
- 우리가 직접 구현해야 하는 것은 무엇인가?
- focus 이동을 위해 어떤 DOM 정보가 필요한가?

### 종료 조건

마우스를 사용하지 않고 Accordion을 조작해본다.

---

## 다음주 시작할 때

## Day 7 --- 처음부터 다시 만들기

### 목표

이번 주의 진짜 테스트.

**기존 Accordion 구현을 최대한 보지 않고 새 파일에서 다시 만든다.**

### 구현 순서도 스스로 결정하기

- [ ] 필요한 컴포넌트 구성 생각하기
- [ ] 상태 소유자 결정하기
- [ ] 상태 타입 결정하기
- [ ] 기본 toggle 구현
- [ ] Compound Component 구성
- [ ] Context 구성
- [ ] single / multiple 구현
- [ ] defaultValue 적용
- [ ] disabled 적용
- [ ] 기본 ARIA 적용

막힌 부분은 표시만 하고 가능한 곳까지 계속 진행한다.

### 마지막 회고

- [ ] 가장 쉽게 구현된 부분은?
- [ ] 아직 기억이 안 나는 부분은?
- [ ] React 개념 문제였나, JavaScript 문법 문제였나?
- [ ] TypeScript에서 가장 막힌 부분은?
- [ ] 처음 Day 1 코드보다 지금 구조를 더 잘 설명할 수 있는가?

### 성공 기준

완벽하게 외워서 만드는 것이 목표가 아니다.

> 무엇을 만들어야 하는지 스스로 쪼개고, 상태 흐름을 설계하고, 모르는
> 부분을 정확히 특정할 수 있으면 성공.

---

# 다음 주 후보 --- 아직 하지 않기

이번 주를 끝낸 뒤 진행 여부를 결정한다.

- [ ] Controlled / Uncontrolled
- [ ] `onValueChange`
- [ ] `useControllableState`
- [ ] open / close animation
- [ ] 파일 구조 정리
- [ ] 테스트 작성
- [ ] README 사용 예제
