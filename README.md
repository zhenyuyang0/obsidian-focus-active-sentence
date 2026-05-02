# Focus Active Sentence
A plugin for [Obsidian.md](https://obsidian.md/) that highlights only the active sentence, and dims the rest of the document. Inspired by iA writer.

![screenshot 1](./screenshot_1.png)

The focus will be removed when the editor is scrolled. Focus will be re-added when you move the cursor or begin typing.

## Using Docker Compose (recommended)

Development mode (watches for changes):

```shell
docker-compose up dev
```

Production build:

```shell
docker-compose up build
```

## Using Docker directly

Build the image:

```shell
docker build -t obsidian-focus-plugin .
```

Development:

```shell
docker run -v .:/app obsidian-focus-plugin npm run dev
```

Build:

```shell
docker run -v .:/app obsidian-focus-plugin npm run build
```
