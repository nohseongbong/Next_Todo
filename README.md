# Front Interview with Nextjs

<p align='center'>
    <img src="https://img.shields.io/badge/Typescript-2C8EBB?style=for-the-badge&logoColor=blue&logo=typescript" alt='TypeScript'/>
    <img src="https://img.shields.io/badge/pnpm-2C8EBB?style=for-the-badge&logo=pnpm&logoColor=blue" alt='PNPM'/>
    <img src="https://img.shields.io/badge/nextjs-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20" alt="nextjs" />
     <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt='React Query'/>
    <img src="https://img.shields.io/badge/Zustand-FFD700?style=for-the-badge&logo=zustand" alt='Zustand'/>
    <br />
</p>

## 프로젝트 소개

해당 프로젝트는 Web Frontend 기술을 연습하기 위해 만든 Todo List 프로젝트입니다.\
Restful Api 를 axios를 통해 CRUD(Create,Read,Update,Delete) 기능 구현 \
React-Qeury 로 Server State 관리, Zustand 로 Client State 관리를 구현했습니다.

## 시작하기 전에

먼저 의존성을 설치합니다.

```bash
pnpm i
```

## 시작하기

먼저 개발 서버를 실행합니다:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## 폴더 구조 설명

---

```text
public/
|_ favicon.ico
|_ assets/
  |_ images/               # 이미지 파일이 들어갑니다.
  |_ icons/                # 아이콘 파일이 들어갑니다.
  |_ ...                   # 기타 파일은 폴더를 만들어 관리하며 파일명은 소문자와 - 로만 구성.

src/                        # 개발 관련 파일들은 src 밑으로 들어갑니다.
|_ api/                               # api들은 이 폴더에 들어갑니다.
|_ component/                         # 컴포넌트들은 이 폴더에 들어갑니다.
  |_ register/                        # /register/... 페이지에 관련된 파일들은 이 폴더에 들어갑니다.
    |_ RegisterVerifyEmailForm/       # 컴포넌트 이름은 PascalCase 로 작성.
      |_ index.tsx                    # 컴포넌트 파일은 index.tsx 로 작성.
      |_ style.module.css             # 컴포넌트 스타일 파일은 style.module.css 로 작성.
|_ hook/                              # 커스텀 훅들은 이 폴더에 들어갑니다.
|_ lib/                               # lib은 이 폴더에 들어갑니다.
|_ pages/
  |_ login/
    |_ index.tsx                      # 예시 1-1 /login
  |_ register/
    |_ index.tsx                      # 예시 1-2 /register
    |_ verify-email.tsx               # 예시 2 /register/verify-email
  |_ list/
    |_ [idx].tsx                      # 예시 3 /list/1
|_ store/                             # 상태관리는 이곳에서 합니다.
|_ style/                             # css들은 이 폴더에 들어갑니다.
|_ util/                              # 유틸 함수들은 이 폴더에 들어갑니다.
```

## API routes Info

[ post ]`api/login` :

```ts
//로그인
type Req = {
  email: string;
  password: string;
};

type Res = {
  accessToken: string;
  refreshToken: string;
};
```

[ post ]`api/renew` :

```ts
//Access Token 갱신
type Req = {
  accessToken: string;
  refreshToken: string;
};
type Res = {
  accessToken: string;
};
```

[ get ]`api/todo` :

```ts
//Todo List
type Req = {};

type Res_Todo = {
  id: number;
  userId: string;
  title: string;
  content: string;
}[];
```

[ post ]`api/todo` :

```ts
//Todo Detail
type Req = {
  title: string;
  content: string;
};

//Res
type Todo = {
  id: number;
  userId: string;
  title: string;
  content: string;
};
//status 400 Error
type Res = {
  message: string;
};
```

[ put ]`api/todo` :

```ts
//Todo Detail
type Req = {
  id: number;
  title: string;
  content: string;
};

//status 201
type Res = {
  message: "Todo updated successfully";
};
//status 400 Error
type Res = {
  message: string;
};
```

[ delete ]`api/todo` :

```ts
//Todo Detail
type Req = {
  id: number;
};
//status 201
type Res = {
  message: "Todo deleted successfully";
};
//status 400 Error
type Res = {
  message: string;
};
```

[ get ]`api/todoDetail` :

```ts
//Todo Detail
type Res = {
  id: number;
};

//status 400 Error
type Res = {
  message: string;
};
```

## 기술 스택

```sh
Next.js && Typescript && Axios && Zustand && React Query
```

## Commit Convention

- `feat`: 새로운 기능과 관련된 것을 의미한다.
- `fix`: 오류와 같은 것을 수정했을 때 사용한다.
- `style`: 코드의 변화와 관련없는 포맷이나 세미콜론을 놓친 것과 같은 부분들을 의미한다.
- `test`: test를 추가하거나 수정했을 때를 의미한다.
- `dependency`: 코드 의존성 추가나 삭제 되었을 때 사용한다.
- `build`: 빌드
- `ci`: docker 관련 ci/cd
- `docs`: 문서와 관련하여 수정한 부분이 있을 때 사용한다. (ex) README 수정
- `refactor`: 코드의 리팩토링을 의미한다.
- `revert`: git 꼬였을때 revert 커밋.
