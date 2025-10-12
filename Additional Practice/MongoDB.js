// Write a Mongoose schema for a BlogPost. The schema should be assigned to a variable named blogPostSchema. It must have the following fields and constraints:

// title: A String, which is required.

// body: A String, also required.

// author: An ObjectId that references the User model. This field is also required.

// likes: A Number, which should default to 0.

// status: A String that can only be one of three values: 'draft', 'published', or 'archived'. The default value should be 'draft'.

// The schema should automatically add createdAt and updatedAt timestamps.