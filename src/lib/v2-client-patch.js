Traitify.host = "https://api-sandbox.traitify.com";

Traitify.setProduction = function(value) {
  if (value) {
    return this.host = "https://api.traitify.com";
  } else {
    return "https://api-sandbox.traitify.com";
  }
};

Traitify.version = "v1";
