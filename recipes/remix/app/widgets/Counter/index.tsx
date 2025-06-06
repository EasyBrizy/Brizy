import { useState } from "react";
import minusImg from "~/assets/minus.png";
import plusImg from "~/assets/plus.png";
import "./index.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="custom-counter">
      <button className="custom-counter__decrement" onClick={() => setCount(count - 1)}>
        <img height={20} width={20} src={minusImg} alt="decrement" />
      </button>
      <div className="custom-counter__count">{count}</div>
      <button className="custom-counter__increment" onClick={() => setCount(count + 1)}>
        <img height={20} width={20} src={plusImg} alt="increment" />
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
  icon: "nc-counter-outline",
  title: "Counter",
  category: "custom",
};
