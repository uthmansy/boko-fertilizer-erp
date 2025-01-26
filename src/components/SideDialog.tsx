import { Drawer } from "antd";
import { animated, useTransition } from "@react-spring/web";
import useDialogStore from "../store/sideDialogs";

const SideDialog = () => {
  const { isVisible, content, title, hideDialog } = useDialogStore();

  const transitions = useTransition(isVisible, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: { tension: 300, friction: 30 },
  });

  return transitions(
    (style, item) =>
      item && (
        <animated.div style={style}>
          <Drawer
            title={title}
            placement="right"
            open={isVisible}
            onClose={hideDialog}
            width={window.innerWidth < 768 ? "100%" : 500}
            closable={true}
            className="[&_.ant-drawer-header]:border-b [&_.ant-drawer-body]:p-4 [&_.ant-drawer-title]:text-lg"
            styles={{
              body: { padding: 0 },
              header: {
                padding: "16px 24px",
                borderBottom: "1px solid #f0f0f0",
              },
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4">{content}</div>
              <div className="border-t p-4 mt-auto">
                <button
                  onClick={hideDialog}
                  className="ant-btn ant-btn-primary w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </Drawer>
        </animated.div>
      )
  );
};

export default SideDialog;
