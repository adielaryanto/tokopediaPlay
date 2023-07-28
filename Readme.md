# Project Name

Tokopedia Play Adiel

## Database Structure

The application uses MongoDB as the database to store video-related data, product lists, and comments. The database schema includes the following collections and their respective fields:

### Video Thumbnails Collection

- `videoID`: [String] (Required) ID of the video associated with the thumbnail.
- `urlImage`: [String] (Required) URL of the video thumbnail image.
- `thumbnail`: [String] (Required) Identifier or name of the thumbnail.

### Product List Collection

- `productId`: [String] (Required) ID of the product.
- `linkProduct`: [String] (Required) Link to the product's webpage or online store.
- `title`: [String] (Required) Title or name of the product.
- `price`: [Number] (Required) Price of the product.
- `videoID`: [String] (Optional) ID of the video associated with the product.

### Comment List Collection

- `username`: [String] (Required) Username of the commenter.
- `comment`: [String] (Required) Text of the comment.
- `timestamp`: [Date] (Optional) Timestamp when the comment was created (default value: Date.now).
- `videoID`: [String] (Optional) ID of the video associated with the comment.

## API Structure

The API is built using Express.js and provides the following endpoints to interact with the database:

- `GET /video-thumbnail`: Fetches all video thumbnails.
- `GET /:videoID/product`: Fetches the product list for a specific video.
- `GET /:videoID/comment`: Fetches the comment list for a specific video.
- `POST /:videoID/submit-comment`: Submits a new comment for a specific video.

## API Requests and Responses

**API Endpoints for Video Thumbnails, Product List, and Comments**

Below is the list of API requests and responses for the provided code:

### 1. Get Video Thumbnails
- **Description:** Retrieve a list of video thumbnails.
- **Endpoint:** `/video-thumbnail`
- **Method:** GET
- **Request Parameters:** None
- **Response:**
  ```json
  [
    {
      "_id": "video_thumbnail_id_1",
      "thumbnailUrl": "https://example.com/thumbnail1.jpg"
    },
    {
      "_id": "video_thumbnail_id_2",
      "thumbnailUrl": "https://example.com/thumbnail2.jpg"
    },
    ...
  ]
  ```
- **Error Response:**
  - Status Code: 500 Internal Server Error
  - Content:
    ```json
    {
      "message": "Gagal mencari Video Thumbnails",
      "error": "error_message"
    }
    ```

### 2. Get Product List for a Video
- **Description:** Retrieve a list of products related to a specific video.
- **Endpoint:** `/:videoID/product`
- **Method:** GET
- **Request Parameters:**
  - `videoID`: The unique ID of the video.
- **Response:**
  ```json
  [
    {
      "_id": "product_id_1",
      "name": "Product 1",
      "description": "Description of Product 1",
      "videoID": "video_id_1"
    },
    {
      "_id": "product_id_2",
      "name": "Product 2",
      "description": "Description of Product 2",
      "videoID": "video_id_1"
    },
    ...
  ]
  ```
- **Error Response:**
  - Status Code: 500 Internal Server Error
  - Content:
    ```json
    {
      "message": "Gagal mencari product list",
      "error": "error_message"
    }
    ```

### 3. Get Comment List for a Video
- **Description:** Retrieve a list of comments for a specific video.
- **Endpoint:** `/:videoID/comment`
- **Method:** GET
- **Request Parameters:**
  - `videoID`: The unique ID of the video.
- **Response:**
  ```json
  [
    {
      "_id": "comment_id_1",
      "username": "user1",
      "comment": "This is a comment.",
      "videoID": "video_id_1"
    },
    {
      "_id": "comment_id_2",
      "username": "user2",
      "comment": "Another comment.",
      "videoID": "video_id_1"
    },
    ...
  ]
  ```
- **Error Response:**
  - Status Code: 500 Internal Server Error
  - Content:
    ```json
    {
      "message": "Gagal mencari comment list",
      "error": "error_message"
    }
    ```

### 4. Submit a Comment for a Video
- **Description:** Submit a new comment for a specific video.
- **Endpoint:** `/:videoID/submit-comment`
- **Method:** POST
- **Request Parameters:**
  - `videoID`: The unique ID of the video.
- **Request Body:**
  ```json
  {
    "username": "user1",
    "comment": "This is a new comment."
  }
  ```
- **Response:**
  ```json
  {
    "message": "Komen sukses ditambahkan"
  }
  ```
- **Error Response:**
  - Status Code: 500 Internal Server Error
  - Content:
    ```json
    {
      "message": "Gagal menambahkan komentar",
      "error": "error_message"
    }
    ```

Please note that the actual video and product IDs, along with the corresponding URLs and other details, will be specific to the database used in the application. Additionally, the error responses will contain specific error messages indicating the cause of the error, which may vary based on the actual application's implementation.

## How to Run Locally

Follow the steps below to run the API on your local machine:

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the environment: Create a `.env` file in the project root and add the necessary environment variables, such as `DATABASE_URL` for the MongoDB connection.
4. Start the server: `npm start`
5. The API will be available at `http://localhost:3000`.

To ensure that the grader can run the API in their local machine, make sure to provide clear and specific instructions for setting up the environment and database connection. If any additional configuration or setup is required, include it in the "How to Run Locally" section.

