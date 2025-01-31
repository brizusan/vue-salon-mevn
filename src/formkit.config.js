import { genesisIcons } from "@formkit/icons";
import { generateClasses } from "@formkit/themes";

const config = {
  icons: genesisIcons,
  config: {
    classes: generateClasses({
      global: {
        form: "w-full border border-slate-600 rounded-md p-4 max-w-[650px] mx-auto",
        wrapper: "space-y-3 mb-3",
        message: "font-semibold text-red-400 text-sm uppercase text-right",
        label: "block mb-1 font-bold text-lg text-white",
        input: "w-full border border-slate-600 rounded-md p-2 placeholder:text-slate-500 placeholder:tracking-wide px-3",
      },
      submit: {
        input:
          "$reset bg-blue-500 hover:bg-blue-600 rounded-lg  transition-colors text-white text-center font-semibold w-full py-2 max-w-[400px] mx-auto flex items-center justify-center gap-2 my-4",
      },
    }),
  },
};

export default config;
