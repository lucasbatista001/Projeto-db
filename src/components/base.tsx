export const Base = ({ children }: { children: JSX.Element }) => (
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Posts CRUD</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.3.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/2.3.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
      ></link>
      <script
        src="https://unpkg.com/htmx.org@1.9.12"
        integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
        crossorigin="anonymous"
      ></script>
    </head>
    <body class={"h-screen bg-zinc-900"}>
      <div id={"main"} class={"w-full h-full flex items-center justify-center"}>
        {children}
      </div>
    </body>
  </html>
);
