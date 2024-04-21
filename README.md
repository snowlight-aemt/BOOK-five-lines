## 정리

p39 좀 더 고급스러워 보이려고 노력하다가 어려움을 겪을 수 있는데, 보통은 그럴 만한 가치가 없습니다.  
메모: 메소드 추출, 동일한 수준의 추상화, 좋은 함수 이름의 속성

p45 규칙: `if` 문은 함수의 시작에만 배치 (함수가 한가지 일만...)  
메모: `if` 문으 이미 한 줄이고 이어진 `else if` 를 분리할 수 없기 때문에 메소드 추출을 적용할 수 없다.

p52 `if-else` 는 하드코딩된 결정으로 볼 수 있습니다. (의사결정)

p61 4.1.4 클래스로 코드 이관하기

p78 일반성 제거 : 너무 일반적이라는 것이 문제, 모든 Tile 타입을 제거할 수 있다. 이러한 **일반성** 은 유연성을 떨어지고 변경하기 어렵게 만듭니다.  
p80 메소드 전문화 : 일반화를 줄이고 더 특정화한 버전의 함수를 도입하는 이 과정을 **메서드 전문화** 라고 부름  
p81 프로그래머의 본능에 반하기에 좀 난해합니다. 프로그래머들은 일반화하고 재사용하려는 본능적인 욕구가 있지만 그렇게 하면 책임이 흐려지고 다양한 위치에서 코드를 호출할 수 있기 대문에 문제가 될 수 있다.

// TODO 5장 유사한 코드 융합  
p94 클래스에 있는 코드의 중복은 다 무엇일까? (대부분의 겨우 코드 중복을 좋지 않다) 

---

### 타입스크립트 컴파일러 (ts -> js)
설정 파일  
[tsconfig.json](tsconfig.json)  

실행 명령어
```bash
npx tsc -w
```

---
[추천 최범균 - 소개 파이브 라인스 오브 코드](https://www.youtube.com/watch?v=b4WCrnn0D8o)

---

# five-lines

In this kata your task is to refactor the code for a small game. When finished it should be easy to add new tile types, or make the key draw as a circle, so we can easily distinguish it from the lock. 

The code already abides by the most common principles "Don't Repeat Yourself", "Keep It Simple, Stupid", and there are only very few magic literals. There are no poorly structured nor deeply nested `if`s.

This is *not* an easy exercise.

# About the Game
In the game, you are a red square and have to get the box (brown) to the lower right corner. Obstacles include falling stones (blue), walls (gray), and a lock (yellow, right) that can be unlocked with the key (yellow, left). You can push one stone or box at a time, and only if it is not falling. The flux (greenish) holds up boxes and stones but can be 'eaten' by the player. 

![Screenshot of the game](game.png)

# How to Build It
Assuming that you have the Typescript compiler installed: Open a terminal in this directory, then run `tsc`. There should now be a `index.js` file in this directory.

# How to Run It
To run the game you need to first build it, see above. Then simply open `index.html` in a browser. Use the arrows to move the player.

# Thank You!
If you like this kata please consider giving the repo a star. You might also consider purchasing a copy of my book where I show a simple way to tackle code like this: [Five Lines of Code](https://www.manning.com/books/five-lines-of-code), available through the Manning Early Access Program.

[![Five Lines of Code](frontpage.png)](https://www.manning.com/books/five-lines-of-code)

If you have feedback or comments on this repo don't hesitate to write me a message or send me a pull request. 

Thank you for checking it out.

