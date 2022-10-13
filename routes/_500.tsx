import { ServerCodePage } from "./_404.tsx";

export default function PageNotFound() {
  return ServerCodePage({
    serverCode: 500,
    codeDescription: "Oops! Something went wrong.",
  })
}
