module.exports = {
    'GET /api':
      'Serves an HTML page with documentation for all the available endpoints',
    'GET /api/topics': 'Get all the topics',
    'GET /api/topics/:topic_id/articles':
      'Return all the articles for a certain topic',
    'POST /api/topics/:topic_id/articles':
      'Add a new article to a topic. This route requires a JSON body with title and body key value pairs e.g: { "title": "this is my new article title", "body": "This is my new article content"}',
    'GET /api/articles': 'Returns all the articles',
    'GET /api/articles/:article_id': 'Get an individual article',
    'GET /api/articles/:article_id/comments':
      'Get all the comments for a individual article',
    'POST /api/articles/:article_id/comments':
      'Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"}',
    'PUT /api/articles/:article_id':
      'Increment or Decrement the votes of an article by one. This route requires a vote query of "up" or "down" e.g: /api/articles/:article_id?vote=up',
    'PUT /api/comments/:comment_id':
      'Increment or Decrement the votes of a comment by one. This route requires a vote query of "up" or "down" e.g: /api/comments/:comment_id?vote=down',
    'DELETE /api/comments/:comment_id': 'Deletes a comment',
    'GET /api/users/:username':
      'Returns a JSON object with the profile data for the specified user.'
  }