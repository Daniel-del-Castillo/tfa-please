{
  "type": "Call",
  "operator": {
    "type": "Word",
    "name": "do"
  },
  "args": [
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "def"
      },
      "args": [
        {
          "type": "Word",
          "name": "x"
        },
        {
          "type": "Value",
          "value": "hello"
        }
      ]
    },
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "println"
      },
      "args": [
        {
          "type": "Call",
          "operator": {
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "x"
            },
            "args": [
              {
                "type": "Value",
                "value": "toUpperCase"
              }
            ]
          },
          "args": []
        }
      ]
    }
  ]
}