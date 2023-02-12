# Hotel-Management-System-API

Hotel Management API
This is a Node.js and Express.js based API for hotel management. It provides endpoints for creating, retrieving, updating, and deleting room types and rooms.
And also Node.js web server application that uses Express and MongoDB to provide APIs for a hotel management system. The application provides endpoints for storing and retrieving information about hotel rooms and room types.

Dependencies
express
mongoose
Connecting to the database
The database connection string is hardcoded in the code and is using MongoDB Atlas:

const mongoDB = "mongodb+srv://username1:nYzSBYeX9fmd8hMU@cluster2.aepci1g.mongodb.net/hotel-database?retryWrites=true&w=majority";
Room Type Endpoints
POST /api/v1/rooms-types: Store a new room type in the database
GET /api/v1/rooms-types: Retrieve all room types from the database
Room Endpoints
POST /api/v1/rooms: Store a new room in the database
GET /api/v1/rooms: Retrieve all rooms from the database with filtering options available as query parameters
search: A string used to search for rooms with matching names (case-insensitive)
roomType: Filter rooms by room type id
minPrice: Filter rooms with a minimum price
maxPrice: Filter rooms with a maximum price
PATCH /api/v1/rooms/:id: Update an existing room in the database using its id
DELETE /api/v1/rooms/:id: Delete an existing room from the database using its id
GET /api/v1/rooms/:id: Retrieve a specific room from the database using its id

##Running the Application
Clone the repository to your local machine
Install the dependencies by running npm install in the terminal
Start the application by running npm start in the terminal
The server will start on port 3000, you can access the API endpoints using a web browser or a tool such as Postman

##Note
The mongoose.set('strictQuery',true) line has been added to enable strict query mode. This helps to catch query-related bugs and improve security by ensuring that only the defined fields can be queried.
