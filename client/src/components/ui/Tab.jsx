import { Flex } from "@chakra-ui/react";
import clsx from "clsx";
export default function Tab({
  onClick,
  isActive = false,
  tabName = "New Tab",
}) {
  return (
    <Flex
      onClick={onClick}
      className={clsx(
        "shrink-0  p-3 border-[0.5px] border-slate-400   rounded-md border-dashed  cursor-pointer ",
        isActive ? "bg-slate-500" : "bg-slate-800"
      )}
    >
      {tabName}
    </Flex>
  );
}
