export const htmlTemplate = `
  <!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/theme/black.min.css">
    </head>
    <body>
      <div class="reveal">
        <div class="slides">
          // generate slides here
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.js"></script>
      <script>
        Reveal.initialize();
      </script>
    </body>
  </html>
`;
