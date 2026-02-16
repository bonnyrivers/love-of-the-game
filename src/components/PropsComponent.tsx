import React from "react";
type UserProps = {
  firstName: string;
  lastName: string;
  age: number;
};
const PropsComponent: React.FC<UserProps> = ({ firstName, lastName, age }) => {
  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{age}</p>
    </div>
  );
};

export default PropsComponent;
