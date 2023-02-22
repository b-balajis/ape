const FIREBASE_DOMAIN = "https://ape-code-default-rtdb.firebaseio.com/";

export async function signin(payload) {
  const type = payload[0];
  const uid = payload[1];
  console.log(type, uid);
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${type}/${uid}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  return data;
}

export async function renderPresentSem(dept) {
  const response = await fetch(`${FIREBASE_DOMAIN}/GMRIT/${dept}/batch/.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Data.");
  }

  return data;
}

export async function renderSubjects(payload) {
  const dept = payload[0];
  const sem = payload[1];
  const response = await fetch(
    `${FIREBASE_DOMAIN}/GMRIT/${dept}/Labs/${sem}/listofsubjects.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch Subjects.");
  }

  return data;
}

export async function renderQuestions(payload) {
  const dept = payload[0];
  const sem = payload[1];
  const subject = payload[2];
  const response = await fetch(
    `${FIREBASE_DOMAIN}/GMRIT/${dept}/Labs/${sem}/${subject}/questions.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  return data;
}

export async function fetchQuestion(payload) {
  const dept = payload[0];
  const sem = payload[1];
  const subject = payload[2];
  const question = payload[3];
  const response = await fetch(
    `${FIREBASE_DOMAIN}/GMRIT/${dept}/Labs/${sem}/${subject}/questions/${question}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  return data;
}

export async function marksAllotment(payload) {
  console.log(payload);
  const dept = payload[0];
  const sem = payload[1];
  const subject = payload[2];
  const jntu = payload[3];
  const qnum = payload[4];
  const result = payload[5];
  console.log(result, "api result");
  console.log(JSON.stringify(result));
  const response = await fetch(
    `${FIREBASE_DOMAIN}/GMRIT/${dept}/Labs/${sem}/${subject}/marks/${jntu}/${qnum}/marks.json`,
    {
      method: "PUT",
      body: (result),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function renderMarks(payload) {
  const sem = payload[0];
  const subject = payload[1];
  const marks = payload[2];
  const jntu = payload[3];
  const response = await fetch(
    `${FIREBASE_DOMAIN}/GMRIT/Labs/${sem}/${subject}/${marks}/${jntu}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  return data;
}

export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
