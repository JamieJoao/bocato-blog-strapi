module.exports = {
  "routes": [
    {
      "method": "POST",
      "path": "/uid/check-availability",
      "handler": "uid.checkUid",
      "config": {
        "policies": [],
      }
    }
  ]
}

