# sanity-fetch

**sanity-fetch** is a lightweight, universal Sanity client powered by native `fetch()`. It allows you to query data from [Sanity.io](https://www.sanity.io) using GROQ in any modern JavaScript environment — including **React Native (Expo)**, **web browsers**, and **frontend frameworks** like React, Next.js, and Svelte — without relying on Node.js-specific packages like `@sanity/client`.

## 🚀 Features

- 🌐 **Universal**: Works in browsers, React Native, and serverless environments
- ⚡ **Lightweight**: No Node.js dependencies, minimal bundle size
- 📦 **Fetch-based**: Uses native `fetch()` API for maximum compatibility
- 🧠 **GROQ-ready**: Supports all GROQ queries

## 📦 Installation

To install, use npm:

```bash
npm install git+https://github.com/sikandarmoyaldev/sanity-fetch.git
```

## 🛠️ Usage

### Initialize the client

```ts
import { createClient } from "sanity-fetch";

const sanity = createClient({
  projectId: "your_project_id",
  dataset: "production",
  apiVersion: "2024-06-01", // or use today's date
  token: undefined, // optional (for private datasets)
});
```

### Fetch data with GROQ

```ts
type Post = {
  _id: string;
  title: string;
}

const query = `*[_type == "post"]{_id, title}`;
const posts = await sanity.fetch<Post[]>(query);
```

## Contributing

If you want to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Please make sure to review the [Contribution Guidelines](CONTRIBUTING.md) before contributing.
