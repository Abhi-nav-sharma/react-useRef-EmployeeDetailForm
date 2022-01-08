import { useEffect, useRef, useState } from "react";

export default function Form() {
  const [formState, setformState] = useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    maritalStatus: false,
    image: ""
  });

  const [imageSrc, setImageSrc] = useState(null);

  const imageRef = useRef(null);

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setformState({ ...formState, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setformState({ ...formState, image: file });
  };

  useEffect(() => {
    const file = imageRef.current.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
    } else {
      setImageSrc(null);
    }
    return () => {
      URL.revokeObjectURL(imageSrc);
    };
  }, [formState.image, imageSrc]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name- </label>
        <input
          value={formState.name}
          placeholder="enter name"
          type="text"
          name="name"
          onChange={handleFormUpdate}
        />
      </div>
      <br />
      <div>
        <label>Age- </label>
        <input
          value={formState.age}
          placeholder="enter age"
          type="number"
          name="age"
          onChange={handleFormUpdate}
        />
      </div>
      <br />
      <div>
        <label>Address- </label>
        <input
          value={formState.address}
          placeholder="enter address"
          type="text"
          name="address"
          onChange={handleFormUpdate}
        />
      </div>
      <br />
      <div style={{ marginLeft: "-100px" }}>
        <label>Department- </label>
        <select
          name="department"
          value={formState.department}
          onChange={handleFormUpdate}
        >
          <option value="" key="1">
            Select
          </option>
          <option value="Development" key="development">
            Development
          </option>
          <option vlaue="Testing" key="testing">
            Testing
          </option>
          <option vlaue="Support" key="support">
            Support
          </option>
        </select>
      </div>
      <br />
      <div>
        <label>Salary- </label>
        <input
          value={formState.salary}
          placeholder="enter salary per annum"
          type="number"
          name="salary"
          onChange={handleFormUpdate}
        />
      </div>
      <br />
      <div style={{ marginLeft: "-150px" }}>
        <label>Married- </label>
        <input
          name="maritalStatus"
          checked={formState.maritalStatus}
          onChange={handleFormUpdate}
          type="checkbox"
        />
      </div>
      <br />
      <div>
        <label>Profile Picture- </label>
        <input onChange={handleImageChange} ref={imageRef} type="file" />
        {imageSrc && (
          <div>
            Preview-
            <img width="100px" height="100px" src={imageSrc} alt="profile" />
          </div>
        )}
      </div>
      <br />
      <input value="Submit" type="submit" />
    </form>
  );
}
