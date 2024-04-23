import sql from "better-sqlite3";
const db = sql(process.env.DBNAME);
export async function registerNewUser(data) {
  const { firstname, lastname, password, passwordagain, email } = data;

  try {
    var result = await db
      .prepare(
        `
    INSERT INTO authors (firstname, lastname, password , email , role) VALUES ('${firstname}' , '${lastname}' , '${password}' ,'${email}' ,'author');
    `
      )
      .run();
  } catch (err) {
    console.log(err);
  } finally {
    return result;
  }
}

export async function getUserByEmail(email) {
  // check user exist on db
  const result = await db
    .prepare(
      `
    SELECT * FROM authors WHERE email = '${email}';
    `
    )
    .get();

  return result;
}

export async function savePen({ html, css, js, title, authorid }) {
  console.log(html, css, js, title, authorid);
  const summary = ""; // initial value
  const likes = 0; // initial value

  try {
    var result = db
      .prepare(
        `
    INSERT INTO pens (htmlcode, csscode,  jscode , title , likes , summary , authorid)
    VALUES ('${html}' , '${css}' , '${js}', '${title}','${likes}' , '${summary}' , '${authorid}');
    `
      )
      .run();
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}

export async function findPenById(id) {
  const result = await db
    .prepare(
      `
  SELECT * FROM pens WHERE id = '${id}';
  `
    )
    .get();

  return result;
}

export async function deletePenById(id) {
  const result = await db
    .prepare(
      `
    DELETE FROM pens
    WHERE id = ${id};
`
    )
    .run();

  return result;
}
export async function updateSummary(id, summary) {
  const result = await db
    .prepare(
      `
    UPDATE pens
    SET summary = '${summary}'
    WHERE id = ${id};
`
    )
    .run();

  return result;
}
