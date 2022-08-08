import { doc, getDoc, setDoc } from "firebase/firestore";
import { initDB } from "../../lib/initDB";

export default async function places(req, res) {
  return new Promise(async (resolve) => {
    if (req.method !== "POST") {
      res.status(405).send({
        error: `Method NOT allowed. Use POST method`,
      });
      return resolve();
    }

    const body = JSON.parse(req.body);

    if (!body?.email || !body?.password || !body?.name) {
      res.status(400).send({
        error: `Body paramenter(s) invalid, Parameters : email, password, name`,
      });
      return resolve();
    }

    const db = await initDB();
    try {
      const email = body.email;
      const userRef = doc(db, "users", email);
      const user = await getDoc(userRef);

      if (user.exists()) {
        res.status(400).send({ error: "User already exists" });
        return resolve();
      }
      const obj = {
        email: body?.email,
        password: body?.password,
        name: body?.name,
      };

      await setDoc(userRef, obj);
      res.status(200).send({ success: true });
      return resolve();
    } catch (err) {
      console.log(err);
      res.status(500).send({ unique: false, error: "addUser" });
      return resolve();
    }
  });
}
