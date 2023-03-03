# **YouTube Old Videos Sorter**

This project is a web application that allows users to sort a YouTube channel's videos by oldest. YouTube removed this feature, making it difficult for users to find a channel's earliest content. Built using TypeScript, this app uses an Express backend. The frontend uses Next.js, React, and Tailwind.

## **About**

The YouTube Old Videos Sorter was created to provide a solution for users who relied on the "Sort by Oldest" feature on YouTube. This feature allowed users to sort a channel's videos by the date they were uploaded, making it easier to find a channel's earliest content. Unfortunately, YouTube removed this feature, making it difficult for users to find a channel's earliest videos.

The YouTube Old Videos Sorter is a web application that allows users to sort a channel's videos by oldest. Users can enter the URL of a YouTube channel or video, and the app will automatically redirect to the sorted videos page. 

## **Tech Stack**

### **Backend**

- Express
- Node-Cache

### **Frontend**

- Next.js
- React
- Tailwind

## **Installation**

### **Backend**

1. Navigate to the **`backend`** directory in the project.
2. Run **`yarn install`** to install the backend dependencies.
3. Run **`yarn dev`** to start the backend server.

### **Frontend**

1. Navigate to the **`frontend`** directory in the project.
2. Run **`yarn install`** to install the frontend dependencies.
3. Run **`yarn dev`** to start the frontend server.

## **Usage**

1. Go to **[https://yt-old-videos.vercel.app/](https://yt-old-videos.vercel.app/)**
2. Enter the URL of the YouTube channel or video in the input box on the url page. The URL can be any channel, video, or shorts URL. The frontend will automatically redirect to the channel's sorted videos page.
3. The sorted videos will be displayed on the page, with the oldest videos shown first. By default, 50 videos are shown per page, and users can change the page number and items per page using the UI buttons or by modifying the URL.
4. There is a 3000 video limit set by me, but users can clone the project and remove this limit by going to ./backend/src/controllers/getSortedVideos.ts.

## **License**

This project is licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.

**Contributing**

Contributions to the YouTube Old Videos Sorter project are welcome. If you would like to contribute, please follow these steps:

1. Fork the project repository to your GitHub account.
2. Create a new branch for your feature or bug fix.
3. Make changes to the codebase and commit them with descriptive commit messages.
4. Push your changes to your branch on your forked repository.
5. Submit a pull request to the main repository, including a detailed description of your changes and any relevant information.

Thank you for your contributions to the YouTube Old Videos Sorter project!