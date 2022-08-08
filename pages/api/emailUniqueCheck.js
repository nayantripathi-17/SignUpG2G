import { doc, getDoc } from "firebase/firestore";
import { initDB } from "../../lib/firebase/initDB";

export default async function places(req, res) {
  return new Promise(async (resolve) => {
    if (req.method !== "GET") {
      res.status(405).send({
        error: `Method NOT allowed. Use GET method`,
      });
      return resolve();
    }

    const { email } = req.query;
    if (
      email === undefined ||
      email === "" ||
      email === "undefined" ||
      Array.isArray(email)
    ) {
      res.status(400).send({
        error: `URL parameter search=<NonEmptyString>`,
        unique: false,
      });
      return resolve();
    }

    const db = await initDB();
    try {
      const user = await getDoc(doc(db, "users", email));

      if (user.exists()) {
        res.status(200).send({ unique: false });
        return resolve();
      } else {
        res.status(200).send({ unique: true });
        return resolve();
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ unique: false, error: "emailUniqueCheckApi" });
      return resolve();
    }
  });
}
