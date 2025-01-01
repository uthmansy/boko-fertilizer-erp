import React, { useRef, useState } from "react";
import { Layout, Tabs, theme } from "antd";
import PosSider from "./PosSider";

const { Content } = Layout;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: "CHECKOUT 1", children: <span>hello</span>, key: "1" },
];

const PosCheckout: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: `CHECKOUT ${newTabIndex.current + 1}`,
      children: <span>hello</span>,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Content
      className="m-5 mx-0 md:mx-5 p-5 md:p-10"
      style={{
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div className="flex space-x-10">
        <PosSider />
        <div className="flex-1">
          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
          />
        </div>
      </div>
    </Content>
  );
};

export default PosCheckout;
