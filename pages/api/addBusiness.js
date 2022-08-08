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

    if (
      !body?.email ||
      !body?.companyName ||
      !body?.address ||
      !body?.contact ||
      !body?.website ||
      !body?.industry ||
      !body?.workforce ||
      !body?.description
    ) {
      res.status(400).send({
        error: `Body paramenter(s) invalid, Parameters : email, password, name`,
      });

      return resolve();
    }

    const db = await initDB();
    try {
      const email = body?.email;
      const businessRef = doc(db, "business", email);

      const business = await getDoc(businessRef);

      if (business.exists()) {
        res.status(400).send({ error: "Business already exists" });
        return resolve();
      }

      const obj = {
        email,
        companyName: body?.companyName,
        address: body?.address,
        contact: body?.contact,
        website: body?.website,
        industry: body?.industry,
        workforce: body?.workforce,
        description: body?.description,
      };

      await setDoc(businessRef, obj);

      res.status(200).send({ success: true });
      return resolve();
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "addBusiness" });
      return resolve();
    }
  });
}
