export default {
  apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : '/api'
}