import { useState } from "react";
import { useProperties } from "../useProperties";
import AddProperty from "./AdminProperty";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

type Property = {
  id: string;
  title?: string;
  price?: number;
  location?: string;
};

type LoginProps = {
  onLogin: (value: boolean) => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    onLogin(true);
  };

  return (
    <div>
      <h2>Admin login</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="hasło"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Zaloguj
      </button>
    </div>
  );
};

type PropertyListProps = {
  properties: Property[];
};

const PropertyList = ({
  properties,
}: PropertyListProps) => {
  const handleDelete = async (id: string) => {
    const { deleteDoc, doc } = await import(
      "firebase/firestore"
    );

    const { db } = await import(
      "../firebase/config"
    );

    await deleteDoc(doc(db, "properties", id));
  };

  return (
    <div>
      {properties.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            margin: 10,
            padding: 10,
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.price} zł</p>
          <p>{p.location}</p>

          <button
            onClick={() => handleDelete(p.id)}
          >
            Usuń
          </button>
        </div>
      ))}
    </div>
  );
};

const AdminPage = () => {
  const { properties } = useProperties();
  const [isLogged, setIsLogged] =
    useState<boolean>(false);

  if (!isLogged) {
    return <Login onLogin={setIsLogged} />;
  }

  return (
    <div>
      <h1>Panel admina</h1>

      <button onClick={() => signOut(auth)}>
        Wyloguj
      </button>

      <AddProperty />

      <PropertyList
        properties={properties}
      />
    </div>
  );
};

export default AdminPage;