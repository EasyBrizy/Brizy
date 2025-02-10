import Image from "next/image";
import { useState } from "react";
import minusImg from "./img/minus.png";
import plusImg from "./img/plus.png";
import "./index.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="custom-counter">
      <button className="custom-counter__decrement" onClick={() => setCount(count - 1)}>
        <Image height={20} width={20} src={minusImg} alt="decrement" />
      </button>
      <div className="custom-counter__count">{count}</div>
      <button className="custom-counter__increment" onClick={() => setCount(count + 1)}>
        <Image height={20} width={20} src={plusImg} alt="increment" />
      </button>
    </div>
  );
};

export const CounterModule = {
  id: "Brizy.ThirdParty.Counter",
  component: {
    editor: Counter,
    view: Counter,
  },
  title: "Counter",
  category: "custom",
};
