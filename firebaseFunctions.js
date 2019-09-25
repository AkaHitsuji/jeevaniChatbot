const CITIZENS = 'citizens';

module.exports.checkIfusernameExists = async (db, username) => {
  const citizenRef = db.collection(CITIZENS).doc(username);
  let getDoc = await citizenRef.get();
  if (!getDoc.exists) {
    return null;
  } else {
    const data = getDoc.data();
    return data;
  }
};

module.exports.addIdToDatabase = async (db, name, charID) => {
  let docRef = db.collection(CITIZENS).doc(name);
  try {
    let updated = await docRef.update({ chatID: charID });
    return updated;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.removeChatID = async (db, username) => {
  const docRef = db.collection(CITIZENS).doc(username);
  try {
    let updated = await docRef.update({ chatID: '' });
    return updated;
  } catch (err) {
    console.log(err);
    return err;
  }
};
