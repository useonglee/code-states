/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-1. user 테이블에 존재하는 모든 컬럼을 포함한 모든 데이터를 확인하기 위한 SQL을 작성해주세요.
*/
const PART4_1 = `SHOW DATABASES;`;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-2. user 테이블에 존재하는 모든 데이터에서 name 컬럼만을 확인하기 위한 SQL을 작성해주세요.
*/
const PART4_2 = `SELECT name FROM user;`;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-3. user 테이블에 데이터를 추가하기 위한 SQL을 작성해주세요.
        - 원하는 name, email을 사용하시면 됩니다.
*/
const PART4_3 = `
                 INSERT INTO user (name, email) 
                 VALUE ('user1', 'user1@naver.com');
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-4. user 테이블에서 특정 조건을 가진 데이터를 찾기위한 SQL을 작성해주세요.
        - 조건 : name이 duhyunkim이여야 합니다.
*/
const PART4_4 = `
                 SELECT name 
                 FROM user 
                 WHERE name = 'duhyunkim';
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-5. user 테이블에서 특정 조건을 가진 데이터를 찾기위한 SQL을 작성해주세요.
        - 조건 : name이 duhyunkim이 아니여야 합니다.
*/
const PART4_5 = `
                 SELECT name 
                 FROM user 
                 WHERE name <> 'duhyunkim';
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-6. content 테이블에 존재하는 모든 데이터에서 title 컬럼만을 찾기 위한 SQL을 작성해주세요.
*/
const PART4_6 = `
                 SELECT title 
                 FROM content;
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-7. content의 title과 그 컨텐츠를 작성한 user의 name을 찾기 위한 SQL을 작성해주세요.
        - 저자가 없더라도, 켄턴츠의 title을 모두 찾아야합니다.
*/
const PART4_7 = `
                 SELECT title, name 
                 FROM content, user 
                 WHERE content.id = user.id;
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-8. content의 title과 그 컨텐츠를 작성한 user의 name을 찾기 위한 SQL을 작성해주세요.
        - 저자가 있는 컨텐츠의 title만 찾아야합니다.
*/
const PART4_8 = `
                 SELECT title, name 
                 FROM content INNER JOIN user
                 ON content.userId = user.id;
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-9. content의 데이터를 수정하기 위한 SQL을 작성해주세요.
        - title이 database sprint인 content 데이터에서 body를 database is very easy로 수정해야합니다.
*/
const PART4_9 = `
                 UPDATE content
                 SET body = 'database is very easy'
                 WHERE title = 'database sprint';
                `;

/*
----------------------------------------------------------------------------------------------
    TODO: Q 4-10. content의 데이터를 추가하기 위한 SQL을 작성해주세요.
        - duhyunkim이 작성한 컨텐츠를 추가해주세요. 제목과 본문은 자유입니다. (참고: duhyunkim의 아이디는 1입니다.)
*/
const PART4_10 = `
                 INSERT INTO content(title, body, userId)
                 VALUES ('code states', 'very good', 1);
                `;

module.exports = {
  PART4_1,
  PART4_2,
  PART4_3,
  PART4_4,
  PART4_5,
  PART4_6,
  PART4_7,
  PART4_8,
  PART4_9,
  PART4_10,
};
