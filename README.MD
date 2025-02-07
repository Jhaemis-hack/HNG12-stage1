# Number API

This is a simple **Express.js** API that classifies numbers based on mathematical properties. The API determines whether a number is **prime**, **perfect**, **Armstrong**, or **even/odd** and provides additional details like digit sum and a fun fact.

## Features
- **Number Classification**: Checks if a number is **prime**, **perfect**, or **Armstrong**.
- **Redis Caching**: Uses Redis to store and retrieve results efficiently.
- **Number Properties**: Returns even/odd status and digit sum.
- **Fun Facts**: Fetches math-related facts about numbers from the Numbers API.

## Requirements
To run this project, ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Redis**
- **NPM/Yarn**

## Installation & Setup
Follow these steps to set up and run the API:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Jhaemis-hack/HNG12-stage0.git
   cd HNG12-stage0
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   username=your_redis_username
   password=your_redis_password
   host=your_redis_host
   port=your_redis_port
   ```

4. **Start the Redis server** (if running locally):
   ```sh
   redis-server
   ```

5. **Run the application:**
   ```sh
   node index.js
   ```
   The server will start at:
   ```
   http://localhost:4000
   ```

## API Endpoints
### **1. GET `/api/classify-number?number=<integer>`**
**Description:** Returns mathematical properties of a given number.

**Example Request:**
```sh
GET http://localhost:4000/api/classify-number?number=28
```

**Example Response:**
```json
{
    "number": 28,
    "is_prime": false,
    "is_perfect": true,
    "properties": ["even"],
    "digit_sum": 10,
    "fun_fact": "28 is the second perfect number."
}
```

**Error Responses:**
- If a non-number is passed:
```json
{
    "number": "alphabet",
    "error": true
}
```
- If invalid symbols are used:
```json
{
    "number": "parameters",
    "error": "expected number got symbols"
}
```

## Technologies Used
- **Express.js** - Web framework for Node.js
- **Redis** - In-memory key-value store for caching
- **Axios** - Fetching external data from the Numbers API
- **Dotenv** - Environment variable management
- **CORS** - Handling cross-origin requests

## Error Handling
- If Redis fails to connect, an error message is logged.
- If an invalid number is provided, an appropriate error response is returned.
- If an external API fails, the request will still proceed without a fun fact.

## License
This project is licensed under the **MIT License**.

## Author
**Gbemileke Kenny** ([GitHub](https://github.com/Jhaemis-hack))

---


