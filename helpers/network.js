class Network {
    constructor() {
      this.statusCode = null;
      this.type = null;
      this.data = null;
      this.message = null;
    }
  
    setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = "success";
    }
  
    setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = []
      this.type = "error";
    }
  
    send(res) {
        return res.status(this.statusCode).json(this);
      }
  
  }
  
  module.exports = Network;
  