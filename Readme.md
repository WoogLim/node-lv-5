Lv5

  0. 요구사항 정리 / ERD 설계 
1. Prettier 를 이용한 간격 설정
2. becrypt 암호화
3. 아이디/비밀번호 검증 Joi 라이브러리 이용 - 컨트롤러 단
4. Sequelize 트랜잭션 사용
5. 3 레이어 패턴 적용
6. 에러핸들링 미들웨어 구성
7. 엑세스, 리프레쉬 토큰

  + EsLint
  + 타입스크립트로 변경 작업
  + 에러핸들링 미들웨어에 에러 발생 시 slack으로 에러 로그 넘겨주기
  + Jest를 이용해 테스트 코드 작성하기
  + Elastic Redis 적용 + 리프레쉬 토큰


요구사항
---
1. 회원가입/로그인
	- 회원가입
	- 로그인

2. 게시글
	- 게시글 작성
	- 게시글 수정
	- 게시글 삭제
	- 게시글 조회 + 해당 게시글 좋아요, 
	- 게시글 목록 조회(검색)
	- 게시글 좋아요

3. 댓글
	- 댓글 작성
	- 댓글 수정
	- 댓글 삭제
	- 댓글 조회
  - 댓글 좋아요

4. 답글
	- 답글 작성
	- 답글 수정
	- 답글 삭제
	- 답글 조회
	- 답글 좋아요
	
5. 마이페이지
	- 내가 쓴 게시글 조회
	- 내가 쓴 댓글 조회 -> 어떤 게시글에 작성했는지,
	- 내가 좋아요한 게시글 조회
	- 내가 좋아요한 댓글 조회
	- 내가 좋아요한 답글 조회
	- 내가 쓴 답글 조회

migrate, model 생성
---
-- Users Table
npx sequelize model:generate --name Users --attributes userId:string,password:string,nickname:string,salt:string
-- UserInfos Table
npx sequelize model:generate --name UserInfos --attributes userInfoId:integer,userId:string,profileImage:string,name:string,age:integer,gender:integer,position:integer
-- Teams
npx sequelize model:generate --name Teams --attributes teamId:integer,userId:string,teamName:string,userRole:integer
-- Comments Table
npx sequelize model:generate --name Comments --attributes commentId:integer,postId:integer,userId:string,parentCommentId:integer,content:string
-- Posts Table
npx sequelize model:generate --name Posts --attributes postId:integer,userId:string,title:string,introduce:string,content:string,thumnail:string
-- PostImages Table
npx sequelize model:generate --name PostImages --attributes resourseId:integer,postId:integer,imageUrl:string
-- PostTags Table
npx sequelize model:generate --name PostTags --attributes postTagId:integer,postId:integer,tagId:integer
-- LikePosts Table
npx sequelize model:generate --name LikePosts --attributes likeId:integer,postId:integer,userId:string
-- LikeComments Table
npx sequelize model:generate --name LikeComments --attributes likeId:integer,commentId:integer,userId:string
-- CommonItems Table
npx sequelize model:generate --name CommonItems --attributes itemId:integer,itemClass:string,itemName:string
