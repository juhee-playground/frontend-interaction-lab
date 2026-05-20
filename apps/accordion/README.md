# 요구사항

## **과제 목표**

재사용 가능한 Accordion 컴포넌트를 구현하세요.

단순히 UI만 구현하는 것이 아니라,

상태 흐름과 컴포넌트 인터랙션을 어떻게 설계하는지를 확인하기 위한 과제입니다.

---

## **기술 조건**

### **필수**

- React
- TypeScript

---

### **선택 가능**

- 스타일링 방식 자유
  - CSS
  - Tailwind CSS
  - styled-components
  - emotion
  - SCSS

---

## **구현 요구사항**

### **1. 기본 Accordion 동작**

#### **요구사항**

- 헤더 클릭 시 콘텐츠가 열려야 합니다. V
- 다시 클릭하면 닫혀야 합니다. V
- 여러 개의 Accordion Item을 렌더링할 수 있어야 합니다. ???

---

### **2. 단일 열림 모드**

#### **요구사항**

옵션에 따라:

- 하나만 열리도록(single mode) V
- 여러 개 동시에 열리도록(multiple mode)

구현하세요.

---

### **3. 기본 열림 상태 지원**

#### **요구사항**

초기 렌더 시 특정 아이템이 열려 있을 수 있어야 합니다. V

### **4. disabled 상태 지원**

#### **요구사항**

특정 아이템은 클릭할 수 없어야 합니다. ????

### **5. 애니메이션 처리**

#### **요구사항**

콘텐츠 열림/닫힘 시 자연스러운 애니메이션을 적용하세요.
구현 방식은 자유입니다.

---

## **접근성(a11y) 요구사항**

### **필수 구현**

#### **keyboard interaction**

다음 키보드 동작을 지원하세요.

| **Key**   | **동작**       |
| --------- | -------------- |
| Enter     | 열기/닫기      |
| Space     | 열기/닫기      |
| ArrowDown | 다음 헤더 이동 |
| ArrowUp   | 이전 헤더 이동 |

### **aria 속성**

적절한 aria 속성을 적용하세요.

예:

- aria-expanded
- aria-controls
- role

---

## **추가 요구사항**

### **controlled / uncontrolled 지원**

둘 다 지원해보세요.

```jsx
<Accordion value={value} onValueChange={setValue} />
```

## **컴포넌트 API 요구사항**

```jsx
<Accordion type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>

    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## 구현 전 질문사항

1. 상태 소유자는 누구인가?(누가 열린 상태를 제어하는가?)

- 아코디언 자신? 로컬 UI의 상태
  [이 질문으로 바꿔야할 것 같다.]
  열림 상태는 내부에서 관리할 것인가? unControlled로 먼저 만들고
  아니면 부모가 제어할 수 있어야 하는가? Controlled로 확장가능하게 리펙토링

2. 이 컴포넌트 역할은 어디까지인가?(무엇을 책임지고 무엇을 책임지지 않는가?)
   [책임지는 것]

- 열기/닫기
- 하나만 열기, 여러개 열기
- keyboard navigation
- accessbillity
- animation

[책임지지 않는 것]

- 내부 데이터 fetching
- 서버 상태
- 비즈니스 로직

=> 아코디언은 단순 UI

3. 인터랙션 종류는 무엇인가?(사용자는 어떤 방식으로 조작할 수 있는가?)

- hover
- focus
- keyboard
  - Enter 키?
  - Space 키?
  - 방향키 이동?
  - 탭 이동?
  - screen reader?
- mobile touch

마우스만 지원하는가?
키보드 사용도 고려하는가?

=> 마우스, 키보드 지원

4. 상태 변경 시 영향 범위는 어디까지인가?
   성능 최적화가 필요한 수준인가?

아코디언은 최적화까지는 필요없을듯.. 안에 내용물이 100개 이상 될것 까지는 않음.
열림상태 하나 바꿀때 전체 아이템이 다 레렌더 되면 안됨.

5. 훅으로 분리해야 하는가?

- 일단 처음엔 분리할 필요 없어보임. 복잡한 UI가 아니라 간단한 컴포넌트여서

6. 접근성 처리는 어떻게 할 것인가?

- Button 태그 사용할까?
- aria-expand
- aria-contols
- focus 이동

7. 컴포넌트 API는 직관적인가?

컴포넌트 API 는 props로 받는애들인거 깉다. 사용자가 이해하기 쉽게 구현하기
