import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Write() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: "tester1",
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // name 속성에 따라 업데이트
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(formData);

    await axios
      .post("http://localhost:8080/api/board", formData)
      .then((response) => {
        console.log(response);

        const idx = response.data.idx;
        console.log(idx);

        navigate(`/board/${idx}`);
      });
  }

  return (
    <>
      <Link to={"/board"}>뒤로가기</Link>
      <section>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" onChange={handleChange} />
          <textarea type="text" name="content" onChange={handleChange} />
          <button type="submit">작성</button>
        </form>
      </section>
    </>
  );
}
