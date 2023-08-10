import { useState } from "react";
import "./App.css";
import LoginFormYup from "./componentes/LoginFormYup";

function App() {
  const [members, setMembers] = useState([]);

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  return (
    <>
      <div className="App">
        <h1>Kayıtlı Üyeler</h1>
        {members.length > 0 && (
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {member.name} - {member.email}
              </li>
            ))}
          </ul>
        )}
      </div>
      <LoginFormYup addMember={addMember} />
    </>
  );
}

export default App;
